import * as z from 'zod';

export const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()).length(4, 'Exactly 4 options are required'),
  correctAnswer: z.number().min(0).max(3),
  explanation: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Sub-category is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
});

export const questionQuerySchema = z.object({
  category: z.string().optional(),
  subCategory: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
  search: z.string().optional(),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
export type QuestionQueryParams = z.infer<typeof questionQuerySchema>;