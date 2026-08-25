import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "../model/user";

export default interface AuthService {
  register(user: UserCreateDTO): Promise<UserResponseDTO>;
  login(
    email: string,
    password: string,
  ): Promise<{ user: UserResponseDTO; token: string }>;
  logout(token: string): Promise<void>;
  findById(id: string): Promise<UserResponseDTO | null>;
  update(id: string, user: UserUpdateDTO): Promise<UserResponseDTO | null>;
}
