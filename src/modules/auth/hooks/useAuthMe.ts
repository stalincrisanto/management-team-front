import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import { getStoredToken } from '../lib/authStorage';
import { authService } from '../services/auth.service';
import { UserMeResponse } from '../types/auth.type';

export const AUTH_ME_KEY = ['auth', 'me'] as const;

export const useAuthMe = () => {
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
    // retry: false,
  });

  const isCheckingSession = !ready || (hasToken && query.isLoading);

  return {
    user: query.data,
    hasToken,
    isAuthenticated: Boolean(query.data),
    isCheckingSession,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    errorMessage: query.errorMessage,
    refetch: query.refetch,
  };
};
