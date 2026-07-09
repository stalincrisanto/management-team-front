import { useQueryClient } from '@tanstack/react-query';

import { useMutate } from '@/hooks/useMutate';

import { seasonService } from '../services/season.service';
import { CreateSeasonRequest, SeasonApiResponse, UpdateSeasonRequest } from '../types/season.types';
import { seasonKeys } from './season.keys';

interface UpdateSeasonVariables {
  id: string;
  payload: UpdateSeasonRequest;
}

export const useCreateSeason = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<SeasonApiResponse, CreateSeasonRequest>({
    mutationKey: seasonKeys.create,
    service: seasonService.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: seasonKeys.all });
    },
  });

  return {
    createSeason: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};

export const useUpdateSeason = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<SeasonApiResponse, UpdateSeasonVariables>({
    mutationKey: seasonKeys.update,
    service: ({ id, payload }) => seasonService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: seasonKeys.all });
    },
  });

  return {
    updateSeason: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};

export const useActivateSeason = () => {
  const queryClient = useQueryClient();

  const mutation = useMutate<void, string>({
    mutationKey: seasonKeys.activate,
    service: seasonService.activate,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: seasonKeys.all });
    },
  });

  return {
    activateSeason: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
