/*
  Warnings:

  - You are about to drop the column `probableBrowser` on the `Hits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hits" DROP COLUMN "probableBrowser",
ADD COLUMN     "OSName" TEXT,
ADD COLUMN     "OSVersion" TEXT,
ADD COLUMN     "browserName" TEXT,
ADD COLUMN     "browserVersion" TEXT;
