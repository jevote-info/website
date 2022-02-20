/*
  Warnings:

  - You are about to drop the column `categoryScoreId` on the `QuestionAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_categoryScoreId_fkey";

-- AlterTable
ALTER TABLE "QuestionAnswer" DROP COLUMN "categoryScoreId";
