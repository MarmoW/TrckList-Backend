/*
  Warnings:

  - A unique constraint covering the columns `[listId,name]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expiresAt" SET DEFAULT (NOW() + INTERVAL '24 hours');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ShareListCode" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "singleUse" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareListCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareListCode_link_key" ON "ShareListCode"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Note_listId_name_key" ON "Note"("listId", "name");

-- AddForeignKey
ALTER TABLE "ShareListCode" ADD CONSTRAINT "ShareListCode_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
