import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { DataTableColumn } from '../types/dataTable.types';
import { toSxArray } from '../utils/dataTable.utils';

interface DataTableHeadProps<T> {
  columns: DataTableColumn<T>[];
}

export function DataTableHead<T>({ columns }: DataTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            sx={[
              {
                width: column.width,
                minWidth: column.minWidth,
              },
              ...toSxArray(column.headerSx),
            ]}
          >
            {column.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
