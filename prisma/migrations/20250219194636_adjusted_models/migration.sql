/*
  Warnings:

  - You are about to drop the column `slug` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "slug";
