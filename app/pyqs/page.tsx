'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { useToast } from "@/hooks/use-toast";

interface QuestionPaper {
  id: string;
  title: string;
  year: number | null;
  pdfUrl: string;
  isPractice: boolean;
  subCategoryId: string;
  subCategory: {
    name: string;
    year: number;
    category: {
      name: string;
    };
  };
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  year: number;
}

export default function PyqsPage() {
  const [showExamDialog, setShowExamDialog] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/exam-categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "error",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchPapers = useCallback(async (categoryId: string) => {
    try {
      const category = categories.find(c => c.id === categoryId);
      if (!category) return;

      const response = await fetch(`/api/question-papers?categoryName=${category.name}`);
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
  }, [categories, toast]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPapers(selectedCategory);
    }
  }, [selectedCategory, fetchPapers]);

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowExamDialog(false);
  };

  return (
    <div className="container py-10 max-w-7xl mx-auto">
      <Dialog open={showExamDialog} onOpenChange={setShowExamDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="w-full text-left flex flex-col items-start p-4"
                onClick={() => handleCategorySelect(category.id)}
              >
                <span className="font-bold">{category.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {selectedCategory && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {categories.find(c => c.id === selectedCategory)?.name} Resources
            </h1>
            <Button variant="outline" onClick={() => setShowExamDialog(true)}>
              Change Category
            </Button>
          </div>

          <Tabs defaultValue={categories
            .find(c => c.id === selectedCategory)
            ?.subCategories[0]?.id} 
            className="space-y-4"
          >
            <TabsList className="flex flex-wrap">
              {categories
                .find(c => c.id === selectedCategory)
                ?.subCategories.map(sub => (
                  <TabsTrigger key={sub.id} value={sub.id}>
                    {sub.name} ({sub.year})
                  </TabsTrigger>
                ))}
            </TabsList>

            {categories
              .find(c => c.id === selectedCategory)
              ?.subCategories.map(sub => (
                <TabsContent key={sub.id} value={sub.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers
                      .filter(paper => paper.subCategoryId === sub.id)
                      .map((paper) => (
                        <Card key={paper.id}>
                          <CardHeader>
                            <CardTitle>{paper.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex space-x-2">
                              <Button asChild>
                                <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  View PDF
                                </a>
                              </Button>
                              <Button variant="outline" asChild>
                                <a href={paper.pdfUrl} download>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
          </Tabs>
        </>
      )}
    </div>
  );
}