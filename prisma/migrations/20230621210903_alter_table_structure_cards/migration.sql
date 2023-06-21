/*
  Warnings:

  - You are about to drop the column `brand` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `expiration` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `cards` table. All the data in the column will be lost.
  - Added the required column `enncryptedData` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cards` DROP COLUMN `brand`,
    DROP COLUMN `expiration`,
    DROP COLUMN `identifier`,
    DROP COLUMN `number`,
    ADD COLUMN `enncryptedData` VARCHAR(191) NOT NULL;
