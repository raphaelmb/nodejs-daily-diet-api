import { describe, expect, it, beforeEach } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";

let mealsRepository: InMemoryMealsRepository;
let sut: CreateMealUseCase;

describe("Create Meal use case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new CreateMealUseCase(mealsRepository);
  });

  it("should create a meal", async () => {
    const { meal } = await sut.execute({
      userId: "1",
      name: "test",
      description: "description",
      dateAndTime: new Date(),
      isInDiet: true,
    });
    expect(meal.id).toBeDefined();
  });
});
