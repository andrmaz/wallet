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
  async registerUser(@Arg("data") { name, email, password }: UserRegisterInput, @Ctx() { prisma, req }: Context): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: { create: { hash } } } });
    Logger.info("User created successfully")
    req.session.regenerate((err) => {
      if (err) {
        Logger.error("Error regenerating session")
        throw new UnauthorizedError()
      }
      // store user information in session
      req.session.user = user.id
      Logger.info("Session regenerated successfully")
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      /* req.session.save(function (err) {
        if (err) {
          Logger.error("Error saving session")
          throw new UnauthorizedError()
        }
        Logger.info("Session saved successfully")
      }) */
    })
    return user;
  }
}

export { CustomCreateOneUserResolver }


