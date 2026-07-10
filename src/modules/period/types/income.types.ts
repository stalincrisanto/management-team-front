import { IncomeTypeApiResponse } from './catalog.types';

export interface IncomeApiResponse {
  id: string;
  sourceName: string;
  amount: number;
  description: string;
  createdAt: string;
  incomeType: IncomeTypeApiResponse;
}

export interface CreateIncomeRequest {
  incomeTypeId: string;
  sourceName: string;
  amount: number;
  description: string;
}

export interface UpdateIncomeRequest extends CreateIncomeRequest {}
