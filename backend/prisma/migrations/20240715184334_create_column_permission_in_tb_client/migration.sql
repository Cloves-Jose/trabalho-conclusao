/*
  Warnings:

  - Added the required column `permission` to the `tb_client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_client" ADD COLUMN     "permission" TEXT NOT NULL;
