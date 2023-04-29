import Meal from "../entities/meal";

export default interface MealRepository {
  create(input: Meal): Promise<Meal>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Meal[]>;
  getOne(id: string): Promise<Meal | null>;
  update(id: string, input: Meal): Promise<void>;
}
