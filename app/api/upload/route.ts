import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkAdmin } from '@/middleware/adminAuth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(await checkAdmin(session))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Here you would handle the file upload to your storage service
    // For now, return a dummy URL
    const fileUrl = `https://example.com/${file.name}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 