'use client';

import React, { type ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
}

export const SectionHeader = ({ title, subtitle, actions, toolbar }: SectionHeaderProps) => {
  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'flex-start' }}
        justifyContent="space-between"
      >
        <Stack spacing={1} sx={{ minWidth: 0 }}>
          <Typography variant="h4">{title}</Typography>
          {subtitle ? (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Stack>

        {actions ? (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            sx={{ flexShrink: 0 }}
          >
            {actions}
          </Stack>
        ) : null}
      </Stack>

      {toolbar ? <Stack>{toolbar}</Stack> : null}
    </Stack>
  );
};
