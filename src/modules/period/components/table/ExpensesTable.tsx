import { useMemo } from 'react';
import { formatMoney } from '@/modules/season/utils/season.mapper';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

import { DataTable } from '@/components/dataTable/DataTable';
import { DataTableColumn } from '@/components/dataTable/types/dataTable.types';

import { ExpenseApiResponse } from '../../types/expense.types';

interface ExpenseTableProps {
  rows: ExpenseApiResponse[];
  onEdit: (row: ExpenseApiResponse) => void;
  onDelete: (row: ExpenseApiResponse) => void;
}

const ExpensesTable = ({ rows, onEdit, onDelete }: ExpenseTableProps) => {
  const columns = useMemo<DataTableColumn<ExpenseApiResponse>[]>(
    () => [
      {
        key: 'concept',
        header: 'Concepto',
        field: 'concept',
        sx: { fontWeight: 600 },
      },
      {
        key: 'category',
        header: 'Categoría',
        render: (row) => (
          <Chip size="small" variant="outlined" color="error" label={row.expenseCategory.name} />
        ),
      },
      {
        key: 'amount',
        header: 'Monto',
        align: 'right',
        render: (row) => (
          <Typography variant="body2" color="error.main" fontWeight={600}>
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
      emptyMessage="No existen gastos registrados."
    />
  );
};

export default ExpensesTable;
