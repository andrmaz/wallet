import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql';
import { port, host } from './data/env';
import loggerRequestHandler from './middlewares/logger';
import Logger from './libs/logger';
import { errorRequestHandler } from './middlewares/error';
import helmet from 'helmet';
import { errorHandler } from './libs/error';

const app = express()

app.use(helmet())
app.use(loggerRequestHandler)
app.use(errorRequestHandler)
app.use('/graphql', createHandler({ schema }));

const server = app.listen(port, host, () => {
  Logger.info(`[ ready ] http://${host}:${port}`)
})

process.on('SIGTERM', () => {
  Logger.debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    Logger.debug('HTTP server closed')
  })
})

process.on("uncaughtException", (error: Error) => {
  errorHandler.handleError(error);
});

process.on("unhandledRejection", (reason: Error) => {
  errorHandler.handleError(reason);
});
