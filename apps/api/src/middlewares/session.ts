import { RequestHandler } from "express"
import session from 'express-session'

const sessionRequestHandler: RequestHandler = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'lax',
  },
  name: 'sid',
})

export { sessionRequestHandler }
