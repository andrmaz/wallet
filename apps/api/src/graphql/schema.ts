import "reflect-metadata";
import { resolvers } from '@generated/type-graphql'
import { buildSchema } from "type-graphql";

const makeSchema = async () => await buildSchema({
  resolvers,
  validate: false,
  emitSchemaFile: "./schema.gql"
});

export { makeSchema }
