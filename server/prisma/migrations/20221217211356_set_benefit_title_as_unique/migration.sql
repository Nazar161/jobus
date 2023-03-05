/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Benefit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Benefit_title_key" ON "Benefit"("title");
