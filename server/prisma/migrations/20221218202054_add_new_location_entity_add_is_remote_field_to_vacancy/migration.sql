/*
  Warnings:

  - You are about to drop the column `location` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `isRemote` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "location",
ADD COLUMN     "locationId" TEXT;

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "location",
ADD COLUMN     "isRemote" BOOLEAN NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
