/*
  Warnings:

  - You are about to drop the column `name` on the `AssetClass` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `AssetClass` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AssetClass` table. All the data in the column will be lost.
  - Added the required column `bdr` to the `AssetClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etf` to the `AssetClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fii` to the `AssetClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `AssetClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treasure` to the `AssetClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetClass" DROP COLUMN "name",
DROP COLUMN "percentage",
DROP COLUMN "type",
ADD COLUMN     "bdr" TEXT NOT NULL,
ADD COLUMN     "etf" TEXT NOT NULL,
ADD COLUMN     "fii" TEXT NOT NULL,
ADD COLUMN     "stock" TEXT NOT NULL,
ADD COLUMN     "treasure" TEXT NOT NULL;
