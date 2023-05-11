/*
  Warnings:

  - Changed the type of `price` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;
