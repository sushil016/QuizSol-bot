import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ExamForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="examName">Exam Name</Label>
        <Input id="examName" placeholder="Enter exam name" />
      </div>
      <div>
        <Label htmlFor="subcategories">Subcategories (comma-separated)</Label>
        <Input id="subcategories" placeholder="e.g., 2022, 2023, Main, Advanced" />
      </div>
      <Button type="submit">Add Exam</Button>
    </form>
  )
}

