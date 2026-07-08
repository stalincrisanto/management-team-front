import { ReactNode } from 'react';
import type { SxProps, TableCellProps, TableProps, Theme } from '@mui/material';

export type DataTableRowId = string | number;

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  field?: keyof T;
  render?: (row: T, index: number) => ReactNode;
  align?: TableCellProps['align'];
  width?: number | string;
  minWidth?: number | string;
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
}

export interface DataTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => DataTableRowId;
  minWidth?: number | string;
  size?: TableProps['size'];
  hover?: boolean;
  pagination?: DataTablePaginationProps;
  loading?: boolean;
  emptyMessage?: string;
  tableProps?: TableProps;
}
