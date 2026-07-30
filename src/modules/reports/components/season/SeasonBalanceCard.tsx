'use client';

import React from 'react';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Box, Card, Stack, Typography } from '@mui/material';
import { WalletIcon } from '@phosphor-icons/react';

interface SeasonBalanceCardProps {
  balance: number;
}

const SeasonBalanceCard = ({ balance }: SeasonBalanceCardProps) => {
  return (
    <Card
      sx={{
        bgcolor: 'warning.main',
        color: 'warning.contrastText',
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1.5}>
        <Stack spacing={1}>
          <Typography color="inherit" sx={{ opacity: 0.8 }} variant="overline">
            Saldo actual
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: '1.75rem',
                sm: '2.25rem',
                md: '2.5rem',
              },
              fontWeight: 700,
              lineHeight: 1.1,
              wordBreak: 'break-word',
            }}
          >
            {formatMoney(balance)}
          </Typography>
        </Stack>

        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: 1.5,
            display: 'flex',
            flexShrink: 0,
            height: { xs: 34, sm: 40 },
            justifyContent: 'center',
            width: { xs: 34, sm: 40 },
          }}
        >
          <WalletIcon size={20} />
        </Box>
      </Stack>
    </Card>
  );
};

export default SeasonBalanceCard;
