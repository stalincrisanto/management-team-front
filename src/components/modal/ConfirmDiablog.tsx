'use client';

import type { ReactNode } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

import { BaseDialog } from './BaseDialog';

interface ConfirmDialogProps {
  open: boolean;
  title: ReactNode;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: ButtonProps['color'];
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'primary',
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      disableClose={loading}
      actions={
        <>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>

          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </BaseDialog>
  );
}
