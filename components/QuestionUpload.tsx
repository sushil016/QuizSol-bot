import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuestionUpload() {
  return (
    <form className="space-y-4">
      <Textarea placeholder="Enter question text" />
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Option A" />
        <Input placeholder="Option B" />
        <Input placeholder="Option C" />
        <Input placeholder="Option D" />
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select correct answer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="C">C</SelectItem>
          <SelectItem value="D">D</SelectItem>
        </SelectContent>
      </Select>
      <Textarea placeholder="Explanation (optional)" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NEET">NEET</SelectItem>
          <SelectItem value="JEE">JEE</SelectItem>
          <SelectItem value="GATE">GATE</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Sub-category (e.g., year, shift)" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Upload Question</Button>
    </form>
  )
}

