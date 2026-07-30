'use client';

import React from 'react';
import { SeasonApiResponse } from '@/modules/season/types/season.types';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Grid } from '@mui/material';
import {
  CalendarBlankIcon,
  PiggyBankIcon,
  TrendDownIcon,
  TrendUpIcon,
} from '@phosphor-icons/react';

import StatCard from '@/components/StatCard';

interface SeasonMetricsGridProps {
  season: SeasonApiResponse;
}

const SeasonMetricsGrid = ({ season }: SeasonMetricsGridProps) => {
  const metrics = [
    {
      key: 'initialBalance',
      title: 'Saldo inicial',
      value: formatMoney(Number(season.initialBalance ?? 0)),
      icon: <PiggyBankIcon size={21} />,
      tone: 'warning' as const,
    },
    {
      key: 'totalIncome',
      title: 'Total ingresos',
      value: formatMoney(Number(season.totalIncome ?? 0)),
      icon: <TrendUpIcon size={21} />,
      tone: 'success' as const,
    },
    {
      key: 'totalExpenses',
      title: 'Total gastos',
      value: formatMoney(Number(season.totalExpenses ?? 0)),
      icon: <TrendDownIcon size={21} />,
      tone: 'error' as const,
    },
    {
      key: 'totalPeriods',
      title: 'Jornadas registradas',
      value: Number(season.totalPeriods ?? 0),
      icon: <CalendarBlankIcon size={21} />,
      tone: undefined,
    },
  ];

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {metrics.map(({ key, ...statCardProps }) => (
        <Grid key={key} size={{ xs: 6, md: 3 }}>
          <StatCard {...statCardProps} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SeasonMetricsGrid;
