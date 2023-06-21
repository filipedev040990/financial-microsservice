/*
  Warnings:

  - You are about to drop the column `enncryptedData` on the `cards` table. All the data in the column will be lost.
  - Added the required column `encryptedData` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cards` DROP COLUMN `enncryptedData`,
    ADD COLUMN `encryptedData` VARCHAR(191) NOT NULL;
