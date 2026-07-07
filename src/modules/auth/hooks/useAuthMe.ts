import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/types/apiError';
import { useFetch } from '@/hooks/useFetch';

import { clearAuthSession } from '../lib/authSession';
import { getStoredToken } from '../lib/authStorage';
import { authService } from '../services/auth.service';
import { UserMeResponse } from '../types/auth.type';

export const AUTH_ME_KEY = ['auth', 'me'] as const;

export const useAuthMe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [ready, setReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getStoredToken()));
    setReady(true);
  }, []);

  const query = useFetch<UserMeResponse>({
    queryKey: AUTH_ME_KEY,
    service: authService.me,
    enabled: ready && hasToken,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.error instanceof ApiError && query.error.status === 401) {
      clearAuthSession();

      queryClient.removeQueries({
        queryKey: AUTH_ME_KEY,
      });

      router.replace('/auth');
    }
  }, [query.error, queryClient, router]);

  return {
    user: query.data,
    isAuthenticated: Boolean(query.data),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    errorMessage: query.errorMessage,
    refetch: query.refetch,
  };
};
