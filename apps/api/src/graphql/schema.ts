import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolver";

const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
  }
`;

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
