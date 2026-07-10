import { useFetch } from '@/hooks/useFetch';

import { catalogService } from '../services/catalog.service';
import { ExpenseCategoryApiResponse, IncomeTypeApiResponse } from '../types/catalog.types';
import { catalogKeys } from './period.keys';

export const useIncomeTypes = () => {
  return useFetch<IncomeTypeApiResponse[]>({
    queryKey: catalogKeys.incomeTypes,
    service: catalogService.getIncomeTypes,
    staleTime: 5 * 60 * 1000,
  });
};

export const useExpenseCategories = () => {
  return useFetch<ExpenseCategoryApiResponse[]>({
    queryKey: catalogKeys.expenseCategories,
    service: catalogService.getExpenseCategories,
    staleTime: 5 * 60 * 1000,
  });
};
