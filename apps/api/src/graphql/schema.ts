import "reflect-metadata";
import { resolvers } from '@generated/type-graphql'
import { buildSchema } from "type-graphql";
import { CustomCreateOneUserResolver } from "./resolvers";
import { AuthInterceptor } from "./middlewares/auth";

const makeSchema = async () => await buildSchema({
  resolvers: [...resolvers, CustomCreateOneUserResolver],
  emitSchemaFile: "./schema.gql",
  validate: false,
  globalMiddlewares: [AuthInterceptor],
});

export { makeSchema }
