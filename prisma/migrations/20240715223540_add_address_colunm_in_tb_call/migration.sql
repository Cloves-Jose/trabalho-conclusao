/*
  Warnings:

  - Added the required column `addres` to the `tb_call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_call" ADD COLUMN     "addres" TEXT NOT NULL;
