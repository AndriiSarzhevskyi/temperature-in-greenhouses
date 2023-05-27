/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Greenhouse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Greenhouse_name_key" ON "Greenhouse"("name");
