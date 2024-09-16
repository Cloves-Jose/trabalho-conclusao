/*
  Warnings:

  - You are about to drop the column `user_id` on the `tb_category` table. All the data in the column will be lost.
  - You are about to drop the column `permission_id` on the `tb_client` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tb_threat` table. All the data in the column will be lost.
  - You are about to drop the `tb_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `municipality_id` to the `tb_call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agent_id` to the `tb_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipality_id` to the `tb_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipality_id` to the `tb_client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipality_id` to the `tb_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agent_id` to the `tb_threat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipality_id` to the `tb_threat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role_platform" AS ENUM ('WEB', 'APP');

-- CreateEnum
CREATE TYPE "role_users" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "tb_category" DROP CONSTRAINT "tb_category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_client" DROP CONSTRAINT "tb_client_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_threat" DROP CONSTRAINT "tb_threat_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_user" DROP CONSTRAINT "tb_user_permission_id_fkey";

-- AlterTable
ALTER TABLE "tb_call" ADD COLUMN     "municipality_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_category" DROP COLUMN "user_id",
ADD COLUMN     "agent_id" TEXT NOT NULL,
ADD COLUMN     "municipality_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_client" DROP COLUMN "permission_id",
ADD COLUMN     "municipality_id" TEXT NOT NULL,
ADD COLUMN     "role_platform" "role_platform" NOT NULL DEFAULT 'APP';

-- AlterTable
ALTER TABLE "tb_image" ADD COLUMN     "municipality_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_threat" DROP COLUMN "user_id",
ADD COLUMN     "agent_id" TEXT NOT NULL,
ADD COLUMN     "municipality_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "tb_permissions";

-- DropTable
DROP TABLE "tb_user";

-- CreateTable
CREATE TABLE "tb_municipality" (
    "id" TEXT NOT NULL,
    "municipality_name" TEXT NOT NULL,
    "state_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_users" "role_users" NOT NULL DEFAULT 'ADMIN',
    "role_platform" "role_platform" NOT NULL DEFAULT 'WEB',
    "municipality_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_agent_email_key" ON "tb_agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_agent_password_key" ON "tb_agent"("password");

-- AddForeignKey
ALTER TABLE "tb_agent" ADD CONSTRAINT "tb_agent_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_category" ADD CONSTRAINT "tb_category_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "tb_agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_category" ADD CONSTRAINT "tb_category_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_image" ADD CONSTRAINT "tb_image_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_threat" ADD CONSTRAINT "tb_threat_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "tb_agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_threat" ADD CONSTRAINT "tb_threat_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_client" ADD CONSTRAINT "tb_client_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_call" ADD CONSTRAINT "tb_call_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "tb_municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
