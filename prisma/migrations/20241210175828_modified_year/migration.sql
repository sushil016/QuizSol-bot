-- AlterTable
ALTER TABLE "QuestionPaper" ADD COLUMN     "isPractice" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "year" DROP NOT NULL;
