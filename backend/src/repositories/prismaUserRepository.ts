import { PrismaClient } from "@prisma/client";
import { User, UserCreateDTO, UserUpdateDTO } from "../model/user";
import UserRepository from "./iUserRepository";

export default class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  create(user: UserCreateDTO): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, user: UserUpdateDTO): Promise<User | null> {
    try {
      return await this.prisma.user.update({ where: { id }, data: user });
    } catch {
      return null;
    }
  }

  async findByUsernameOrEmail(
    username?: string,
    email?: string,
  ): Promise<User | null> {
    if (!username && !email) return null;
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          ...(username ? [{ username }] : []),
          ...(email ? [{ email }] : []),
        ],
      },
    });
  }
}
