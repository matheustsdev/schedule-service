-- CreateTable
CREATE TABLE "Schedule" (
    "scheduleId" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("scheduleId")
);
