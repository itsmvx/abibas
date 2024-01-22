/*
  Warnings:

  - Added the required column `gender` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('UNISEX', 'MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "gender" "Genders" NOT NULL;
