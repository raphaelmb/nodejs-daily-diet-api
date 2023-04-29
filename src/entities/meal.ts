import { randomUUID } from "node:crypto";

export default class Meal {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly dateAndTime: Date,
    readonly isInDiet: boolean,
    readonly id?: string
  ) {
    this.id = id ?? randomUUID();
  }
}
