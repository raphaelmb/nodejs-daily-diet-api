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

  addTotalMealsRegistered() {
    this.totalMealsRegistered++;
  }

  getTotalMealsRegistered() {
    return this.totalMealsRegistered;
  }

  addTotalMealsInDiet() {
    this.totalMealsInDiet++;
  }

  getTotalMealsInDiet() {
    return this.totalMealsInDiet;
  }

  addTotalMealsOutOfDiet() {
    this.totalMealsOutOfDiet++;
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
