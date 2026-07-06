import { useQuery, type QueryFunction, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';

export function useFetch<TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}