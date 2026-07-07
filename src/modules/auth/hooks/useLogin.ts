import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useMutate } from '@/hooks/useMutate';

import { setAuthCookie } from '../lib/authCookies';
import { setStoredToken } from '../lib/authStorage';
import { authService } from '../services/auth.service';
import { LoginRequest } from '../types/auth.type';

export const AUTH_ME_KEY = ['auth', 'me'] as const;

type LoginCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate, isPending } = useMutate({
    mutationKey: ['auth', 'login'],
    service: authService.login,
  });

  const login = (credentials: LoginRequest, callbacks?: LoginCallbacks) => {
    mutate(credentials, {
      onSuccess: (data) => {
        setStoredToken(data.token);
        setAuthCookie(data.token);
        queryClient.setQueryData(AUTH_ME_KEY, data.user);
        const redirectTo = searchParams.get('redirectTo');
        const targetUrl = redirectTo || '/dashboard';
        console.log('Login correcto, redirigiendo a:', targetUrl);

        callbacks?.onSuccess?.();

        router.replace(targetUrl);
        router.refresh();
      },
      onError: (error) => {
        callbacks?.onError?.(error.message);
      },
    });
  };

  return { login, isPending };
};
