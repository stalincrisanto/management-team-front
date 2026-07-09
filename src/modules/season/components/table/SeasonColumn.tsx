'use client';

import { Chip, Stack } from '@mui/material';
import { CircleIcon, PencilIcon } from '@phosphor-icons/react';

import { CustomButton } from '@/components/CustomButton';
import { DataTableColumn } from '@/components/dataTable/types/dataTable.types';

import { SeasonRow } from '../../types/season.ui.types';
import { formatSeasonStatus } from '../../utils/season.mapper';
import MoneyCell from './MoneyCell';
import { SeasonsTableProps } from './SeasonsTable';

export const buildSeasonsColumns = ({
  onEdit,
  onActivate,
}: Pick<SeasonsTableProps, 'onEdit' | 'onActivate'>): DataTableColumn<SeasonRow>[] => {
  return [
    { key: 'name', header: 'Temporada', field: 'name', minWidth: 180, sx: { fontWeight: 600 } },
    {
      key: 'period',
      header: 'Periodo',
      field: 'period',
      minWidth: 260,
    },
    {
      key: 'initialBalance',
      header: 'Saldo inicial',
      align: 'right',
      render: (row) => <MoneyCell value={row.initialBalance} />,
    },
    {
      key: 'totalIncome',
      header: 'Ingresos',
      align: 'right',
      render: (row) => <MoneyCell value={row.totalIncome} color="success" />,
    },
    {
      key: 'totalExpenses',
      header: 'Gastos',
      align: 'right',
      render: (row) => <MoneyCell value={row.totalExpenses} color="error" />,
    },
    {
      key: 'currentBalance',
      header: 'Saldo actual',
      align: 'right',
      render: (row) => <MoneyCell value={row.currentBalance} weight={700} />,
    },
    { key: 'totalPeriods', header: 'Jornadas', align: 'center', field: 'totalPeriods' },
    {
      key: 'status',
      header: 'Estado',
      align: 'center',
      render: (row) => (
        <Chip
          size="small"
          variant="outlined"
          color={row.isActive ? 'success' : 'default'}
          label={formatSeasonStatus(row.isActive)}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      minWidth: 180,
      render: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
          {!row.isActive ? (
            <CustomButton
              size="small"
              variant="outlined"
              startIcon={<CircleIcon fontSize="var(--icon-fontSize-sm)" />}
              onClick={() => onActivate(row)}
            >
              Activar
            </CustomButton>
          ) : null}
          <CustomButton size="small" variant="outlined" onClick={() => onEdit(row)}>
            <PencilIcon fontSize="var(--icon-fontSize-md)" />
          </CustomButton>
        </Stack>
      ),
    },
  ];
};
