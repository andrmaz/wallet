import { User } from '@generated/type-graphql'
import { Arg, Mutation, Resolver, Field, InputType } from "type-graphql";
import bcrypt from "bcrypt";
import { prisma } from '../../db';

@InputType()
class Hash {
  @Field(() => String)
  hash: string;
}

@InputType()
class Password {
  @Field(() => Hash)
  create: Hash;
}

@InputType({
  description: undefined,
})
class UserCreateInput {
  @Field(() => String, {
    nullable: false,
    description: undefined,
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: undefined,
  })
  name!: string;

  @Field(() => Password)
  password!: Password;
}

@Resolver()
class CustomCreateOneUserResolver {
  @Mutation(() => User, { nullable: false })
  async createUser(@Arg("data") data: UserCreateInput): Promise<User> {
    const hash = await bcrypt.hash(data.password.create.hash, 10);
    return prisma.user.create({ data: { name: data.name, email: data.email, password: { create: { hash } } } });
  }
}

export { CustomCreateOneUserResolver }
