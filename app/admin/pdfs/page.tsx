  
import { PDFList } from "@/components/PDFList";
import { QuestionUploadSet } from "@/components/QuestionSetUpload";

export default function PDFRepositoryManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">PDF Repository Management</h2>
      <QuestionUploadSet />
      <PDFList />
    </div>
  )
}

