import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import LoginView from '@/modules/auth/components/LoginView';

export const metadata = {
  title: `Iniciar sesión | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <LoginView />;
}