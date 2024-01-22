/*
  Warnings:

  - You are about to drop the column `created_at` on the `Audiences` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Audiences` table. All the data in the column will be lost.
  - You are about to drop the column `begin_date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `audience_id` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `series_id` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriesToProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genresId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_audience_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_series_id_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToProducts" DROP CONSTRAINT "_CategoriesToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToProducts" DROP CONSTRAINT "_CategoriesToProducts_B_fkey";

-- AlterTable
ALTER TABLE "Audiences" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "begin_date",
DROP COLUMN "created_at",
DROP COLUMN "end_date",
DROP COLUMN "updated_at",
ADD COLUMN     "beginDate" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "audience_id",
DROP COLUMN "created_at",
DROP COLUMN "series_id",
DROP COLUMN "updated_at",
ADD COLUMN     "audienceId" TEXT NOT NULL DEFAULT 'ALL',
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventsId" TEXT,
ADD COLUMN     "genresId" TEXT NOT NULL,
ADD COLUMN     "seriesId" TEXT DEFAULT 'ORIGINAL',
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "_CategoriesToProducts";

-- CreateTable
CREATE TABLE "Genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "Genres"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_audienceId_fkey" FOREIGN KEY ("audienceId") REFERENCES "Audiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_genresId_fkey" FOREIGN KEY ("genresId") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
