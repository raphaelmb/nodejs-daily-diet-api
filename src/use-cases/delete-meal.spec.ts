import { beforeEach, describe, expect, it } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import MealNotFoundError from "./errors/meal-not-found-error";
import DeleteMealUseCase from "./delete-meal";
import GetOneMealUseCase from "./get-one-meal";

let mealsRepository: InMemoryMealsRepository;
let createMealUseCase: CreateMealUseCase;
let getOneMealUseCase: GetOneMealUseCase;
let sut: DeleteMealUseCase;

describe("Delete Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository);
    getOneMealUseCase = new GetOneMealUseCase(mealsRepository);
    sut = new DeleteMealUseCase(mealsRepository);
  });

  it("should delete one meal with a given id", async () => {
    const { meal: createdMeal } = await createMealUseCase.execute({
      userId: "1",
      name: "meal 1",
      description: "description 1",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    await sut.execute({ id: createdMeal.id! });

    await expect(() =>
      getOneMealUseCase.execute({ id: createdMeal.id! })
    ).rejects.toBeInstanceOf(MealNotFoundError);
  });

  it("should throw an error if meal does not exists", async () => {
    await expect(() => sut.execute({ id: "123" })).rejects.toBeInstanceOf(
      MealNotFoundError
    );
  });
});
