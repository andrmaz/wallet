import "reflect-metadata";
import { resolvers } from '@generated/type-graphql'
import { buildSchema } from "type-graphql";
import { CustomCreateOneUserResolver } from "./resolvers";

const makeSchema = async () => await buildSchema({
  resolvers: [...resolvers, CustomCreateOneUserResolver],
  emitSchemaFile: "./schema.gql",
  validate: false
});

export { makeSchema }
