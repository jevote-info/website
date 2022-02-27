/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "PoliticianScore" ALTER COLUMN "source" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "description" DROP NOT NULL;
