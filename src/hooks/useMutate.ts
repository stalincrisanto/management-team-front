import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export function useMutate<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, unknown, TVariables>
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}