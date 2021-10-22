-- DropForeignKey
ALTER TABLE "Pckd" DROP CONSTRAINT "Pckd_userId_fkey";

-- AlterTable
ALTER TABLE "Pckd" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pckd" ADD CONSTRAINT "Pckd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
