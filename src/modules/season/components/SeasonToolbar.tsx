'use client';

import React from 'react';
import { Card, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { FileSearchIcon } from '@phosphor-icons/react';

type SeasonStatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

interface SeasonsToolbarProps {
  search: string;
  status: SeasonStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: SeasonStatusFilter) => void;
}

export const SeasonsToolbar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: SeasonsToolbarProps) =>{
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
        <TextField
          fullWidth
          value={search}
          placeholder="Buscar temporada..."
          onChange={(event) => onSearchChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FileSearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as SeasonStatusFilter)}
          sx={{
            width: {
              xs: '100%',
              md: 240,
            },
          }}
        >
          <MenuItem value="ALL">Todas</MenuItem>
          <MenuItem value="ACTIVE">Activas</MenuItem>
          <MenuItem value="INACTIVE">Inactivas</MenuItem>
        </TextField>
      </Stack>
    </Card>
  );
}
