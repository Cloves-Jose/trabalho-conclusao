/*
  Warnings:

  - Added the required column `title` to the `tb_call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_call" ADD COLUMN     "title" TEXT NOT NULL;
