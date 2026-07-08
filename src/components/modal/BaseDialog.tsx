'use client';

import type { ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { DialogProps, SxProps, Theme } from '@mui/material';
import { XCircleIcon } from '@phosphor-icons/react';

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;
  showCloseButton?: boolean;
  disableClose?: boolean;
  contentSx?: SxProps<Theme>;
}

export const BaseDialog = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  disableClose = false,
  contentSx,
}: BaseDialogProps) => {
  const handleClose: DialogProps['onClose'] = (_, reason) => {
    if (disableClose && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {title || subtitle || showCloseButton ? (
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
            <Stack spacing={0.5}>
              {title ? <Typography variant="h6">{title}</Typography> : null}

              {subtitle ? (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>

            {showCloseButton ? (
              <IconButton edge="end" size="small" onClick={onClose} disabled={disableClose}>
                <XCircleIcon fontSize="small" />
              </IconButton>
            ) : null}
          </Stack>
        </DialogTitle>
      ) : null}

      <DialogContent sx={contentSx}>{children}</DialogContent>

      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
}
