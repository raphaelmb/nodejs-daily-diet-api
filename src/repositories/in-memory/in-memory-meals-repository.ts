import Meal from "../../entities/meal";
import MealsRepository from "../meals-repository";

export default class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = [];

  async create(input: Meal): Promise<Meal> {
    const meal = new Meal(
      input.userId,
      input.name,
      input.description,
      input.dateAndTime,
      input.isInDiet
    );
    this.items.push(meal);
    return meal;
  }

  async delete(id: string): Promise<void> {
    const foundIndex = this.items.findIndex((item) => item.id === id);
    this.items.splice(foundIndex, 1);
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

  async update(input: Meal): Promise<void> {
    const foundIndex = this.items.findIndex((item) => item.id === input.id);
    this.items[foundIndex] = input;
  }
}
