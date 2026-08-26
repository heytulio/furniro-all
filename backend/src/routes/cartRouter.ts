import Router, { Request, Response } from "express";
import AuthFactory from "../factories/authFactory";
import CartFactory from "../factories/cartFactory";

const { authMiddleware } = AuthFactory.createDependencies();

const router = Router();
const cartController = CartFactory.createController();

router.get("/", authMiddleware, (req: Request, res: Response) =>
  cartController.sync(req, res),
);
router.get("/sync", authMiddleware, (req: Request, res: Response) =>
  cartController.sync(req, res),
);
router.post("/items", authMiddleware, (req: Request, res: Response) =>
  cartController.addItem(req, res),
);
router.patch(
  "/items/:productId",
  authMiddleware,
  (req: Request, res: Response) => cartController.updateItem(req, res),
);
router.delete(
  "/items/:productId",
  authMiddleware,
  (req: Request, res: Response) => cartController.removeItem(req, res),
);

export default router;
