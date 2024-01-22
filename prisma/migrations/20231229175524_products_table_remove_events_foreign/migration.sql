/*
  Warnings:

  - You are about to drop the column `eventsId` on the `Products` table. All the data in the column will be lost.
  - Made the column `seriesId` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_seriesId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "eventsId",
ALTER COLUMN "seriesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
