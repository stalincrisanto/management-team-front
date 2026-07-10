import React from 'react';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Card, Grid, Stack, Typography } from '@mui/material';

import { PeriodApiResponse } from '../../types/period.types';

interface PeriodSummaryCardsProps {
  period: PeriodApiResponse;
}

const PeriodSummaryCards = ({ period }: PeriodSummaryCardsProps) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ md: 3, xs: 12 }}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="overline">Ingresos</Typography>
            <Typography variant="h4" color="success.main">
              {formatMoney(period.totalIncome)}
            </Typography>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="overline">Gastos</Typography>
            <Typography variant="h4" color="error.main">
              {formatMoney(period.totalExpenses)}
            </Typography>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="overline">Resultado neto</Typography>
            <Typography variant="h4" color={period.net >= 0 ? 'success.main' : 'error.main'}>
              {period.net >= 0 ? '+' : ''}
              {formatMoney(period.net)}
            </Typography>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="overline">Saldo acumulado</Typography>
            <Typography variant="h4">{formatMoney(period.runningBalance)}</Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PeriodSummaryCards;
