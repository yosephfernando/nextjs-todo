import { JsonUserRepository } from "@/repository/user";

export class GetUser {
  constructor(private repo: JsonUserRepository) {}

  execute(username: string) {
    return { user: this.repo.GetUserByNameFromDB(username) };
  }
}