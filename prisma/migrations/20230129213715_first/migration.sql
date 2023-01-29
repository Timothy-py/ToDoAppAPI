/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'DOING', 'AWAITING', 'DONE', 'DISCONTINUED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'TODO',
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
