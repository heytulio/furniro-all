import { User, UserCreateDTO, UserUpdateDTO } from "../model/user";

export default interface UserRepository {
  create(user: UserCreateDTO): Promise<User>;
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: UserUpdateDTO): Promise<User | null>;
}
