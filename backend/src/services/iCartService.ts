import type { AddCartItemDTO, Cart, UpdateCartItemDTO } from "../model/cart";

export default interface CartService {
  getCart(userId: string): Promise<Cart>;
  addItem(userId: string, data: AddCartItemDTO): Promise<Cart>;
  updateItem(
    userId: string,
    productId: string,
    data: UpdateCartItemDTO,
  ): Promise<Cart>;
  removeItem(userId: string, productId: string): Promise<Cart>;
}
