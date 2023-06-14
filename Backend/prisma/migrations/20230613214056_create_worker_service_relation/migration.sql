-- CreateTable
CREATE TABLE "WorkersServices" (
    "workers_services_id" TEXT NOT NULL,
    "user_id_fk" TEXT NOT NULL,
    "service_id_fk" TEXT NOT NULL,

    CONSTRAINT "WorkersServices_pkey" PRIMARY KEY ("workers_services_id")
);

-- AddForeignKey
ALTER TABLE "WorkersServices" ADD CONSTRAINT "WorkersServices_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkersServices" ADD CONSTRAINT "WorkersServices_service_id_fk_fkey" FOREIGN KEY ("service_id_fk") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
