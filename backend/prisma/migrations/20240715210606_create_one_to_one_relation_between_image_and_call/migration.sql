/*
  Warnings:

  - You are about to drop the column `image` on the `tb_call` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `tb_call` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `tb_call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_call" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_call_image_id_key" ON "tb_call"("image_id");

-- AddForeignKey
ALTER TABLE "tb_call" ADD CONSTRAINT "tb_call_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "tb_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
