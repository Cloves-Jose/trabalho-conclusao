/*
  Warnings:

  - A unique constraint covering the columns `[category_id]` on the table `tb_threat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_threat_category_id_key" ON "tb_threat"("category_id");

-- AddForeignKey
ALTER TABLE "tb_threat" ADD CONSTRAINT "tb_threat_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
