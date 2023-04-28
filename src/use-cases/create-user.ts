import { hash } from "bcryptjs";
import UsersRepository from "../repositories/users-repository";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<any> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new userAlreadyExists();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return { user };
  }
}
