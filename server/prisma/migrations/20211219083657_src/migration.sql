/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Hits" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "type" TEXT,
    "isp" TEXT,
    "timezoneName" TEXT,
    "timezoneOffset" INTEGER,
    "timezoneId" TEXT,
    "timezoneAbbreviation" TEXT,
    "locationName" TEXT,
    "locationCity" TEXT,
    "locationPostal" TEXT,
    "locationCountryName" TEXT,
    "locationCountryCode" TEXT,
    "locationContinentName" TEXT,
    "locationContinentCode" TEXT,
    "pckdId" TEXT NOT NULL,

    CONSTRAINT "Hits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Hits" ADD CONSTRAINT "Hits_pckdId_fkey" FOREIGN KEY ("pckdId") REFERENCES "Pckd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
