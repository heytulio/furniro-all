import { User } from "@prisma/client";

export type { User } from "@prisma/client";

export type UserResponseDTO = Omit<User, "password">;

export type UserCreateDTO = Omit<User, "id" | "createdAt">;

export type UserUpdateDTO = Partial<
  Omit<User, "id" | "createdAt" | "password">
>;
