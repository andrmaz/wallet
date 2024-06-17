import { RequestHandler } from "express"
import session from 'express-session'

const sessionRequestHandler: RequestHandler = session({
  name: 'session',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
  }
})

export { sessionRequestHandler }
