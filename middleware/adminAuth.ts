import { Session } from 'next-auth';
import prisma from '@/lib/prisma';

export const checkAdmin = async (session: Session) => {
  if (!session?.user?.email) return false;
  
  // Check directly in the database instead of making an API call
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  return user?.role === 'ADMIN';
};

export const adminAuth = async () => {
  const user = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });
  if (!user) throw new Error('No admin found');
  return user;
};