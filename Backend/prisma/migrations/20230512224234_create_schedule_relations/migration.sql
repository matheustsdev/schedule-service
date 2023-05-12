/*
  Warnings:

  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - The required column `schedule_id` was added to the `Schedule` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `service_id_fk` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id_fk` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
DROP COLUMN "endTime",
DROP COLUMN "scheduleId",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD COLUMN     "service_id_fk" TEXT NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id_fk" TEXT NOT NULL,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("schedule_id");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_service_id_fk_fkey" FOREIGN KEY ("service_id_fk") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
