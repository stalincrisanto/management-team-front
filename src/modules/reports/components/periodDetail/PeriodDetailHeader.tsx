'use client';

import React from 'react';
import type { PeriodApiResponse } from '@/modules/period/types/period.types';
import { formatMoney, formatSeasonDate } from '@/modules/season/utils/season.mapper';
import { Card, Chip, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeftIcon } from '@phosphor-icons/react';

interface ReportPeriodHeaderProps {
  period: PeriodApiResponse;
  onBack: () => void;
}

const ReportPeriodHeader = ({ period, onBack }: ReportPeriodHeaderProps) => {
  const net = Number(period.net);
  const netTone: 'success' | 'error' | 'default' =
    net > 0 ? 'success' : net < 0 ? 'error' : 'default';
  const netLabel = net > 0 ? `+${formatMoney(net)}` : formatMoney(net);

  return (
    <Card variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack spacing={1.5}>
        <IconButton
          aria-label="Volver a reportes"
          onClick={onBack}
          size="small"
          sx={{ alignSelf: 'flex-start', ml: -1 }}
        >
          <ArrowLeftIcon size={20} />
        </IconButton>

        <Stack spacing={0.5}>
          <Typography color="text.secondary" variant="overline">
            {period.title} · {formatSeasonDate(period.periodDate)}
          </Typography>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.15rem', sm: '1.5rem' },
                fontWeight: 600,
                overflowWrap: 'anywhere',
              }}
            >
              vs {period.opponent}
            </Typography>

            <Chip
              color={netTone}
              label={netLabel}
              size="small"
              sx={{ fontWeight: 700, flexShrink: 0 }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ReportPeriodHeader;
