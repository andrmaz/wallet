import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql';
import { port, host } from './data/env';

const app = express()

app.use('/graphql', createHandler({ schema }));

const server = app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})

process.on('SIGTERM', () => {
  //debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    //debug('HTTP server closed')
  })
})
