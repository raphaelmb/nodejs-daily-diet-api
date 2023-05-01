export default class MealNotFoundError extends Error {
  constructor() {
    super("Meal not found");
  }
}
