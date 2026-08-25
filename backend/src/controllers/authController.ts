import AuthService from "../services/iAuthService";

import { StatusCodes } from "http-status-codes";
import AppError from "../exceptions/appError";

import { Request, Response } from "express";
import { UserCreateDTO } from "../model/user";

export class AuthController {
  constructor(private authService: AuthService) {}

  private getAuthenticatedId(req: Request): string {
    if (!req.userId) {
      throw new AppError("User not authenticated", StatusCodes.UNAUTHORIZED);
    }
    return req.userId;
  }

  async register(req: Request, res: Response): Promise<void> {
    const newUser = req.body as UserCreateDTO;
    const created = await this.authService.register(newUser);

    res.status(StatusCodes.CREATED).send(created);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { user, token } = await this.authService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).send(user);
  }

  async logout(req: Request, res: Response): Promise<void> {
    const token = req.cookies?.token;

    if (token) {
      await this.authService.logout(token);
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(StatusCodes.NO_CONTENT).send();
  }

  async findById(req: Request, res: Response): Promise<void> {
    const user = await this.authService.findById(this.getAuthenticatedId(req));

    res.status(StatusCodes.OK).send(user);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updatedUser = await this.authService.update(
      this.getAuthenticatedId(req),
      req.body,
    );

    res.status(StatusCodes.OK).send(updatedUser);
  }
}
