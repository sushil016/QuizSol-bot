export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string
  questionText: string
  options: string
  correctAnswer: number
  explanation?: string
  questionImageUrl?: string
  explanationImageUrl?: string
  setTitle: string
  categoryName: string
  subCategoryName: string
  subCategoryYear: number
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface QuestionSet {
  id: string
  name: string
  totalQuestions: number
  totalTime: number // in minutes
  subCategories: string[]
  questions: Question[]
}

export interface ExamResult {
  totalQuestions: number
  answeredQuestions: {[key: number]: number}
  skippedQuestions: number[]
  correctAnswers: number
  incorrectAnswers: number
  unattemptedQuestions: number
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