import AppError from "../exceptions/appError";
import type { Product } from "../model/product";
import type { AddCartItemDTO, Cart, UpdateCartItemDTO } from "../model/cart";
import type CartRepository from "../repositories/iCartRepository";
import type Repository from "../repositories/iRepository";
import CartService from "./iCartService";

export default class CartServiceImpl implements CartService {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: Repository<Product>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    this.validateUserId(userId);
    const cart = await this.cartRepository.findByUserId(userId);
    return cart ?? this.cartRepository.create(userId);
  }

  async addItem(userId: string, data: AddCartItemDTO): Promise<Cart> {
    this.validateUserId(userId);
    this.validateQuantity(data.quantity);
    await this.ensureProductExists(data.productId);

    return this.cartRepository.addItem(userId, data.productId, data.quantity);
  }

  async updateItem(
    userId: string,
    productId: string,
    data: UpdateCartItemDTO,
  ): Promise<Cart> {
    this.validateUserId(userId);
    this.validateQuantity(data.quantity);
    const cart = await this.getCart(userId);

    if (!cart.items.some((item) => item.productId === productId)) {
      throw new AppError("Item não encontrado no carrinho.", 404);
    }

    return this.cartRepository.updateItem(userId, productId, data.quantity);
  }

  async removeItem(userId: string, productId: string): Promise<Cart> {
    this.validateUserId(userId);
    return this.cartRepository.removeItem(userId, productId);
  }

  private async ensureProductExists(productId: string): Promise<void> {
    if (!productId) {
      throw new AppError("productId é obrigatório.", 400);
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }
  }

  private validateUserId(userId: string): void {
    if (!userId) {
      throw new AppError("Usuário não autenticado.", 401);
    }
  }

  private validateQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new AppError(
        "A quantidade deve ser um inteiro maior que zero.",
        400,
      );
    }
  }
}
