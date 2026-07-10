type IncomeType = 'APORTE_DIRIGENTE' | 'APORTE_INDIVIDUAL' | 'AUSPICIO';
type ExpenseCategory = 'PAGO_JUGADOR' | 'ARBITRAJE' | 'MULTA' | 'TARJETAS';

export interface IncomeTypeApiResponse {
  id: string;
  code: IncomeType;
  name: string;
}

export interface ExpenseCategoryApiResponse {
  id: string;
  code: ExpenseCategory;
  name: string;
}
