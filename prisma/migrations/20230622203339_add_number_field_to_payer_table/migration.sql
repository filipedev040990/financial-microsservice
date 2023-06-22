/*
  Warnings:

  - Added the required column `number` to the `payers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payers` ADD COLUMN `number` VARCHAR(191) NOT NULL;
