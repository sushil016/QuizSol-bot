import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function PDFList() {
  const pdfs = [
    { id: 1, name: "NEET 2023 Question Paper", category: "NEET", subCategory: "2023", downloads: 1500 },
    { id: 2, name: "JEE Main 2023 Paper 1", category: "JEE", subCategory: "2023, Shift 1", downloads: 2000 },
    { id: 3, name: "GATE CSE 2023", category: "GATE", subCategory: "CSE 2023", downloads: 1200 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">PDF List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sub-category</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pdfs.map((pdf) => (
            <TableRow key={pdf.id}>
              <TableCell>{pdf.name}</TableCell>
              <TableCell>{pdf.category}</TableCell>
              <TableCell>{pdf.subCategory}</TableCell>
              <TableCell>{pdf.downloads}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Replace</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

