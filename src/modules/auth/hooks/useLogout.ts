'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { clearAuthSession } from '../lib/authSession';
import { AUTH_ME_KEY } from './useAuthMe';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    clearAuthSession();

    queryClient.removeQueries({ queryKey: AUTH_ME_KEY });
    queryClient.clear();

    router.replace('/auth');
    router.refresh();
  };

  return {
    logout,
  };
}
