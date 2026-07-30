'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Stack,
} from '@mui/material';

import { CustomButton } from '@/components/CustomButton';
import { usePeriod } from '@/modules/period/hooks/usePeriod';

import ReportPeriodHeader from './components/periodDetail/PeriodDetailHeader';
import PeriodMetricsGrid from './components/period/PeriodMetricsGrid';
import PeriodDetailMovements from './components/periodDetail/PeriodDetailMovements';

interface ReportPeriodDetailViewProps {
  periodId: string;
}

const ReportPeriodDetailView = ({
  periodId,
}: ReportPeriodDetailViewProps) => {
  const router = useRouter();

  const {
    data: period,
    isLoading,
    isError,
    refetch,
  } = usePeriod(periodId);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (isError) {
    return (
      <Stack spacing={2}>
        <Alert
          severity="error"
          action={
            <CustomButton
              color="inherit"
              size="small"
              onClick={() => {
                void refetch();
              }}
            >
              Reintentar
            </CustomButton>
          }
        >
          No fue posible cargar el detalle de la jornada.
        </Alert>

        <CustomButton
          variant="outlined"
          onClick={() => {
            router.push('/treasury/reports');
          }}
        >
          Volver a reportes
        </CustomButton>
      </Stack>
    );
  }

  if (!period) {
    return (
      <Stack spacing={2}>
        <Alert severity="info">
          No se encontró la jornada solicitada.
        </Alert>

        <CustomButton
          variant="outlined"
          onClick={() => {
            router.push('/treasury/reports');
          }}
        >
          Volver a reportes
        </CustomButton>
      </Stack>
    );
  }

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <ReportPeriodHeader
        period={period}
        onBack={() => {
          router.push('/treasury/reports');
        }}
      />
      <PeriodMetricsGrid period={period} />
      <PeriodDetailMovements period={period} />
    </Stack>
  );
};

export default ReportPeriodDetailView;