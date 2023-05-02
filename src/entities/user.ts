import { randomUUID } from "node:crypto";

export default class User {
  private totalMealsRegistered: number = 0;
  private totalMealsInDiet: number = 0;
  private totalMealsOutOfDiet: number = 0;
  private bestInDietDaySequence: number = 0;

  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly id?: string
  ) {
    this.id = id ?? randomUUID();
  }

  updateUsersMealStats(mealInDiet: boolean) {
    this.totalMealsRegistered++;
    if (mealInDiet) {
      this.totalMealsInDiet++;
    } else {
      this.totalMealsOutOfDiet =
        this.totalMealsRegistered - this.totalMealsInDiet;
    }
  }

  getTotalMealsRegistered() {
    return this.totalMealsRegistered;
  }

  getTotalMealsInDiet() {
    return this.totalMealsInDiet;
  }

  getTotalMealsOutOfDiet() {
    return this.totalMealsOutOfDiet;
  }

  addBestInDietDaySequence() {
    this.bestInDietDaySequence++;
  }

  getBestInDietDaySequence() {
    return this.bestInDietDaySequence;
  }
}
