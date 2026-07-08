import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { DataTableColumn, DataTableRowId } from '../types/dataTable.types';
import { renderCellValue } from '../utils/dataTable.utils';

interface DataTableBodyProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => DataTableRowId;
  colSpan: number;
  hover: boolean;
  loading: boolean;
  emptyMessage: string;
}

export function DataTableBody<T>({
  columns,
  rows,
  getRowId,
  colSpan,
  hover,
  loading,
  emptyMessage,
}: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <Box
              sx={{
                py: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={24} />
            </Box>
          </TableCell>
        </TableRow>
      ) : null}

      {!loading && rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      ) : null}

      {!loading
        ? rows.map((row, index) => {
            const rowId = getRowId(row);

            return (
              <TableRow hover={hover} key={rowId}>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align} sx={column.sx}>
                    {renderCellValue(row, column, index)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        : null}
    </TableBody>
  );
}
