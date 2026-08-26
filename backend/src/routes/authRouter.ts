import { Router, Request, Response } from "express";
import AuthFactory from "../factories/authFactory";
import validateSchema from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const authRouter = Router();

const { authController, authMiddleware } = AuthFactory.createDependencies();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  (req: Request, res: Response) => authController.register(req, res),
);
authRouter.post(
  "/login",
  validateSchema(loginSchema),
  (req: Request, res: Response) => authController.login(req, res),
);
authRouter.post("/logout", (req: Request, res: Response) =>
  authController.logout(req, res),
);
authRouter.get("/me", authMiddleware, (req: Request, res: Response) =>
  authController.findById(req, res),
);
authRouter.patch("/me", authMiddleware, (req: Request, res: Response) =>
  authController.update(req, res),
);

export default authRouter;
