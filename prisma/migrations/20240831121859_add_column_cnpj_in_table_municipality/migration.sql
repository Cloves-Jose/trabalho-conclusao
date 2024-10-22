/*
  Warnings:

  - Added the required column `cnpj` to the `tb_municipality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_municipality" ADD COLUMN     "cnpj" TEXT NOT NULL;
