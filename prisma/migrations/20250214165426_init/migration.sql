-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('email_notifications', 'sms_notifications');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "ConsentType" NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "consent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_change_event" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "ConsentType" NOT NULL,
    "value" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consent_change_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "consent_userId_idx" ON "consent"("userId");

-- AddForeignKey
ALTER TABLE "consent" ADD CONSTRAINT "consent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent_change_event" ADD CONSTRAINT "consent_change_event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
