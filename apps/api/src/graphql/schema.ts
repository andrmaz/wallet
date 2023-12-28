import "reflect-metadata";
import { resolvers } from './resolver'
import { buildSchema } from "type-graphql";

const makeSchema = async () => await buildSchema({
  resolvers,
  emitSchemaFile: "./schema.gql"
});

export { makeSchema }
