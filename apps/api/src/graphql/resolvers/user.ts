import { User } from '@generated/type-graphql'
import { Arg, Mutation, Resolver, Field, InputType, Ctx, UnauthorizedError, Query } from "type-graphql";
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

@InputType({
  description: "The user login model",
})
class UserLoginInput {
  @Field(() => String, {
    nullable: false,
    description: "The user email",
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: "The user password",
  })
  password!: string;
}

@Resolver()
class CustomUserResolver {
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

  @Query(() => User, { nullable: true })
  async retrieveUserSession(@Ctx() { prisma, session }: Context): Promise<User | null> {
    if (!session.user) {
      return null
    }

    const user = await prisma.user.findUnique({ where: { id: session.user } })
    Logger.info("User found in session")
    return user
  }

  @Mutation(() => Boolean, { nullable: false })
  async logoutUserSession(@Ctx() { session }: Context): Promise<boolean> {
    session.destroy((err) => {
      if (err) {
        Logger.error("Error destroying session");
        throw new UnauthorizedError();
      }
      Logger.info("Session destroyed successfully");
    })
    return true
  }

  @Mutation(() => User, { nullable: false })
  async loginUserSession(@Arg("data") { email, password }: UserLoginInput, @Ctx() { prisma, session }: Context): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email }, include: { password: true } });
    if (!user) {
      Logger.error("User not found");
      throw new UnauthorizedError();
    }

    const valid = await bcrypt.compare(password, user.password.hash);
    if (!valid) {
      Logger.error("Invalid password");
      throw new UnauthorizedError();
    }

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

export { CustomUserResolver }


