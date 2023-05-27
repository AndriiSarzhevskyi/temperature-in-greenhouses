/*
  Warnings:

  - A unique constraint covering the columns `[greenhouseId]` on the table `Temperature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Temperature_greenhouseId_key" ON "Temperature"("greenhouseId");
