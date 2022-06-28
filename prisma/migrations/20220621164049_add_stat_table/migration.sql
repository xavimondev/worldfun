-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "totalViewers" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);
