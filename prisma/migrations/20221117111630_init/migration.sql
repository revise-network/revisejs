-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionName" TEXT,
    "collectionURI" TEXT NOT NULL,
    "infoId" TEXT NOT NULL,
    "appAuthTokenId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Collection_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "CollectionInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Collection_appAuthTokenId_fkey" FOREIGN KEY ("appAuthTokenId") REFERENCES "AppAuthToken" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollectionInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionName" TEXT,
    "collectionURI" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "format" TEXT NOT NULL,
    "tokenId" TEXT,
    "name" TEXT,
    "image" TEXT,
    "description" TEXT,
    "metaData" TEXT,
    "collectionId" TEXT,
    "appAuthTokenId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NFT_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NFT_appAuthTokenId_fkey" FOREIGN KEY ("appAuthTokenId") REFERENCES "AppAuthToken" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NFTRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nftId" TEXT NOT NULL,
    "tokenId" TEXT,
    "name" TEXT,
    "image" TEXT,
    "description" TEXT,
    "metaData" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NFTRevision_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AppAuthToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_infoId_key" ON "Collection"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "AppAuthToken_key_key" ON "AppAuthToken"("key");
