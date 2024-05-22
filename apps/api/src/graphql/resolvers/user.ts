import { User } from '@generated/type-graphql'
import { Arg, Mutation, Resolver, Field, InputType } from "type-graphql";
import { prisma } from '../../db';
import bcrypt from "bcrypt";

@InputType({
  description: "The user input model",
})
class UserCreateInput {
  @Field(() => String, {
    nullable: false,
    description: "The user email",
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: "The user name",
  })
  name!: string;

  @Field(() => String, {
    nullable: false,
    description: "The user password",
  })
  password!: string;
}

@Resolver()
class CustomCreateOneUserResolver {
  @Mutation(() => User, { nullable: false })
  async createUser(@Arg("data") { name, email, password }: UserCreateInput): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { name, email, password: { create: { hash } } } });
  }
}

export { CustomCreateOneUserResolver }
