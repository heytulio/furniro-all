import { AuthController } from "../controllers/authController";
import AuthService from "../services/authService";
import PrismaUserRepository from "../repositories/prismaUserRepository";
import { prisma } from "../lib/prisma";
import { RedisCacheClient } from "../lib/cache/RedisCacheClient";
import { makeAuthMiddleware } from "../middlewares/authMiddleware";

export default class AuthFactory {
  static createDependencies() {
    const userRepository = new PrismaUserRepository(prisma);
    const redisCacheClient = new RedisCacheClient();
    const authService = new AuthService(userRepository, redisCacheClient);
    const authController = new AuthController(authService);

    return {
      authController,
      authMiddleware: makeAuthMiddleware(redisCacheClient),
    };
  }
}
