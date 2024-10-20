-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");
