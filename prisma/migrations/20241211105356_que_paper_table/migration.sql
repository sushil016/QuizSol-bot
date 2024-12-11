/*
  Warnings:

  - You are about to drop the column `examType` on the `QuestionPaper` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `QuestionPaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionPaper" DROP COLUMN "examType",
ADD COLUMN     "subCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionPaper" ADD CONSTRAINT "QuestionPaper_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
