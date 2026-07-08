'use client';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';

import { DataTableBody } from './components/DataTableBody';
import { DataTableFooter } from './components/DataTableFooter';
import { DataTableHead } from './components/DataTableHeader';
import { DataTableProps } from './types/dataTable.types';

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  minWidth = 800,
  size = 'medium',
  hover = true,
  pagination,
  loading = false,
  emptyMessage = 'No hay registros para mostrar.',
  tableProps,
}: DataTableProps<T>) {
  const colSpan = columns.length;
  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size={size} sx={{ minWidth }} {...tableProps}>
          <DataTableHead columns={columns} />

          <DataTableBody
            columns={columns}
            rows={rows}
            getRowId={getRowId}
            colSpan={colSpan}
            hover={hover}
            loading={loading}
            emptyMessage={emptyMessage}
          />
        </Table>
      </Box>

      <DataTableFooter pagination={pagination} />
    </>
  );
}
