import { useMutation, type MutationKey } from '@tanstack/react-query';

import { ApiError } from '@/types/apiError';

interface MutateCallbacks<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}

interface UseMutateProps<TData, TVariables> {
  mutationKey?: MutationKey;
  service: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}

export const useMutate = <TData, TVariables>({
  mutationKey,
  service,
  onSuccess: defaultOnSuccess,
  onError: defaultOnError,
}: UseMutateProps<TData, TVariables>) => {
  const mutation = useMutation<TData, ApiError, TVariables>({
    mutationKey,
    mutationFn: service,
  });

  const mutate = (variables: TVariables, callbacks?: MutateCallbacks<TData>): void => {
    mutation.mutate(variables, {
      onSuccess: (data) => {
        const handler = callbacks?.onSuccess ?? defaultOnSuccess;
        handler?.(data);
      },
      onError: (error) => {
        const handler = callbacks?.onError ?? defaultOnError;
        handler?.(error);
      },
    });
  };

  return {
    mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
