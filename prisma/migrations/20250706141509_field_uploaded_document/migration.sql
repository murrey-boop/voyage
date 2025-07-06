/*
  Warnings:

  - Added the required column `field` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `UploadedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedDocument" ADD COLUMN     "field" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL;
