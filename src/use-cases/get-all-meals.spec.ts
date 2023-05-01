import { describe, expect, it, beforeEach } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import GetAllMealsUseCase from "./get-all-meals";

let mealsRepository: InMemoryMealsRepository;
let createMealUseCase: CreateMealUseCase;
let sut: GetAllMealsUseCase;

describe("Create Meal use case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository);
    sut = new GetAllMealsUseCase(mealsRepository);
  });

  it("should get all meals from same user", async () => {
    await createMealUseCase.execute({
      userId: "1",
      name: "meal 1",
      description: "description 1",
      dateAndTime: new Date(),
      isInDiet: true,
    });

    await createMealUseCase.execute({
      userId: "1",
      name: "meal 2",
      description: "description 2",
      dateAndTime: new Date(),
      isInDiet: false,
    });

    await createMealUseCase.execute({
      userId: "2",
      name: "meal",
      description: "description",
      dateAndTime: new Date(),
      isInDiet: false,
    });

    const { meals } = await sut.execute({ userId: "1" });
    expect(meals).toHaveLength(2);
    expect(meals[0].userId).toEqual("1");
    expect(meals[1].userId).toEqual("1");
  });
});
