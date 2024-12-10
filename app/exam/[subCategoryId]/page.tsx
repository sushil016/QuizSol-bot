import { QuestionInterface } from "@/components/QuestionInterface"

export default function ExamPage({ params }: { params: { subCategoryId: string } }) {
  return (
    <div className="container mx-auto py-10">
      <QuestionInterface questionSetId={params.subCategoryId} />
    </div>
  )
} 