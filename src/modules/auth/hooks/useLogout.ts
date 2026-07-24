'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { clearAuthSession } from '../lib/authSession';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = (): void => {
    clearAuthSession();
    queryClient.clear();

    router.replace('/auth');
  };

  return {
    logout,
  };
}
