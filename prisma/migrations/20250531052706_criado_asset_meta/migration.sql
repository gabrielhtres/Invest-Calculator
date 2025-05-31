-- CreateTable
CREATE TABLE "AssetMeta" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssetMeta_userId_idx" ON "AssetMeta"("userId");

-- CreateIndex
CREATE INDEX "AssetMeta_ticker_idx" ON "AssetMeta"("ticker");
