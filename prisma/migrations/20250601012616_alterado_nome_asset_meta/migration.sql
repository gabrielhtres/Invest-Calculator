/*
  Warnings:

  - You are about to drop the `AssetMeta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AssetMeta";

-- CreateTable
CREATE TABLE "AssetsMeta" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetsMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssetsMeta_userId_idx" ON "AssetsMeta"("userId");

-- CreateIndex
CREATE INDEX "AssetsMeta_ticker_idx" ON "AssetsMeta"("ticker");
