/*
  Warnings:

  - Added the required column `worker_id_fk` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "worker_id_fk" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_worker_id_fk_fkey" FOREIGN KEY ("worker_id_fk") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
