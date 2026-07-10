'use client';

import { useRouter } from 'next/navigation';
import { Grid, Link, Stack, Typography } from '@mui/material';
import { PlusIcon, TrashIcon } from '@phosphor-icons/react';

import { useDialog } from '@/hooks/useModals';
import { ContentCard } from '@/components/ContentCard';
import { CustomButton } from '@/components/CustomButton';
import { SectionHeader } from '@/components/SectionHeader';

import { usePeriod } from '../../hooks/usePeriod';
import { ExpenseApiResponse } from '../../types/expense.types';
import { IncomeApiResponse } from '../../types/income.types';
import ExpenseModal from '../form/ExpenseModal';
import IncomeModal from '../form/IncomeModal';
import PeriodSummaryCards from '../summary/PeriodSummaryCards';
import ExpensesTable from '../table/ExpensesTable';
import IncomesTable from '../table/IncomesTable';

interface PeriodDetailViewProps {
  id: string;
}

const PeriodDetailView = ({ id }: PeriodDetailViewProps) => {
  const router = useRouter();

  const incomeDialog = useDialog<IncomeApiResponse>();
  const expenseDialog = useDialog<ExpenseApiResponse>();

  const { data: period, isLoading } = usePeriod(id);

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
        {/* Sección ingresos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ContentCard
            title="Ingresos"
            actions={
              <CustomButton
                size="small"
                variant="contained"
                icon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}
                onClick={() => {
                  incomeDialog.openDialog();
                }}
              >
                Agregar
              </CustomButton>
            }
            disableContentPadding
            showHeaderDivider
          >
            <IncomesTable
              rows={period.incomes ?? []}
              onEdit={(row) => {
                incomeDialog.openDialog(row);
              }}
              onDelete={() => {}}
            />
          </ContentCard>
        </Grid>
        {/* Sección gastos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ContentCard
            title="Gastos"
            actions={
              <CustomButton
                size="small"
                variant="contained"
                icon={<PlusIcon fontSize="var(--icon-fontSize-sm)" />}
                onClick={() => {
                  expenseDialog.openDialog();
                }}
              >
                Agregar
              </CustomButton>
            }
            disableContentPadding
            showHeaderDivider
          >
            <ExpensesTable
              rows={period.expenses ?? []}
              onEdit={(row) => {
                expenseDialog.openDialog(row);
              }}
              onDelete={() => {}}
            />
          </ContentCard>
        </Grid>
      </Grid>

      <IncomeModal
        open={incomeDialog.open}
        income={incomeDialog.data}
        onClose={incomeDialog.closeDialog}
        periodId={id}
      />
      <ExpenseModal
        open={expenseDialog.open}
        expense={expenseDialog.data}
        onClose={expenseDialog.closeDialog}
        periodId={id}
      />
    </Stack>
  );
};

export default PeriodDetailView;
