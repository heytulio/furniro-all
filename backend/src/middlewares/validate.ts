import { z } from "zod";
import { RequestHandler } from "express";
import AppError from "../exceptions/appError";

const validateSchema = <T extends z.ZodTypeAny>(schema: T): RequestHandler => {
  return (req, res, next): void => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      return next(
        new AppError("Validation failed", 400, validationResult.error.issues),
      );
    }

    req.body = validationResult.data as unknown;

    next();
  };
};

export default validateSchema;
