'use client';

import type { ReactNode } from 'react';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

type IconPosition = 'start' | 'end';

interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  loadingText?: string;
}

export const CustomButton = ({
  children,
  icon,
  iconPosition = 'start',
  isLoading = false,
  loadingText,
  disabled,
  startIcon,
  endIcon,
  ...props
}: CustomButtonProps) => {
  const loadingIcon = <CircularProgress size={18} color="inherit" />;

  const resolvedStartIcon = isLoading
    ? loadingIcon
    : iconPosition === 'start'
      ? (icon ?? startIcon)
      : startIcon;

  const resolvedEndIcon = !isLoading && iconPosition === 'end' ? (icon ?? endIcon) : endIcon;

  return (
    <Button
      disabled={disabled || isLoading}
      startIcon={resolvedStartIcon}
      endIcon={resolvedEndIcon}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
};
