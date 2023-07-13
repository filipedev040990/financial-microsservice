/*
  Warnings:

  - You are about to drop the column `encryptedData` on the `cards` table. All the data in the column will be lost.
  - Added the required column `externalIdentifier` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cards` DROP COLUMN `encryptedData`,
    ADD COLUMN `externalIdentifier` VARCHAR(191) NOT NULL;
