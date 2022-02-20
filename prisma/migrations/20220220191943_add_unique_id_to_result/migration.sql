/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId,resultHash]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resultHash` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "resultHash" TEXT NOT NULL,
ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Result_uniqueId_resultHash_key" ON "Result"("uniqueId", "resultHash");
