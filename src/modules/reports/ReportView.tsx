'use client';

import React from 'react';
import { Alert, Stack } from '@mui/material';

import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';

import { useSeasonActive } from '../season/hooks/useSeasonActive';
import ReportPeriodsSection from './components/period/ReportPeriodSection';
import ReportSeasonSection from './components/season/ReportSeasonSection';

const ReportView = () => {
  const { data: season, isLoading, isError, refetch } = useSeasonActive();

  if (isLoading) {
    return <h1>Cargando datos...</h1>;
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <CustomButton color="inherit" size="small" onClick={() => void refetch()}>
            Reintentar
          </CustomButton>
        }
      >
        No fue posible cargar la información de la temporada.
      </Alert>
    );
  }

  if (!season) {
    return <Alert severity="info">No existe una temporada activa disponible.</Alert>;
  }

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <SectionHeader
        title="Reportes"
        subtitle="Consulta el resumen financiero de la temporada y el detalle de cada jornada."
      />

      <ReportSeasonSection season={season} />
      <ReportPeriodsSection seasonId={season.id} />
    </Stack>
  );
};

export default ReportView;
