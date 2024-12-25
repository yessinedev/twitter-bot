-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SCHEDULED', 'POSTED');

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);
