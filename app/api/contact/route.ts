import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Create a new contact entry
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 