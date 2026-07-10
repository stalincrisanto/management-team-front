import { ExpenseCategoryApiResponse } from './catalog.types';

export interface ExpenseApiResponse {
  id: string;
  concept: string;
  amount: number;
  description: string;
  createdAt: string;
  expenseCategory: ExpenseCategoryApiResponse;
}

export interface CreateExpenseRequest {
  expenseCategoryId: string;
  concept: string;
  amount: number;
}

export interface UpdateExpenseRequest extends CreateExpenseRequest {}
