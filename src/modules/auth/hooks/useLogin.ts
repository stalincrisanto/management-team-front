import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { paths } from '@/paths';
import { useMutate } from '@/hooks/useMutate';
import { getInitialPathByRole } from '@/components/dashboard/layout/helper/initialPathByRole';

import { persistAuthSession } from '../lib/authSession';
import { resolveSafeRedirect } from '../lib/resolveSafeRedirect';
import { authService } from '../services/auth.service';
import { LoginRequest } from '../types/auth.type';
import { AUTH_ME_KEY } from './useAuthMe';

type LoginCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

const isReportsPath = (pathname: string): boolean => {
  return pathname === paths.treasury.reports || pathname.startsWith(`${paths.treasury.reports}/`);
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
        persistAuthSession(data.token);
        queryClient.setQueryData(AUTH_ME_KEY, data.user);

        const defaultPath = getInitialPathByRole(data.user.role);

        const safeRedirect = resolveSafeRedirect(searchParams.get('redirectTo'));

        const targetUrl =
          data.user.role === 'VIEWER'
            ? isReportsPath(safeRedirect)
              ? safeRedirect
              : defaultPath
            : safeRedirect;

        callbacks?.onSuccess?.();

        router.replace(targetUrl);
      },
      onError: (error) => {
        callbacks?.onError?.(error.message);
      },
    });
  };

  return { login, isPending };
};
