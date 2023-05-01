import Meal from "../entities/meal";
import MealsRepository from "../repositories/meals-repository";

interface GetAllMealsUseCaseRequest {
  userId: string;
}

interface GetAllMealsUseCaseReponse {
  meals: Meal[];
}

export default class GetAllMealsUseCase {
  constructor(readonly mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetAllMealsUseCaseRequest): Promise<GetAllMealsUseCaseReponse> {
    const meals = await this.mealsRepository.getAll(userId);

    return {
      meals,
    };
  }
}
