import Meal from "../entities/meal";
import MealsRepository from "../repositories/meals-repository";
import MealNotFoundError from "./errors/meal-not-found-error";

interface DeleteMealUseCaseRequest {
  id: string;
}

export default class DeleteMealUseCase {
  constructor(readonly mealsRepository: MealsRepository) {}

  async execute({ id }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.getOne(id);
    if (!meal) {
      throw new MealNotFoundError();
    }

    await this.mealsRepository.delete(id);
  }
}
