import * as React from 'react';
import type { Metadata } from 'next';
import NewPeriodView from '@/modules/period/components/view/NewPeriodView';

import { config } from '@/config';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <NewPeriodView />;
}
