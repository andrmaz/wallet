import "reflect-metadata";
import { resolvers } from '@generated/type-graphql'
import { buildSchema } from "type-graphql";

const makeSchema = async () => await buildSchema({
  resolvers,
  emitSchemaFile: "./schema.gql",
  validate: false
});

export { makeSchema }
