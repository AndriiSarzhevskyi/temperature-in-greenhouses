/*
  Warnings:

  - You are about to drop the column `GreenhouseId` on the `Temperature` table. All the data in the column will be lost.
  - Added the required column `greenhouseId` to the `Temperature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Temperature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Greenhouse` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Temperature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "greenhouseId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Temperature_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "Greenhouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Temperature" ("id", "value") SELECT "id", "value" FROM "Temperature";
DROP TABLE "Temperature";
ALTER TABLE "new_Temperature" RENAME TO "Temperature";
CREATE TABLE "new_Greenhouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Greenhouse" ("id", "name") SELECT "id", "name" FROM "Greenhouse";
DROP TABLE "Greenhouse";
ALTER TABLE "new_Greenhouse" RENAME TO "Greenhouse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
