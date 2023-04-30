import Meal from "../entities/meal";
import MealsRepository from "../repositories/meals-repository";

interface CreateMealUseCaseRequest {
  userId: string;
  name: string;
  description: string;
  dateAndTime: Date;
  isInDiet: boolean;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export default class CreateMealUseCase {
  constructor(readonly mealsRepository: MealsRepository) {}

  async execute({
    userId,
    name,
    description,
    dateAndTime,
    isInDiet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      userId,
      name,
      description,
      dateAndTime,
      isInDiet,
    });

    return { meal };
  }
}
