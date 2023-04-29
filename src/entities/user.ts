import { randomUUID } from "node:crypto";

export default class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly id?: string
  ) {
    this.id = id ?? randomUUID();
  }
}
