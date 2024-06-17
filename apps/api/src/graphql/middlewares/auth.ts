import { AuthChecker } from "type-graphql";
import { Context } from "../context";
import Logger from "../../libs/logger";

const customAuthChecker: AuthChecker<Context> = async ({ context, info }) => {
  if (info.operation.name.value === 'RegisterUser' || info.operation.name.value === 'LoginUser') {
    Logger.info('Authenticating user ...')
    return true
  }
  if (context.req.session.user != null) {
    Logger.debug(context.req.session.user)
    return true
  }
  Logger.debug(context.req.session)
  Logger.error("Unauthorized access")
  return false
};

export { customAuthChecker }
