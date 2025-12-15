/*
  Warnings:

  - A unique constraint covering the columns `[PolarSubscriptionId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PolarCustomerId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "PolarCustomerId" TEXT,
ADD COLUMN     "PolarSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_PolarSubscriptionId_key" ON "user"("PolarSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_PolarCustomerId_key" ON "user"("PolarCustomerId");
