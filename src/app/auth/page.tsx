import { Suspense } from 'react';
import type { Metadata } from 'next';
import GuestGuard from '@/modules/auth/components/GuestGuard';
import LoginView from '@/modules/auth/components/LoginView';

import { config } from '@/config';

export const metadata = {
  title: `Iniciar sesión | ${config.site.name}`,
} satisfies Metadata;

const LoginFallback = (): React.JSX.Element => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      Cargando...
    </div>
  );
};

export default function Page(): React.JSX.Element {
  return (
    <Suspense fallback={<LoginFallback />}>
      <GuestGuard>
        <LoginView />
      </GuestGuard>
    </Suspense>
  );
}
