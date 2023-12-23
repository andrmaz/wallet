import { prisma } from "../db";

function findUsers() {
  return prisma.user.findMany();
}

export { findUsers }
