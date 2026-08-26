import CartController from "../controllers/cartController";
import { prisma } from "../lib/prisma";
import PrismaCartRepository from "../repositories/prismaCartRepository";
import { PrismaProductRepository } from "../repositories/prismaProductRepository";
import CartService from "../services/cartService";

export default class CartFactory {
  static createController(): CartController {
    const cartRepository = new PrismaCartRepository(prisma);
    const productRepository = new PrismaProductRepository(prisma);
    const cartService = new CartService(cartRepository, productRepository);

    return new CartController(cartService);
  }
}
