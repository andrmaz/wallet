import { User } from '@generated/type-graphql'
import { Arg, Mutation, Resolver, Field, InputType, Ctx, UnauthorizedError } from "type-graphql";
import Logger from '../../libs/logger';
import { Context } from '../context';
import bcrypt from "bcrypt";

@InputType({
  description: "The user registration model",
})
class UserRegisterInput {
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
  async registerUserSession(@Arg("data") { name, email, password }: UserRegisterInput, @Ctx() { prisma, session }: Context): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: { create: { hash } } } });
    Logger.info("User created successfully")

    session.user = user.id
    Logger.info("User information stored in session")

    session.save((err) => {
      if (err) {
        Logger.error("Error saving session");
        throw new UnauthorizedError();
      }
      Logger.info("Session saved successfully");
      Logger.debug(session.user);
    })

    return user
  }
}

export { CustomCreateOneUserResolver }


