import { useQueryClient } from '@tanstack/react-query';

import { useMutate } from '@/hooks/useMutate';

import { periodService } from '../services/period.services';
import { CreatePeriodRequest, PeriodApiResponse, UpdatePeriodRequest } from '../types/period.types';
import { periodKeys } from './period.keys';

interface UpdatePeriodVariables {
  id: string;
  payload: UpdatePeriodRequest;
}

export const useCreatePeriod = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<PeriodApiResponse, CreatePeriodRequest>({
    mutationKey: periodKeys.create,
    service: periodService.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
    },
  });

  return {
    createPeriod: mutation.mutate,
    isPending: mutation.isPending,
    reset: mutation.reset,
  };
};

export const useUpdatePeriod = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<PeriodApiResponse, UpdatePeriodVariables>({
    mutationKey: periodKeys.update,
    service: ({ id, payload }) => periodService.update(id, payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: periodKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: periodKeys.detail(data.id) });
    },
  });

  return {
    updatePeriod: mutation.mutate,
    isPending: mutation.isPending,
    reset: mutation.reset,
  };
};
