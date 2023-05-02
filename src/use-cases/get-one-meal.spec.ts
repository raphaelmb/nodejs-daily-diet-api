import { beforeEach, describe, expect, it } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import GetOneMealUseCase from "./get-one-meal";
import MealNotFoundError from "./errors/meal-not-found-error";
import InMemoryUsersRepository from "../repositories/in-memory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealUseCase: CreateMealUseCase;
let sut: GetOneMealUseCase;

describe("Get One Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository, usersRepository);
    sut = new GetOneMealUseCase(mealsRepository);
  });

  it("should find one meal with a given id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345",
    });

    const { meal: createdMeal } = await createMealUseCase.execute({
      userId: user.id!,
      name: "meal 1",
      description: "description 1",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    const { meal } = await sut.execute({ id: createdMeal.id! });
    expect(meal.id).toBeDefined();
    expect(meal.userId).toEqual(user.id);
  });

  it("should throw an error if meal does not exists", async () => {
    await expect(() => sut.execute({ id: "123" })).rejects.toBeInstanceOf(
      MealNotFoundError
    );
  });
});
