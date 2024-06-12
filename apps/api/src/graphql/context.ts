import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import session from 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: number;
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & session.SessionData;
  }
}

export interface Context {
  req: Request;
  prisma: PrismaClient;
}
