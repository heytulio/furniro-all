import type { Product } from "./product";

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
};

export type AddCartItemDTO = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemDTO = {
  quantity: number;
};
