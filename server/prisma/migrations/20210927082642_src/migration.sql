/*
  Warnings:

  - You are about to drop the column `source` on the `Pckd` table. All the data in the column will be lost.
  - Added the required column `pckd` to the `Pckd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pckd" DROP COLUMN "source",
ADD COLUMN     "pckd" TEXT NOT NULL;
