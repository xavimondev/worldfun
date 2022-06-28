-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);
