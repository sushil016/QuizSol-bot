import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExamCategoryForm } from "@/components/admin/ExamCategoryForm"
import { SubCategoryForm } from "@/components/admin/SubCategoryForm"
import { QuestionSetForm } from "@/components/admin/QuestionSetForm"

export default function QuestionSetsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Question Set Management</h2>
      
      <Tabs defaultValue="category">
        <TabsList>
          <TabsTrigger value="category">Categories</TabsTrigger>
          <TabsTrigger value="subcategory">Subcategories</TabsTrigger>
          <TabsTrigger value="question-set">Question Sets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="category">
          <ExamCategoryForm />
        </TabsContent>
        
        <TabsContent value="subcategory">
          <SubCategoryForm />
        </TabsContent>
        
        <TabsContent value="question-set">
          <QuestionSetForm />
        </TabsContent>
      </Tabs>
    </div>
  )
} 