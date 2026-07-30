'use client';

import React from 'react';
import { SeasonApiResponse } from '@/modules/season/types/season.types';
import { Stack } from '@mui/material';

import SeasonBalanceCard from './SeasonBalanceCard';
import SeasonInfoCard from './SeasonInfoCard';
import SeasonMetricsGrid from './SeasonMetricsGrid';

interface ReportSeasonSectionProps {
  season: SeasonApiResponse;
}

const ReportSeasonSection = ({ season }: ReportSeasonSectionProps) => {
  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      <SeasonInfoCard season={season} />
      <SeasonBalanceCard balance={Number(season.currentBalance)} />
      <SeasonMetricsGrid season={season} />
    </Stack>
  );
};

export default ReportSeasonSection;
