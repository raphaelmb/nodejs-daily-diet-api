import { describe, expect, it, beforeEach } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import GetAllMealsUseCase from "./get-all-meals";
import InMemoryUsersRepository from "../repositories/in-memory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealUseCase: CreateMealUseCase;
let sut: GetAllMealsUseCase;

describe("Get All Meals use case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository, usersRepository);
    sut = new GetAllMealsUseCase(mealsRepository);
  });

  it("should get all meals from same user", async () => {
    const user1 = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345",
    });

    const user2 = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345",
    });

    await createMealUseCase.execute({
      userId: user1.id!,
      name: "meal 1",
      description: "description 1",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    await createMealUseCase.execute({
      userId: user1.id!,
      name: "meal 2",
      description: "description 2",
      dateAndTime: new Date(),
      isInDiet: false,
    });

    await createMealUseCase.execute({
      userId: user2.id!,
      name: "meal",
      description: "description",
      dateAndTime: new Date(),
      isInDiet: false,
    });

    const { meals } = await sut.execute({ userId: user1.id! });
    expect(meals).toHaveLength(2);
    expect(meals[0].userId).toEqual(user1.id);
    expect(meals[1].userId).toEqual(user1.id);
  });
});
