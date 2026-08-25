import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";
import { CacheClient } from "../lib/cache/CacheClient";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface JwtPayload {
  sub: string;
  jti?: string;
}

export function makeAuthMiddleware(cacheClient: CacheClient) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("Token não fornecido.", 401));
    }

    try {
      const secret = process.env.JWT_SECRET || "sua_chave_secreta";
      const decoded = jwt.verify(token, secret) as JwtPayload;

      if (decoded.jti) {
        const isRevoked = await cacheClient.exists(`blacklist:${decoded.jti}`);
        if (isRevoked) {
          return next(new AppError("Token revogado (sessão encerrada).", 401));
        }
      }

      req.userId = decoded.sub;

      return next();
    } catch (error) {
      return next(new AppError("Token inválido ou expirado.", 401));
    }
  };
}
