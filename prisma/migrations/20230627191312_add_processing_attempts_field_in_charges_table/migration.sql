/*
  Warnings:

  - Added the required column `processingAttempts` to the `charges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charges` ADD COLUMN `processingAttempts` INTEGER NOT NULL;
