import * as React from 'react';
import type { Metadata } from 'next';
import GuestGuard from '@/modules/auth/components/GuestGuard';
import LoginView from '@/modules/auth/components/LoginView';

import { config } from '@/config';

export const metadata = {
  title: `Iniciar sesión | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <GuestGuard>
      <LoginView />;
    </GuestGuard>
  );
}
