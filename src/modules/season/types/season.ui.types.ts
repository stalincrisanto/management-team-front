export type SeasonStatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

export interface SeasonRow {
  id: string;
  name: string;
  period: string;
  initialBalance: number;
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  totalPeriods: number;
  isActive: boolean;
  status: string;
}