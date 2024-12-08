export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
  subCategory: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserActivity {
  id: string;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  timeTaken: number;
  attemptedAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  questionId: string;
  createdAt: Date;
}