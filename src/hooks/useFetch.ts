import { useQuery, type QueryKey } from '@tanstack/react-query';

import { ApiError } from '@/types/apiError';

interface UseFetchProps<TData> {
  queryKey: QueryKey;
  service: () => Promise<TData>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export const useFetch = <TData>({
  queryKey,
  service,
  enabled = true,
  staleTime,
  gcTime,
}: UseFetchProps<TData>) => {
  const query = useQuery<TData, ApiError>({
    queryKey,
    queryFn: service, // apiClient ya lanza ApiError si algo falla
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error, // ApiError tipado
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};
