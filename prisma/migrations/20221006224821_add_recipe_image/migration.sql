/*
  Warnings:

  - Added the required column `image` to the `Recipie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Recipie" ("description", "id", "name") SELECT "description", "id", "name" FROM "Recipie";
DROP TABLE "Recipie";
ALTER TABLE "new_Recipie" RENAME TO "Recipie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
