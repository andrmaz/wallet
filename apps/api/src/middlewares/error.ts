import { ErrorRequestHandler } from "express"
import { errorHandler } from "../libs/error";

const errorRequestHandler: ErrorRequestHandler = (err, _, res, next) => {
  // you must delegate to the default Express error handler,
  // when the headers have already been sent to the client
  if (res.headersSent) {
    return next(err)
  }
  errorHandler.handleError(err);
}

export { errorRequestHandler }
