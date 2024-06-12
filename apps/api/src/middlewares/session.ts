import { RequestHandler } from "express"
import session from 'express-session'

const sessionRequestHandler: RequestHandler = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
})

export { sessionRequestHandler }
