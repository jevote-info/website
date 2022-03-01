-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "winnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Politician"("id") ON DELETE SET NULL ON UPDATE CASCADE;
