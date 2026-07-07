'use client';

import React, { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthMe } from '@/modules/auth/hooks/useAuthMe';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps): React.JSX.Element | null => {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isLoading, isFetching } = useAuthMe();

  const checking = isLoading || isFetching;

  useEffect(() => {
    if (!checking && !isAuthenticated) {
      router.replace(`/auth?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [checking, isAuthenticated, pathname, router]);

  if (checking) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
