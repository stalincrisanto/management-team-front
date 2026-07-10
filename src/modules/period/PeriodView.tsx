'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { PlusIcon } from '@phosphor-icons/react';

import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';

import { useSeasonActive } from '../season/hooks/useSeasonActive';
import PeriodsTable from './components/table/PeriodsTable';
import { usePeriods } from './hooks/usePeriods';

const PeriodView = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: activeSeason } = useSeasonActive();

  const { data: periodsPage, isLoading } = usePeriods({
    seasonId: activeSeason?.id,
    page,
    size: rowsPerPage,
  });

  return (
    <>
      <Stack spacing={3}>
        <SectionHeader
          title="Jornadas"
          subtitle="Cada jornada agrupa los movimientos financieros de un partido."
          actions={
            <CustomButton
              variant="contained"
              icon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              onClick={() => router.push('/treasury/periods/new')}
            >
              Nueva jornada
            </CustomButton>
          }
        />

        <ContentCard disableContentPadding>
          <PeriodsTable
            rows={periodsPage?.content ?? []}
            loading={isLoading}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={periodsPage?.totalElements ?? 0}
            onPageChange={setPage}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(0);
            }}
            onView={(row) => router.push(`/treasury/periods/${row.id}`)}
            onDelete={() => {}}
          />
        </ContentCard>
      </Stack>

    </>
  );
};

export default PeriodView;
