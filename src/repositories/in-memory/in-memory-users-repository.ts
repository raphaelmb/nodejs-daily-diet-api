import { randomUUID } from "crypto";
import UsersRepository from "../users-repository";

export default class InMemoryUsersRepository implements UsersRepository {
  public items: any[] = [];

  async findByEmail(email: string): Promise<any> {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(input: any): Promise<any> {
    const user = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      password: input.passwordHash,
      createdAt: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
