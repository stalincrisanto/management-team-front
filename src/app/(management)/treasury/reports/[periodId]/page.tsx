import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import ReportPeriodDetailView from '@/modules/reports/ReportPeriodDetailView';

export const metadata = {
  title: `Detalle de jornada | Reportes | ${config.site.name}`,
} satisfies Metadata;

interface PageProps {
  params: Promise<{
    periodId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { periodId } = await params;

  return <ReportPeriodDetailView periodId={periodId} />;
}