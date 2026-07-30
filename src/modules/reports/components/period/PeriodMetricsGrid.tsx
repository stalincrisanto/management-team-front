'use client';

import type { PeriodApiResponse } from '@/modules/period/types/period.types';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Grid } from '@mui/material';

import StatCard, { StatCardTone } from '@/components/StatCard';

interface PeriodMetricsGridProps {
  period: PeriodApiResponse;
}

const PeriodMetricsGrid = ({ period }: PeriodMetricsGridProps) => {
  const net = Number(period.net);
  const netTone: StatCardTone = net > 0 ? 'success' : net < 0 ? 'error' : 'default';
  const netLabel = net > 0 ? `+${formatMoney(net)}` : formatMoney(net);

  const metrics = [
    {
      key: 'income',
      title: 'Ingresos',
      value: formatMoney(Number(period.totalIncome)),
      tone: 'success' as const,
    },
    {
      key: 'expenses',
      title: 'Gastos',
      value: formatMoney(Number(period.totalExpenses)),
      tone: 'error' as const,
    },
    { key: 'net', title: 'Resultado neto', value: netLabel, tone: netTone },
    {
      key: 'balance',
      title: 'Saldo acumulado',
      value: formatMoney(Number(period.runningBalance)),
      tone: 'default' as const,
    },
  ];

  return (
    <Grid container spacing={1.5}>
      {metrics.map((metric) => (
        <Grid key={metric.key} size={{ xs: 6, md: 3 }}>
          <StatCard title={metric.title} value={metric.value} tone={metric.tone} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PeriodMetricsGrid;
