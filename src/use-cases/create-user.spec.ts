import { describe, expect, it, beforeEach } from "vitest";
import InMemoryUsersRepository from "../repositories/in-memory/in-memory-users-repository";
import CreateUserUseCase from "./create-user";
import { compare } from "bcryptjs";
import UserAlreadyExistsError from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should create an user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndow@example.com",
      password: "12345",
    });
    expect(user.id).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345",
    });

    const isPasswordCorrectlyHashed = await compare("12345", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);

    it("should not be able to register with same email twice", async () => {
      const email = "johndoe@example.com";

      await sut.execute({
        name: "John Doe",
        email,
        password: "12345",
      });

      await expect(() =>
        sut.execute({
          name: "John Doe",
          email,
          password: "12345",
        })
      ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
  });
});
