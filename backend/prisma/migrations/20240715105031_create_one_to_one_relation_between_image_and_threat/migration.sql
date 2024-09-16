/*
  Warnings:

  - You are about to drop the column `image` on the `tb_threat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `tb_threat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `tb_threat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_threat" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_image" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentLength" DOUBLE PRECISION NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_threat_image_id_key" ON "tb_threat"("image_id");

-- AddForeignKey
ALTER TABLE "tb_threat" ADD CONSTRAINT "tb_threat_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "tb_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
