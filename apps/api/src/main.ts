import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import loggerRequestHandler from './middlewares/logger';
import Logger from './libs/logger';
import { errorRequestHandler } from './middlewares/error';
import helmet from 'helmet';
import { errorHandler } from './libs/error';
import { prisma } from './db';
import { makeSchema } from './graphql';
import cors from 'cors'
import { port, host } from './data/env';

async function bootstrap() {
  const app = express()

  app.use(helmet())
  app.use(cors());
  app.use(loggerRequestHandler)
  app.use(errorRequestHandler)

  const schema = await makeSchema()
  app.use('/graphql', createHandler({ schema, context: { prisma } }));

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
}

bootstrap()
