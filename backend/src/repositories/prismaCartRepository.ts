import type { PrismaClient } from "@prisma/client";
import type { Cart } from "../model/cart";
import CartRepository from "./iCartRepository";

const cartInclude = {
  items: {
    include: {
      product: true,
    },
  },
} as const;

export default class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaClient) {}

  findByUserId(userId: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: cartInclude,
    }) as Promise<Cart | null>;
  }

  create(userId: string): Promise<Cart> {
    return this.prisma.cart.create({
      data: { userId },
      include: cartInclude,
    }) as Promise<Cart>;
  }

  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });

    return this.findByUserId(userId) as Promise<Cart>;
  }

  async updateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (cart) {
      await this.prisma.cartItem.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity },
      });
    }

    return this.findByUserId(userId) as Promise<Cart>;
  }

  async removeItem(userId: string, productId: string): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });
    }

    return this.findByUserId(userId) as Promise<Cart>;
  }
}
