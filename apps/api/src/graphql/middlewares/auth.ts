import { MiddlewareFn, UnauthorizedError } from "type-graphql";
import { Context } from "../context";
import Logger from "../../libs/logger";

const AuthInterceptor: MiddlewareFn<Context> = async ({ context, info }, next) => {
  if (info.operation.name.value === 'RegisterUser' || info.operation.name.value === 'LoginUser') {
    Logger.info('Authenticating user ...')
    return next()
  }
  if (context.req.session.user != null) {
    Logger.debug(context.req.session.user)
    return next()
  }
  Logger.error("Unauthorized access")
  throw new UnauthorizedError()
};

export { AuthInterceptor }
