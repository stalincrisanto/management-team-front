'use client';

import { useMemo } from 'react';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

import { DataTable } from '@/components/dataTable/DataTable';
import { DataTableColumn } from '@/components/dataTable/types/dataTable.types';

import { IncomeApiResponse } from '../../types/income.types';

interface IncomeTableProps {
  rows: IncomeApiResponse[];
  onEdit: (row: IncomeApiResponse) => void;
  onDelete: (row: IncomeApiResponse) => void;
}

const IncomesTable = ({ rows, onEdit, onDelete }: IncomeTableProps) => {
  const columns = useMemo<DataTableColumn<IncomeApiResponse>[]>(
    () => [
      {
        key: 'sourceName',
        header: 'Aportante',
        render: (row) => (
          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={600}>
              {row.sourceName}
            </Typography>
          </Stack>
        ),
      },
      {
        key: 'type',
        header: 'Tipo',
        render: (row) => (
          <Chip size="small" variant="outlined" color="success" label={row.incomeType.name} />
        ),
      },
      {
        key: 'amount',
        header: 'Monto',
        align: 'right',
        render: (row) => (
          <Typography variant="body2" color="success.main" fontWeight={600}>
            {formatMoney(row.amount)}
          </Typography>
        ),
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton size="small" onClick={() => onEdit(row)}>
              <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>

            <IconButton size="small" color="error" onClick={() => onDelete(row)}>
              <TrashIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      minWidth={700}
      emptyMessage="No existen ingresos registrados."
    />
  );
};

export default IncomesTable;
