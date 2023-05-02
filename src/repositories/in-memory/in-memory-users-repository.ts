import UsersRepository from "../users-repository";
import User from "../../entities/user";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export default class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create({ name, email, password }: CreateUserInput): Promise<User> {
    const user = new User(name, email, password);
    this.items.push(user);
    return user;
  }

  async updateStats(input: User): Promise<void> {
    const foundIndex = this.items.findIndex((item) => item.id === input.id);
    this.items[foundIndex] = input;
  }

  async findById(id: string): Promise<User> {
    const user = this.items.find((item) => item.id === id);
    return user!;
  }
}
