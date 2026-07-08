import * as React from 'react';
import type { Metadata } from 'next';
import SeasonsView from '@/modules/season/SeasonsView';

import { config } from '@/config';

export const metadata = {
  title: `Temporadas | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SeasonsView />;
}
