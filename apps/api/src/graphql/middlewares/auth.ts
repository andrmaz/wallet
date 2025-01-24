import { AuthChecker } from "type-graphql";
import { Context } from "../context";
import Logger from "../../libs/logger";

const customAuthChecker: AuthChecker<Context> = async ({ context }) => {
  if (context.session.user != null) {
    Logger.debug(context.session.user)
    Logger.info('Authenticated access')
    return true
  }
  Logger.debug(context.session)
  Logger.error("Unauthorized access")
  return false
};

export { customAuthChecker }
