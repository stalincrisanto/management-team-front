'use client';

import React from 'react';
import { PeriodApiResponse } from '@/modules/period/types/period.types';
import { formatMoney, formatSeasonDate } from '@/modules/season/utils/season.mapper';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';

interface PeriodAccordionSummaryProps {
  period: PeriodApiResponse;
}

const PeriodAccordionSummary = ({ period }: PeriodAccordionSummaryProps) => {
  const net = Number(period.net);
  const netColor = net > 0 ? 'success.main' : net < 0 ? 'error.main' : 'text.secondary';
  const netLabel = net > 0 ? `+${formatMoney(net)}` : formatMoney(net);

  return (
    <Stack spacing={0.25} sx={{ minWidth: 0, width: '100%' }}>
      <Typography
        color="text.secondary"
        component="span"
        sx={{ fontSize: { xs: '0.6875rem', sm: '0.75rem' }, lineHeight: 1.3 }}
      >
        {period.title} · {formatSeasonDate(period.periodDate)}
      </Typography>

      <Box
        sx={{
          alignItems: 'baseline',
          display: 'flex',
          gap: 1,
          justifyContent: 'space-between',
          minWidth: 0,
        }}
      >
        <Typography
          component="span"
          noWrap
          sx={{
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            fontWeight: 700,
            lineHeight: 1.4,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          vs {period.opponent}
        </Typography>

        <Typography
          component="span"
          sx={{
            color: netColor,
            flexShrink: 0,
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            fontWeight: 700,
          }}
        >
          {netLabel}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PeriodAccordionSummary;
