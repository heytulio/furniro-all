import type { Cart } from "../model/cart";

export default interface CartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  create(userId: string): Promise<Cart>;
  addItem(userId: string, productId: string, quantity: number): Promise<Cart>;
  updateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart>;
  removeItem(userId: string, productId: string): Promise<Cart>;
}
