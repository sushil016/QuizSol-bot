import { QuestionPaperUpload } from "@/components/admin/QuestionPaperUpload"
import { QuestionList } from "@/components/QuestionList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function QuestionManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Question Management</h2>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Questions</TabsTrigger>
          <TabsTrigger value="manage">Manage Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <QuestionPaperUpload />
        </TabsContent>
        <TabsContent value="manage">
          <QuestionList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

