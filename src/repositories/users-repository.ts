import User from "../entities/user";

export default interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: User): Promise<User>;
}
