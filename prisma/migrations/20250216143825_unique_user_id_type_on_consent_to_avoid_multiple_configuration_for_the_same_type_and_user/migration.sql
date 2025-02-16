/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `consent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "consent_userId_type_key" ON "consent"("userId", "type");
