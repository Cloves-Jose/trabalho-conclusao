/*
  Warnings:

  - You are about to drop the column `permission` on the `tb_client` table. All the data in the column will be lost.
  - Added the required column `permission_id` to the `tb_client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_client" DROP COLUMN "permission",
ADD COLUMN     "permission_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_client" ADD CONSTRAINT "tb_client_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "tb_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
