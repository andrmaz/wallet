import "reflect-metadata";
import { resolvers, ResolversEnhanceMap, applyResolversEnhanceMap } from '@generated/type-graphql'
import { buildSchema, Authorized } from "type-graphql";
import { CustomCreateOneUserResolver } from "./resolvers";
import { customAuthChecker } from "./middlewares/auth";

const resolversEnhanceMap: ResolversEnhanceMap = {
  User: {
    _all: [Authorized()]
  },
};
applyResolversEnhanceMap(resolversEnhanceMap);

const makeSchema = async () => await buildSchema({
  resolvers: [...resolvers, CustomCreateOneUserResolver],
  emitSchemaFile: "./schema.gql",
  validate: false,
  authChecker: customAuthChecker,
});

export { makeSchema }
