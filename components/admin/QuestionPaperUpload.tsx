'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast,useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download } from 'lucide-react';

interface QuestionPaper {
  id: string;
  title: string;
  examType: string;
  year: number | null;
  pdfUrl: string;
  isPractice: boolean;
  createdAt: string;
}

const examTypes = ['NEET', 'JEE', 'GATE'];

export function QuestionPaperUpload() {
  const [loading, setLoading] = useState(false);
  const [examType, setExamType] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [paperType, setPaperType] = useState('pyq'); // 'pyq' or 'practice'
  const [papers, setPapers] = useState<QuestionPaper[]>([]);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/admin/question-papers');
      if (!response.ok) throw new Error('Failed to fetch papers');
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch uploaded papers',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examType || !title || !file || (!year && paperType === 'pyq')) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Mock upload - Replace with actual upload logic
      const pdfUrl = 'https://example.com/pdf-url';

      const response = await fetch('/api/admin/question-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examType,
          year: paperType === 'pyq' ? parseInt(year) : null,
          pdfUrl,
          title,
          isPractice: paperType === 'practice',
        }),
      });

      if (!response.ok) throw new Error('Upload failed');

      toast({
        title: 'Success',
        description: 'Question paper uploaded successfully',
      });

      // Reset form
      setExamType('');
      setYear('');
      setTitle('');
      setFile(null);
      setPaperType('pyq');
      fetchPapers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload question paper',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Question Paper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Paper Type</Label>
              <RadioGroup
                defaultValue="pyq"
                value={paperType}
                onValueChange={setPaperType}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pyq" id="pyq" />
                  <Label htmlFor="pyq">Previous Year Question</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="practice" id="practice" />
                  <Label htmlFor="practice">Practice Paper</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {paperType === 'pyq' && (
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="Enter year"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter paper title"
              />
            </div>

            <div className="space-y-2">
              <Label>PDF File</Label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Uploading...' : 'Upload Paper'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Papers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Exam</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Year</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-zinc-950">
                {papers.map((paper) => (
                  <tr key={paper.id}>
                    <td className="px-6 py-4 text-sm">{paper.title}</td>
                    <td className="px-6 py-4 text-sm">
                      {paper.isPractice ? 'Practice' : 'PYQ'}
                    </td>
                    <td className="px-6 py-4 text-sm">{paper.examType}</td>
                    <td className="px-6 py-4 text-sm">{paper.year || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="inline-flex items-center gap-2"
                      >
                        <a
                          href={paper.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
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