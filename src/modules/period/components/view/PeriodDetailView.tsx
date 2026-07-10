'use client'

// import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Link, Stack, Typography } from '@mui/material';
import { PlusIcon, TrashIcon } from '@phosphor-icons/react';

import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';

// import { useExpenseCategories, useIncomeTypes } from '../../hooks/useCatalogs';
import { usePeriod } from '../../hooks/usePeriod';
import PeriodSummaryCards from '../summary/PeriodSummaryCards';
import ExpensesTable from '../table/ExpensesTable';
import IncomesTable from '../table/IncomesTable';

interface PeriodDetailViewProps {
  id: string;
}

const PeriodDetailView = ({ id }: PeriodDetailViewProps) => {
  const router = useRouter();

  const { data: period, isLoading } = usePeriod(id);
  //   const { data: incomeTypes } = useIncomeTypes();
  //   const { data: expenseCategories } = useExpenseCategories();

  //   const incomeTypeOptions = useMemo(
  //     () =>
  //       (incomeTypes ?? []).map((item) => ({
  //         value: item.id,
  //         label: item.name,
  //       })),
  //     [incomeTypes],
  //   );

  //   const expenseCategoryOptions = useMemo(
  //     () =>
  //       (expenseCategories ?? []).map((item) => ({
  //         value: item.id,
  //         label: item.name,
  //       })),
  //     [expenseCategories],
  //   );

  if (!period) {
    return <Typography>No hay datos</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Link
          component="button"
          variant="body2"
          underline="none"
          onClick={() => router.push('/treasury/periods')}
          sx={{ alignSelf: 'flex-start' }}
        >
          ← Jornadas
        </Link>
        <SectionHeader
          title={period?.title ?? ''}
          subtitle={`${period?.displayName ?? ''}`}
          actions={
            <CustomButton
              variant="outlined"
              color="error"
              startIcon={<TrashIcon fontSize="var(--icon-fontSize-md)" />}
              onClick={() => {}}
            >
              Eliminar jornada
            </CustomButton>
          }
        />
      </Stack>
      {!isLoading && period ? <PeriodSummaryCards period={period} /> : null}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ContentCard
            title="Ingresos"
            actions={
              <CustomButton
                size="small"
                variant="contained"
                icon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}
                onClick={() => {}}
              >
                Agregar
              </CustomButton>
            }
            disableContentPadding
            showHeaderDivider
          >
            <IncomesTable rows={period.incomes ?? []} onEdit={() => {}} onDelete={() => {}} />
          </ContentCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ContentCard
            title="Gastos"
            actions={
              <CustomButton
                size="small"
                variant="contained"
                icon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}
                onClick={() => {}}
              >
                Agregar
              </CustomButton>
            }
            disableContentPadding
            showHeaderDivider
          >
            <ExpensesTable rows={period.expenses ?? []} onEdit={() => {}} onDelete={() => {}} />
          </ContentCard>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PeriodDetailView;
