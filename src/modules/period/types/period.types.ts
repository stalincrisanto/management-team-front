import { ExpenseApiResponse } from './expense.types';
import { IncomeApiResponse } from './income.types';

export interface PeriodApiResponse {
  id: string;
  title: string;
  periodDate: string;
  opponent: string;
  displayName: string;
  totalIncome: number;
  totalExpenses: number;
  net: number;
  runningBalance: number;
  incomes?: IncomeApiResponse[];
  expenses?: ExpenseApiResponse[];
}

export interface CreatePeriodRequest {
  seasonId: string;
  title: string;
  periodDate: string;
  opponent: string;
}

export interface UpdatePeriodRequest {
  title: string;
  periodDate: string;
  opponent: string;
}
