import Meal from "../../entities/meal";
import MealRepository from "../meal-repository";

export default class InMemoryMealsRepository implements MealRepository {
  public items: Meal[] = [];

  async create(input: Meal): Promise<Meal> {
    const meal = new Meal(
      input.name,
      input.description,
      input.dateAndTime,
      input.isInDiet
    );
    this.items.push(meal);
    return meal;
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<Meal[]> {
    return this.items;
  }

  async getOne(id: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === id);
    if (!meal) {
      return null;
    }
    return meal;
  }

  update(id: string, input: Meal): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
