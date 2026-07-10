import { useFetch } from '@/hooks/useFetch';

import { periodService } from '../services/period.services';
import { PeriodApiResponse } from '../types/period.types';
import { periodKeys } from './period.keys';

export const usePeriod = (id?: string) => {
  return useFetch<PeriodApiResponse>({
    queryKey: id ? periodKeys.detail(id) : ['periods', 'empty-detail'],
    service: () => periodService.getById(id as string),
    enabled: Boolean(id),
    staleTime: 30 * 1000,
  });
};
