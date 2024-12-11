import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function QuestionPapersPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const papers = await prisma.questionPaper.findMany({
    include: {
      subCategory: {
        include: {
          category: true
        }
      }
    },
    orderBy: [
      { year: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Previous Year Question Papers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <Card key={paper.id}>
            <CardHeader>
              <CardTitle>{paper.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Exam: {paper.subCategory.category.name}</p>
              <p>Year: {paper.year}</p>
              <Link
                href={paper.pdfUrl}
                target="_blank"
                className="text-primary hover:underline"
              >
                View Paper
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 