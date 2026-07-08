'use client';

import { useCallback, useState } from 'react';

export const useDialog = <TData = unknown,>() => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<TData | null>(null);

  const openDialog = useCallback((value?: TData) => {
    if (value !== undefined) {
      setData(value);
    }

    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setData(null);
  }, []);

  return {
    open,
    data,
    openDialog,
    closeDialog,
  };
};
