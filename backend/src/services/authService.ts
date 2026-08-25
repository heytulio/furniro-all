import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";
import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "../model/user";
import UserRepository from "../repositories/iUserRepository";
import AuthService from "./iAuthService";
import { CacheClient } from "../lib/cache/CacheClient";

export default class AuthServiceImpl implements AuthService {
  constructor(
    private userRepository: UserRepository,
    private cacheClient: CacheClient,
  ) {}

  private toResponse(
    user: Awaited<ReturnType<UserRepository["findById"]>>,
  ): UserResponseDTO | null {
    if (!user) return null;
    const { password: _password, ...userResponse } = user;
    return userResponse;
  }

  private async userExists(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository.findByUsernameOrEmail(
      username,
      email,
    );
    return Boolean(user);
  }

  async register(user: UserCreateDTO): Promise<UserResponseDTO> {
    if (!user.name || !user.email || !user.password || !user.username) {
      throw new AppError("Invalid user, some parameters are missing", 400);
    }
    if (await this.userExists(user.username, user.email)) {
      throw new AppError("User already exists", 409);
    }

    const salt = 13;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = { ...user, password: hashedPassword };

    const created = await this.userRepository.create(newUser);
    return this.toResponse(created) as UserResponseDTO;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: UserResponseDTO; token: string }> {
    if (!email || !password) {
      throw new AppError("Parameters missing", 400);
    }

    const user = await this.userRepository.findByUsernameOrEmail("", email);

    if (!user) {
      throw new AppError("Email or Password are incorrect", 400);
    }

    const isValid = await bcrypt.compare(password, user!.password);

    if (!isValid) {
      throw new AppError("Email or Password are incorrect", 400);
    }

    const jti = crypto.randomUUID();

    const secret = process.env.JWT_SECRET || "sua_chave_secreta";
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: "1d",
      jwtid: jti,
    });

    const userResponse = this.toResponse(user) as UserResponseDTO;

    return { user: userResponse, token };
  }

  async logout(token: string): Promise<void> {
    if (!token) {
      throw new AppError("Token não fornecido", 400);
    }

    const secret = process.env.JWT_SECRET || "sua_chave_secreta";

    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      const jti = decoded.jti;
      const exp = decoded.exp;

      if (!jti || !exp) {
        throw new AppError("Token inválido para logout", 400);
      }

      const nowInSeconds = Math.floor(Date.now() / 1000);
      const ttlSeconds = exp - nowInSeconds;

      if (ttlSeconds > 0) {
        await this.cacheClient.set(`blacklist:${jti}`, "revoked", ttlSeconds);
      }
    } catch (error) {
      throw new AppError("Token inválido ou expirado", 401);
    }
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    return this.toResponse(await this.userRepository.findById(id));
  }

  async update(
    id: string,
    user: UserUpdateDTO,
  ): Promise<UserResponseDTO | null> {
    return this.toResponse(await this.userRepository.update(id, user));
  }
}
