import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { loggerRequestHandler } from './middlewares/logger';
import Logger from './libs/logger';
import { errorRequestHandler } from './middlewares/error';
import { errorHandler } from './libs/error';
import { sessionRequestHandler } from './middlewares/session';
import { makeSchema } from './graphql';
import { prisma } from './db';
import helmet from 'helmet';
import cors from 'cors'
import { port, host } from './data/env';

async function bootstrap() {
  const app = express()

  app.use(helmet())
  app.use(cors());
  app.set('trust proxy', 1)
  app.use(loggerRequestHandler)
  app.use(errorRequestHandler)
  app.use(sessionRequestHandler)

  const schema = await makeSchema()
  app.use('/graphql', createHandler({
    schema, context: req => {
      req['session'] = req.raw.session
      return { req, prisma }
    }
  }));

  const server = app.listen(port, host, () => {
    Logger.info(`[ ready ] http://${host}:${port}`)
  })

  process.on('SIGTERM', () => {
    Logger.warn('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      Logger.warn('HTTP server closed')
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
