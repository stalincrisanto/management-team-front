import { apiClient } from '@/lib/apiClient';

import { ExpenseCategoryApiResponse, IncomeTypeApiResponse } from '../types/catalog.types';

export const catalogService = {
  getIncomeTypes: (): Promise<IncomeTypeApiResponse[]> => apiClient.get('/catalogs/income-types'),

  getExpenseCategories: (): Promise<ExpenseCategoryApiResponse[]> =>
    apiClient.get('/catalogs/expense-categories'),
};
