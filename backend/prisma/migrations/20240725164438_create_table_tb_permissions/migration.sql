/*
  Warnings:

  - You are about to drop the column `permission` on the `tb_user` table. All the data in the column will be lost.
  - Added the required column `permission_id` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_user" DROP COLUMN "permission",
ADD COLUMN     "permission_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_permissions" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "tb_permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "tb_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
