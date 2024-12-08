'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';

interface QuestionPaper {
  id: string;
  title: string;
  examType: string;
  year: number | null;
  pdfUrl: string;
  isPractice: boolean;
}

const examTypes = [
  { id: 'NEET', title: 'NEET', description: 'National Eligibility cum Entrance Test' },
  { id: 'JEE', title: 'JEE', description: 'Joint Entrance Examination' },
  { id: 'GATE', title: 'GATE', description: 'Graduate Aptitude Test in Engineering' },
];

export default function PyqsPage() {
  const [showExamDialog, setShowExamDialog] = useState(true);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const router = useRouter();

  const handleExamSelect = async (examType: string) => {
    setSelectedExam(examType);
    setShowExamDialog(false);
    
    try {
      const response = await fetch(`/api/question-papers?examType=${examType}`);
      if (!response.ok) throw new Error('Failed to fetch papers');
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {/* Exam Selection Dialog */}
      <Dialog open={showExamDialog} onOpenChange={setShowExamDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Your Exam</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {examTypes.map((exam) => (
              <Button
                key={exam.id}
                variant="outline"
                className="w-full text-left flex flex-col items-start p-4"
                onClick={() => handleExamSelect(exam.id)}
              >
                <span className="font-bold">{exam.title}</span>
                <span className="text-sm text-muted-foreground">{exam.description}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      {selectedExam && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{selectedExam} Resources</h1>
            <Button variant="outline" onClick={() => setShowExamDialog(true)}>
              Change Exam
            </Button>
          </div>

          <Tabs defaultValue="pyqs" className="space-y-4">
            <TabsList className="grid max-w-3xl justify-center items-center grid-cols-2">
              <TabsTrigger value="pyqs">Previous Year Papers</TabsTrigger>
              <TabsTrigger value="practice">Practice Papers</TabsTrigger>
            </TabsList>

            <TabsContent value="pyqs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers
                  .filter(paper => !paper.isPractice)
                  .sort((a, b) => (b.year || 0) - (a.year || 0))
                  .map((paper) => (
                    <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start">
                          <span>{paper.title}</span>
                          <span className="text-lg font-semibold text-primary">
                            {paper.year}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button 
                          className="w-full flex items-center gap-2" 
                          asChild
                        >
                          <a 
                            href={paper.pdfUrl} 
                            download 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="practice">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers
                  .filter(paper => paper.isPractice)
                  .map((paper) => (
                    <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{paper.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button 
                          className="w-full flex items-center gap-2"
                          asChild
                        >
                          <a 
                            href={paper.pdfUrl} 
                            download 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                            Download Practice Paper
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}