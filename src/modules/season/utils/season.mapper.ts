import dayjs from 'dayjs';

import 'dayjs/locale/es';

import { SeasonFormValues } from '../schema/season.schema';
import { CreateSeasonRequest, SeasonApiResponse, UpdateSeasonRequest } from '../types/season.types';
import { SeasonRow } from '../types/season.ui.types';

dayjs.locale('es');

export const formatSeasonDate = (date: string | undefined): string => {
  if (!date) return 'Sin fecha';

  return dayjs(date).format('DD [de] MMMM [de] YYYY');
};

export const formatSeasonPeriod = (startDate: string, endDate?: string | null): string => {
  return `${formatSeasonDate(startDate)} — ${
    endDate ? formatSeasonDate(endDate) : 'Sin fecha de fin'
  }`;
};

export const formatSeasonStatus = (isActive: boolean): string => {
  return isActive ? 'Activo' : 'Inactivo';
};

export const mapSeasonToRow = (season: SeasonApiResponse): SeasonRow => ({
  id: season.id,
  name: season.name,
  period: formatSeasonPeriod(season.startDate, season.endDate),
  initialBalance: Number(season.initialBalance),
  totalIncome: Number(season.totalIncome ?? 0),
  totalExpenses: Number(season.totalExpenses ?? 0),
  currentBalance: Number(season.currentBalance ?? 0),
  totalPeriods: season.totalPeriods ?? 0,
  isActive: season.isActive ?? false,
  status: formatSeasonStatus(season.isActive ?? false),
});

export const toSeasonFormValues = (season?: SeasonApiResponse | null): SeasonFormValues => {
  if (!season) {
    return {
      name: '',
      startDate: '',
      endDate: '',
      initialBalance: 0,
      active: false,
    };
  }

  return {
    name: season.name,
    startDate: season.startDate,
    endDate: season.endDate ?? '',
    initialBalance: season.initialBalance as number,
    active: season.isActive as boolean,
  };
};

export const toSeasonPayload = (
  values: SeasonFormValues,
): CreateSeasonRequest | UpdateSeasonRequest => {
  return {
    name: values.name.trim(),
    startDate: values.startDate,
    endDate: values.endDate || null,
    initialBalance: values.initialBalance,
    // active: values.active,
  };
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatMoney = (value: number): string => {
  return currencyFormatter.format(Number(value));
};
