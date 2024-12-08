import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {checkAdmin} from '@/middleware/adminAuth';
import { QuestionPaperUpload } from '@/components/admin/QuestionPaperUpload';

export default async function AdminQuestionPapersPage() {
  const session = await getServerSession(authOptions);
  if (!session || !(await checkAdmin(session))) {
    redirect('/');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Manage Question Papers</h1>
      <QuestionPaperUpload />
    </div>
  );
} 