'use client';

import React from 'react';
import { SeasonApiResponse } from '@/modules/season/types/season.types';
import { formatSeasonDate } from '@/modules/season/utils/season.mapper';
import { Card, Chip, Grid, Stack, Typography } from '@mui/material';

interface SeasonInfoCardProps {
  season: SeasonApiResponse;
}

const SeasonInfoCard = ({ season }: SeasonInfoCardProps) => {
  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: { xs: 2, sm: 2.5 },
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <Typography color="text.secondary" variant="overline">
            Temporada activa
          </Typography>

          <Chip
            color={season.isActive ? 'success' : 'default'}
            label={season.isActive ? 'Activa' : 'Inactiva'}
            size="small"
          />
        </Stack>

        <Typography sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 600 }}>
          {season.name}
        </Typography>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="body2">
                Inicio:
              </Typography>
              <Typography variant="body2">{formatSeasonDate(season.startDate)}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="body2">
                Fin:
              </Typography>
              <Typography variant="body2">
                {formatSeasonDate(season.endDate ?? undefined)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default SeasonInfoCard;
