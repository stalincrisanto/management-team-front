export type SeasonStatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

export interface SeasonApiResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string | null;
  initialBalance: number | string;
  isActive?: boolean;
  totalIncome?: number | string;
  totalExpenses?: number | string;
  currentBalance?: number | string;
  totalPeriods?: number;
}


export interface CreateSeasonRequest {
  name: string;
  startDate: string;
  endDate?: string | null;
  initialBalance: number;
  activate?: boolean;
}

export interface UpdateSeasonRequest {
  name: string;
  startDate: string;
  endDate?: string | null;
  initialBalance: number;
}

export interface SeasonFormValues {
  name: string;
  startDate: string;
  endDate: string;
  initialBalance: number;
  activate: boolean;
}
