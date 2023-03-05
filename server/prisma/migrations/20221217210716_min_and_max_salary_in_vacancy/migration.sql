/*
  Warnings:

  - You are about to drop the column `salary` on the `Vacancy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "salary",
ADD COLUMN     "maxSalary" INTEGER,
ADD COLUMN     "minSalary" INTEGER;
