import { PrismaClient } from '@prisma/client';
import session from 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: number;
  }
}

export interface Context {
  session: session.Session & session.SessionData;
  prisma: PrismaClient;
}
