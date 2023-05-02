import { beforeEach, describe, expect, it } from "vitest";
import InMemoryMealsRepository from "../repositories/in-memory/in-memory-meals-repository";
import CreateMealUseCase from "./create-meal";
import MealNotFoundError from "./errors/meal-not-found-error";
import GetOneMealUseCase from "./get-one-meal";
import UpdateMealUseCase from "./update-meal";
import Meal from "../entities/meal";
import InMemoryUsersRepository from "../repositories/in-memory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealUseCase: CreateMealUseCase;
let getOneMealUseCase: GetOneMealUseCase;
let sut: UpdateMealUseCase;

describe("Update Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealUseCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getOneMealUseCase = new GetOneMealUseCase(mealsRepository);
    sut = new UpdateMealUseCase(mealsRepository);
  });

  it("should update one meal with a given id", async () => {
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

    const updatedMeal = new Meal(
      user.id!,
      "meal updated",
      "new description",
      createdMeal.dateAndTime,
      false,
      createdMeal.id
    );

    await sut.execute({ meal: updatedMeal });

    const { meal } = await getOneMealUseCase.execute({ id: createdMeal.id! });
    expect(meal.id).toEqual(createdMeal.id);
    expect(meal.userId).toEqual(user.id);
    expect(meal.name).toEqual("meal updated");
  });

  it("should throw an error if meal does not exists", async () => {
    const meal = new Meal(
      "1",
      "meal updated",
      "new description",
      new Date(),
      false
    );
    await expect(() => sut.execute({ meal })).rejects.toBeInstanceOf(
      MealNotFoundError
    );
  });
});
