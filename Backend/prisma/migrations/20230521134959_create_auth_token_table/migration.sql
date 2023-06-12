-- CreateTable
CREATE TABLE "AuthToken" (
    "token_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "user_id_fk" TEXT NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_token_key" ON "AuthToken"("token");

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
