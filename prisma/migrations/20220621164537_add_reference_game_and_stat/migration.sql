/*
  Warnings:

  - A unique constraint covering the columns `[statId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "statId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_statId_key" ON "Game"("statId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
