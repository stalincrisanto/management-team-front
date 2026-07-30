'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Card, CircularProgress, Stack, Typography } from '@mui/material';

import { CustomButton } from '@/components/CustomButton';

import { REPORT_PERIODS_PAGE_SIZE, useReportPeriods } from '../../hooks/useReportPeriods';
import PeriodAccordion from './PeriodAccordion';

interface ReportPeriodsSectionProps {
  seasonId: string;
}

const ReportPeriodsSection = ({ seasonId }: ReportPeriodsSectionProps) => {
  const [expandedPeriodId, setExpandedPeriodId] = useState<string | null>(null);

  const {
    periods,
    totalElements,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useReportPeriods(seasonId);

  useEffect(() => {
    setExpandedPeriodId(null);
  }, [seasonId]);

  const remainingPeriods = Math.max(totalElements - periods.length, 0);

  const nextPageSize = Math.min(REPORT_PERIODS_PAGE_SIZE, remainingPeriods);

  // const loadMoreLabel = useMemo(() => {
  //   if (isFetchingNextPage) {
  //     return 'Cargando jornadas...';
  //   }

  //   const noun = nextPageSize === 1 ? 'jornada' : 'jornadas';

  //   return `Cargar ${nextPageSize} ${noun} más`;
  // }, [isFetchingNextPage, nextPageSize]);

  const noun = nextPageSize === 1 ? 'jornada' : 'jornadas';

  const loadMoreLabel = isFetchingNextPage
    ? 'Cargando jornadas...'
    : `Cargar ${nextPageSize} ${noun} más`;

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (isError) {
    return (
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
        No fue posible cargar las jornadas.
      </Alert>
    );
  }

  if (periods.length === 0) {
    return (
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h5">Jornadas</Typography>

          <Typography color="text.secondary" variant="body2">
            0 jornadas registradas
          </Typography>
        </Stack>

        <Alert severity="info">Todavía no existen jornadas registradas para esta temporada.</Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h5">Jornadas</Typography>

        <Typography color="text.secondary" variant="body2">
          {totalElements} {totalElements === 1 ? 'jornada registrada' : 'jornadas registradas'}
        </Typography>
      </Stack>

      <Card
        variant="outlined"
        sx={{
          overflow: 'hidden',
        }}
      >
        {periods.map((period) => (
          <PeriodAccordion
            key={period.id}
            period={period}
            expanded={expandedPeriodId === period.id}
            onChange={() => {
              setExpandedPeriodId((currentId) => (currentId === period.id ? null : period.id));
            }}
          />
        ))}
      </Card>

      <Typography align="center" color="text.secondary" variant="body2">
        Mostrando {periods.length} de {totalElements} jornadas
      </Typography>

      {isFetchNextPageError ? (
        <Alert severity="error">No fue posible cargar más jornadas. Intenta nuevamente.</Alert>
      ) : null}

      {hasNextPage ? (
        <CustomButton
          fullWidth
          variant="outlined"
          disabled={isFetchingNextPage}
          icon={isFetchingNextPage ? <CircularProgress color="inherit" size={18} /> : undefined}
          onClick={() => {
            void fetchNextPage();
          }}
        >
          {loadMoreLabel}
        </CustomButton>
      ) : null}
    </Stack>
  );
};

export default ReportPeriodsSection;
