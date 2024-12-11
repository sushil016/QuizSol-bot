'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Trash2 } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface QuestionPaper {
  id: string;
  title: string;
  examType: string;
  year?: number | null;
  isPractice: boolean;
  pdfUrl: string;
}

interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}

interface SubCategory {
  id: string
  name: string
  year: number
}

export function QuestionPaperUpload() {
  const [paperType, setPaperType] = useState<'pyq' | 'practice'>('pyq');
  const [examType, setExamType] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubCategory, setSelectedSubCategory] = useState("")

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []);

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/admin/question-papers');
      if (!response.ok) throw new Error('Failed to fetch papers');
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error('Error fetching papers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch papers",
        variant: "error",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/exam-categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "error",
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file || !selectedSubCategory) {
        toast({
          title: "Error",
          description: "Please select a file and subcategory",
          variant: "error",
        });
        return;
      }

      // First upload the file
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const { url: pdfUrl } = await uploadResponse.json();

      // Then create the question paper record
      const response = await fetch('/api/admin/question-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subCategoryId: selectedSubCategory,
          isPractice: paperType === 'practice',
          year: paperType === 'pyq' ? Number(year) : null,
          pdfUrl
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Paper uploaded successfully",
      });

      // Reset form
      setPaperType('pyq');
      setSelectedCategory('');
      setSelectedSubCategory('');
      setTitle('');
      setYear('');
      setFile(null);
      fetchPapers();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload paper",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Question Paper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Paper Type</label>
                <select 
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value as 'pyq' | 'practice')}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="pyq">Previous Year Question</option>
                  <option value="practice">Practice Paper</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sub Category</label>
                  <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sub Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .find(c => c.id === selectedCategory)
                        ?.subCategories.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.name} ({sub.year})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter paper title"
                />
              </div>

              {paperType === 'pyq' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter year"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              {loading ? 'Uploading...' : 'Upload Paper'}
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Papers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Exam</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-gray-200">
                {papers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{paper.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {paper.isPractice ? 'Practice' : 'PYQ'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{paper.examType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{paper.year || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}