/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Audiences` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "audienceId" DROP DEFAULT,
ALTER COLUMN "seriesId" DROP DEFAULT,
ALTER COLUMN "categoryId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Audiences_name_key" ON "Audiences"("name");
