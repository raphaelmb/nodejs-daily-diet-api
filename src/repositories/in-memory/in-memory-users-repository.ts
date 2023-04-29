import UsersRepository from "../users-repository";
import User from "../../entities/user";

export default class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create({ name, email, password }: User): Promise<User> {
    const user = new User(name, email, password);
    this.items.push(user);
    return user;
  }
}
