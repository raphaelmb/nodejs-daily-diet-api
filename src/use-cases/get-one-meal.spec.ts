import { beforeEach, describe, expect, it } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import GetOneMealUseCase from "./get-one-meal";
import MealNotFoundError from "./errors/meal-not-found-error";

let mealsRepository: InMemoryMealsRepository;
let createMealUseCase: CreateMealUseCase;
let sut: GetOneMealUseCase;

describe("Get One Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository);
    sut = new GetOneMealUseCase(mealsRepository);
  });

  it("should find one meal with a given id", async () => {
    const { meal: createdMeal } = await createMealUseCase.execute({
      userId: "1",
      name: "meal 1",
      description: "description 1",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    const { meal } = await sut.execute({ id: createdMeal.id! });
    expect(meal.id).toBeDefined();
    expect(meal.userId).toEqual("1");
  });

  it("should throw an error if meal does not exists", async () => {
    await expect(() => sut.execute({ id: "123" })).rejects.toBeInstanceOf(
      MealNotFoundError
    );
  });
});
