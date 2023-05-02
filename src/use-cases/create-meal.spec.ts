import { describe, expect, it, beforeEach } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import InMemoryUsersRepository from "../repositories/in-memory/in-memory-users-repository";
import CreateMealUseCase from "./create-meal";
import CreateUserUseCase from "./create-user";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateMealUseCase;

describe("Create Meal use case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateMealUseCase(mealsRepository, usersRepository);
  });

  it("should create a meal", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345",
    });

    const { meal } = await sut.execute({
      userId: user.id!,
      name: "test",
      description: "description",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    expect(meal.id).toBeDefined();
  });
});
