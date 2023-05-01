import Meal from "../entities/meal";
import MealsRepository from "../repositories/meals-repository";
import MealNotFoundError from "./errors/meal-not-found-error";

interface GetOneMealUseCaseRequest {
  id: string;
}

interface GetOneMealUseCaseResponse {
  meal: Meal;
}

export default class GetOneMealUseCase {
  constructor(readonly mealsRepository: MealsRepository) {}

  async execute({
    id,
  }: GetOneMealUseCaseRequest): Promise<GetOneMealUseCaseResponse> {
    const meal = await this.mealsRepository.getOne(id);
    if (!meal) {
      throw new MealNotFoundError();
    }

    return {
      meal,
    };
  }
}
