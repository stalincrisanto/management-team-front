import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';

import type { DataTableColumn } from '../types/dataTable.types';

export const renderCellValue = <T>(
  row: T,
  column: DataTableColumn<T>,
  index: number,
): ReactNode => {
  if (column.render) {
    return column.render(row, index);
  }

  if (column.field) {
    const value = row[column.field];

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    return String(value);
  }

  return null;
};

export const toSxArray = (sx?: SxProps<Theme>) => {
  if (!sx) {
    return [];
  }

  return Array.isArray(sx) ? sx : [sx];
};
