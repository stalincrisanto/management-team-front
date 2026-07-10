import { useQueryClient } from '@tanstack/react-query';

import { useMutate } from '@/hooks/useMutate';

import { expenseService } from '../services/expense.service';
import {
  CreateExpenseRequest,
  ExpenseApiResponse,
  UpdateExpenseRequest,
} from '../types/expense.types';
import { periodKeys } from './period.keys';

interface CreateExpenseVariables {
  periodId: string;
  payload: CreateExpenseRequest;
}

interface UpdateExpenseVariables {
  periodId: string;
  expenseId: string;
  payload: UpdateExpenseRequest;
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<ExpenseApiResponse, CreateExpenseVariables>({
    mutationKey: periodKeys.createExpense,
    service: ({ periodId, payload }) => expenseService.createExpense(periodId, payload),
    onSuccess: (_: ExpenseApiResponse, variables: CreateExpenseVariables) => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.detail(variables.periodId) });
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
    },
  });

  return {
    createExpense: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<ExpenseApiResponse, UpdateExpenseVariables>({
    mutationKey: periodKeys.updateExpense,
    service: ({ periodId, expenseId, payload }) =>
      expenseService.updateExpense(periodId, expenseId, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.detail(variables.periodId) });
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
    },
  });

  return {
    updateExpense: mutation.mutate,
    isPending: mutation.isPending,
  };
};
