import { apiClient } from '@/lib/apiClient';

import { CreateIncomeRequest, IncomeApiResponse, UpdateIncomeRequest } from '../types/income.types';

export const incomeService = {
  createIncome: (periodId: string, payload: CreateIncomeRequest): Promise<IncomeApiResponse> =>
    apiClient.post(`/periods/${periodId}/incomes`, payload),

  updateIncome: (
    periodId: string,
    incomeId: string,
    payload: UpdateIncomeRequest,
  ): Promise<IncomeApiResponse> =>
    apiClient.put(`/periods/${periodId}/incomes/${incomeId}`, payload),
};
