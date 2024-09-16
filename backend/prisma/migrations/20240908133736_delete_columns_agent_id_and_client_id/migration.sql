/*
  Warnings:

  - You are about to drop the column `client_id` on the `tb_call` table. All the data in the column will be lost.
  - You are about to drop the column `agent_id` on the `tb_category` table. All the data in the column will be lost.
  - You are about to drop the column `agent_id` on the `tb_threat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_call" DROP CONSTRAINT "tb_call_client_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_category" DROP CONSTRAINT "tb_category_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_threat" DROP CONSTRAINT "tb_threat_agent_id_fkey";

-- AlterTable
ALTER TABLE "tb_call" DROP COLUMN "client_id";

-- AlterTable
ALTER TABLE "tb_category" DROP COLUMN "agent_id";

-- AlterTable
ALTER TABLE "tb_threat" DROP COLUMN "agent_id";
