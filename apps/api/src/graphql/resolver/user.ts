import { findUsers } from "../../controllers/user";
import { User } from '@generated/type-graphql'
import { Query, Resolver } from "type-graphql";

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return await findUsers();
  }
}
