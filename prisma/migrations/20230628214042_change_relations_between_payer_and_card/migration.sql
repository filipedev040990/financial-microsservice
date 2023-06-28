/*
  Warnings:

  - A unique constraint covering the columns `[payerId]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cards_payerId_key` ON `cards`(`payerId`);
