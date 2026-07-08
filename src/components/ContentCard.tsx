'use client';

import type { ReactNode } from 'react';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import type { CardProps, SxProps, Theme } from '@mui/material';

interface ContentCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  disableContentPadding?: boolean;
  showHeaderDivider?: boolean;
  contentSx?: SxProps<Theme>;
}

export function ContentCard({
  title,
  subtitle,
  actions,
  children,
  footer,
  disableContentPadding = false,
  showHeaderDivider = false,
  contentSx,
  ...cardProps
}: ContentCardProps) {
  const hasHeader = Boolean(title || subtitle || actions);

  return (
    <Card {...cardProps}>
      {hasHeader ? (
        <>
          <CardHeader title={title} subheader={subtitle} action={actions} />

          {showHeaderDivider ? <Divider /> : null}
        </>
      ) : null}

      <CardContent
        sx={{
          p: disableContentPadding ? 0 : undefined,
          '&:last-child': {
            pb: disableContentPadding ? 0 : undefined,
          },
          ...contentSx,
        }}
      >
        {children}
      </CardContent>

      {footer ? (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>{footer}</Box>
        </>
      ) : null}
    </Card>
  );
}
