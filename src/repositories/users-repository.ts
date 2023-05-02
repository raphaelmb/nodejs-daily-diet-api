import User from "../entities/user";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export default interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  updateStats(input: User): Promise<void>;
  findById(id: string): Promise<User>;
}
