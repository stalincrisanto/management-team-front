'use client';

import React from 'react';
import { Stack } from '@mui/material';
import { PlusIcon } from '@phosphor-icons/react';

import { useDialog } from '@/hooks/useModals';
import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';

import SeasonsTable from './components/table/SeasonsTable';
import { useSeasons } from './hooks/useSeasons';
import { SeasonRow } from './types/season.ui.types';
import { mapSeasonToRow } from './utils/season.mapper';

const SeasonsView = () => {
  const { data: seasons, isLoading } = useSeasons();
  const rows = seasons?.map(mapSeasonToRow);

  const activateDialog = useDialog<SeasonRow>();

  return (
    <Stack spacing={3}>
      <SectionHeader
        title="Temporadas"
        subtitle="Cada temporada agrupa un ciclo deportivo con su saldo inicial."
        actions={
          <>
            <CustomButton variant="contained" icon={<PlusIcon />}>
              Nueva temporada
            </CustomButton>
          </>
        }
      />
      <ContentCard disableContentPadding>
        <SeasonsTable
          rows={rows ?? []}
          loading={isLoading}
          onEdit={() => {}}
          onActivate={(row) => activateDialog.openDialog(row)}
        />
      </ContentCard>
    </Stack>
  );
};

export default SeasonsView;
