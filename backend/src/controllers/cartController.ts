import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../exceptions/appError";
import type { AddCartItemDTO, UpdateCartItemDTO } from "../model/cart";
import CartService from "../services/iCartService";

export default class CartController {
  constructor(private cartService: CartService) {}

  async sync(req: Request, res: Response): Promise<void> {
    res
      .status(StatusCodes.OK)
      .send(await this.cartService.getCart(this.userId(req)));
  }

  async addItem(req: Request, res: Response): Promise<void> {
    const data = req.body as AddCartItemDTO;
    const cart = await this.cartService.addItem(this.userId(req), data);
    res.status(StatusCodes.OK).send(cart);
  }

  async updateItem(req: Request, res: Response): Promise<void> {
    const productId = this.param(req, "productId");
    const data = req.body as UpdateCartItemDTO;
    const cart = await this.cartService.updateItem(
      this.userId(req),
      productId,
      data,
    );
    res.status(StatusCodes.OK).send(cart);
  }

  async removeItem(req: Request, res: Response): Promise<void> {
    const cart = await this.cartService.removeItem(
      this.userId(req),
      this.param(req, "productId"),
    );
    res.status(StatusCodes.OK).send(cart);
  }

  private userId(req: Request): string {
    if (!req.userId) {
      throw new AppError("Usuário não autenticado.", StatusCodes.UNAUTHORIZED);
    }
    return req.userId;
  }

  private param(req: Request, name: string): string {
    const value = req.params[name];
    return Array.isArray(value) ? value[0] : value;
  }
}
