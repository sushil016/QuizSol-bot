import { ExamList } from "@/components/ExamList"
import { ExamForm } from "@/components/ExamForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExamManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Exam and Category Management</h2>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Exam List</TabsTrigger>
          <TabsTrigger value="add">Add Exam</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <ExamList />
        </TabsContent>
        <TabsContent value="add">
          <ExamForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

