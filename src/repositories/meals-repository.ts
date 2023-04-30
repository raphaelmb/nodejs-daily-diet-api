import Meal from "../entities/meal";

export default interface MealsRepository {
  create(input: Meal): Promise<Meal>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Meal[]>;
  getOne(id: string): Promise<Meal | null>;
  update(input: Meal): Promise<void>;
}
