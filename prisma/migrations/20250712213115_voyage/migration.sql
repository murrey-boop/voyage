/*
  Warnings:

  - Added the required column `filePath` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedDocument" ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageHeight" INTEGER,
ADD COLUMN     "imagePreview" BOOLEAN DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "imageWidth" INTEGER,
ADD COLUMN     "multiple" BOOLEAN DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL;
