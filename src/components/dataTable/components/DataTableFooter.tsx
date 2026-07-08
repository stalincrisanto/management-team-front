import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';

import { DataTablePaginationProps } from '../types/dataTable.types';

interface DataTableFooterProps {
  pagination?: DataTablePaginationProps;
}

export function DataTableFooter({ pagination }: DataTableFooterProps) {
  if (!pagination) {
    return null;
  }

  return (
    <>
      <Divider />

      <TablePagination
        component="div"
        count={pagination.count}
        page={pagination.page}
        rowsPerPage={pagination.rowsPerPage}
        rowsPerPageOptions={pagination.rowsPerPageOptions ?? [5, 10, 25]}
        onPageChange={(_, page) => pagination.onPageChange(page)}
        onRowsPerPageChange={(event) => {
          pagination.onRowsPerPageChange?.(Number(event.target.value));
        }}
      />
    </>
  );
}
