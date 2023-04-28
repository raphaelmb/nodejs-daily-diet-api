export default interface UsersRepository {
  findByEmail(email: string): Promise<any | null>;
  create(input: any): Promise<any>;
}
