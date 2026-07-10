import { useQueryClient } from '@tanstack/react-query';

import { useMutate } from '@/hooks/useMutate';

import { incomeService } from '../services/income.services';
import { CreateIncomeRequest, IncomeApiResponse, UpdateIncomeRequest } from '../types/income.types';
import { periodKeys } from './period.keys';

interface CreateIncomeVariables {
  periodId: string;
  payload: CreateIncomeRequest;
}

interface UpdateIncomeVariables {
  periodId: string;
  incomeId: string;
  payload: UpdateIncomeRequest;
}

export const useCreateIncome = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<IncomeApiResponse, CreateIncomeVariables>({
    mutationKey: periodKeys.createIncome,
    service: ({ periodId, payload }) => incomeService.createIncome(periodId, payload),
    onSuccess: (_: IncomeApiResponse, variables: CreateIncomeVariables) => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.detail(variables.periodId) });
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
    },
  });

  return {
    createIncome: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<IncomeApiResponse, UpdateIncomeVariables>({
    mutationKey: periodKeys.updateIncome,
    service: ({ periodId, incomeId, payload }) =>
      incomeService.updateIncome(periodId, incomeId, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.detail(variables.periodId) });
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
    },
  });

  return {
    updateIncome: mutation.mutate,
    isPending: mutation.isPending,
  };
};
