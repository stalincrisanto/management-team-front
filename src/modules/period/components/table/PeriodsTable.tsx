'use client'

import { useMemo } from 'react';
import { formatMoney, formatSeasonDate } from '@/modules/season/utils/season.mapper';
import { IconButton, Stack, Typography } from '@mui/material';
import { EyeIcon, TrashIcon } from '@phosphor-icons/react';

import { DataTable } from '@/components/dataTable/DataTable';
import { DataTableColumn } from '@/components/dataTable/types/dataTable.types';

import { PeriodApiResponse } from '../../types/period.types';

interface PeriodsTableProps {
  rows: PeriodApiResponse[];
  loading?: boolean;
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onView: (row: PeriodApiResponse) => void;
  onDelete: (row: PeriodApiResponse) => void;
}

const PeriodsTable = ({
  rows,
  loading = false,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onDelete,
}: PeriodsTableProps) => {
  const columns = useMemo<DataTableColumn<PeriodApiResponse>[]>(
    () => [
      {
        key: 'date',
        header: 'Fecha',
        render: (row) => (
          <Typography variant="body2" fontWeight={600}>
            {formatSeasonDate(row.periodDate)}
          </Typography>
        ),
      },
      {
        key: 'title',
        header: 'Jornada',
        minWidth: 260,
        render: (row) => (
          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={600}>
              {row.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {row.title} · Canarias B vs {row.opponent}
            </Typography>
          </Stack>
        ),
      },
      {
        key: 'opponent',
        header: 'Rival',
        field: 'opponent',
      },
      {
        key: 'income',
        header: 'Ingresos',
        align: 'right',
        render: (row) => (
          <Typography variant="body2" color="success.main" fontWeight={600}>
            {formatMoney(row.totalIncome)}
          </Typography>
        ),
      },
      {
        key: 'expenses',
        header: 'Gastos',
        align: 'right',
        render: (row) => (
          <Typography variant="body2" color="error.main" fontWeight={600}>
            {formatMoney(row.totalExpenses)}
          </Typography>
        ),
      },
      {
        key: 'net',
        header: 'Neto',
        align: 'right',
        render: (row) => (
          <Typography
            variant="body2"
            color={row.net >= 0 ? 'success.main' : 'error.main'}
            fontWeight={600}
          >
            {row.net >= 0 ? '+' : ''}
            {formatMoney(row.net)}
          </Typography>
        ),
      },
      {
        key: 'accumulated',
        header: 'Saldo acumulado',
        align: 'right',
        render: (row) => (
          <Typography variant="body2" fontWeight={700}>
            {formatMoney(row.runningBalance)}
          </Typography>
        ),
      },
      {
        key: 'actions',
        header: 'Acciones',
        align: 'right',
        render: (row) => (
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton size="small" onClick={() => onView(row)}>
              <EyeIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>

            <IconButton size="small" color="error" onClick={() => onDelete(row)}>
              <TrashIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [onView, onDelete],
  );

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      minWidth={1200}
      loading={loading}
      emptyMessage="No existen jornadas registradas."
      pagination={{
        count: totalRows,
        page,
        rowsPerPage,
        onPageChange,
        onRowsPerPageChange,
        rowsPerPageOptions: [5, 10, 25],
      }}
    />
  );
};

export default PeriodsTable;
