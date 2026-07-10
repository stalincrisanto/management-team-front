import { apiClient } from '@/lib/apiClient';

import {
  CreateExpenseRequest,
  ExpenseApiResponse,
  UpdateExpenseRequest,
} from '../types/expense.types';

export const expenseService = {
  createExpense: (periodId: string, payload: CreateExpenseRequest): Promise<ExpenseApiResponse> =>
    apiClient.post(`/periods/${periodId}/expenses`, payload),

  updateExpense: (
    periodId: string,
    expenseId: string,
    payload: UpdateExpenseRequest,
  ): Promise<ExpenseApiResponse> =>
    apiClient.put(`/periods/${periodId}/expenses/${expenseId}`, payload),
};
