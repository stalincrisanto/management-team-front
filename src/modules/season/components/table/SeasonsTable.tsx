'use client';

import { useMemo } from 'react';

import { DataTable } from '@/components/dataTable/DataTable';

import { SeasonRow } from '../../types/season.ui.types';
import { buildSeasonsColumns } from './SeasonColumn';

export interface SeasonsTableProps {
  rows: SeasonRow[];
  loading?: boolean;
  onEdit: (row: SeasonRow) => void;
  onActivate: (row: SeasonRow) => void;
}

const SeasonsTable = ({ rows, loading = false, onEdit, onActivate }: SeasonsTableProps) => {
  const columns = useMemo(() => buildSeasonsColumns({ onEdit, onActivate }), [onEdit, onActivate]);

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      minWidth={1100}
      loading={loading}
      emptyMessage="No existen temporadas registradas."
    />
  );
};

export default SeasonsTable;
