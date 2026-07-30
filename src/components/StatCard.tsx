'use client';

import type { ReactNode } from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

export type StatCardTone = 'default' | 'success' | 'error' | 'warning' | 'info';

interface StatCardProps {
  title: string;
  value: string | number;
  tone?: StatCardTone;
  icon?: ReactNode;
}

const toneColors: Record<Exclude<StatCardTone, 'default'>, { bg: string; color: string }> = {
  success: { bg: 'success.lighter', color: 'success.main' },
  error: { bg: 'error.lighter', color: 'error.main' },
  warning: { bg: 'warning.lighter', color: 'warning.main' },
  info: { bg: 'info.lighter', color: 'info.main' },
};

const StatCard = ({ title, value, tone = 'default', icon }: StatCardProps) => {
  const valueColor = tone === 'default' ? 'text.primary' : toneColors[tone].color;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        p: { xs: 1.5, sm: 2 },
      }}
    >
      <Stack spacing={icon ? 1.25 : 0.75}>
        {icon ? (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: tone === 'default' ? 'action.hover' : toneColors[tone].bg,
              borderRadius: 1.5,
              color: valueColor,
              display: 'flex',
              height: { xs: 30, sm: 36 },
              justifyContent: 'center',
              width: { xs: 30, sm: 36 },
            }}
          >
            {icon}
          </Box>
        ) : null}

        <Stack spacing={0.25}>
          <Typography
            color="text.secondary"
            variant="overline"
            sx={{ fontSize: { xs: '0.625rem', sm: '0.7rem' }, lineHeight: 1.4 }}
          >
            {title}
          </Typography>

          <Typography
            color={valueColor}
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.125rem' },
              fontWeight: 700,
              lineHeight: 1.25,
              overflowWrap: 'anywhere',
            }}
          >
            {value}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default StatCard;
