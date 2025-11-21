/*
  Warnings:

  - You are about to drop the column `configurationId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_configurationId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "configurationId";
