/*
  Warnings:

  - A unique constraint covering the columns `[pckd]` on the table `Pckd` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pckd_pckd_key" ON "Pckd"("pckd");
