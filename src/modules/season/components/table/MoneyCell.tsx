'use client';

import { Typography } from '@mui/material';

import { formatMoney } from '../../utils/season.mapper';

type MoneyCellColor = 'default' | 'success' | 'error';

interface MoneyCellProps {
  value: number;
  color?: MoneyCellColor;
  weight?: number;
}

const MONEY_CELL_COLOR: Record<MoneyCellColor, string | undefined> = {
  default: undefined,
  success: 'success.main',
  error: 'error.main',
};

const MoneyCell = ({ value, color = 'default', weight = 600 }: MoneyCellProps) => {
  return (
    <Typography variant="body2" color={MONEY_CELL_COLOR[color]} fontWeight={weight}>
      {formatMoney(value)}
    </Typography>
  );
};

export default MoneyCell;
