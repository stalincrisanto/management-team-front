'use client';

import React, { JSX, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

import { useAuthMe } from '../hooks/useAuthMe';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps): JSX.Element | null => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuthMe();

  const checking = isLoading;

  useEffect(() => {
    if (!checking && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [checking, isAuthenticated, router]);

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

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
