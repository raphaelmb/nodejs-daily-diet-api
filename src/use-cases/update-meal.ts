import Meal from "../entities/meal";
import MealsRepository from "../repositories/meals-repository";
import MealNotFoundError from "./errors/meal-not-found-error";

interface UpdateMealUseCaseRequest {
  meal: Meal;
}

export default class UpdateMealUseCase {
  constructor(readonly mealsRepository: MealsRepository) {}

  async execute({ meal }: UpdateMealUseCaseRequest): Promise<void> {
    const foundMeal = await this.mealsRepository.getOne(meal.id!);
    if (!foundMeal) {
      throw new MealNotFoundError();
    }

    const updatedMeal = new Meal(
      foundMeal.userId,
      meal.name,
      meal.description,
      foundMeal.dateAndTime,
      meal.isInDiet,
      foundMeal.id
    );

    await this.mealsRepository.update(updatedMeal);
  }
}
