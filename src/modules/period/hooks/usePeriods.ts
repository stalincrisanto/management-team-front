import { PageResponse } from '@/types/pageResponse';
import { useFetch } from '@/hooks/useFetch';

import { periodService } from '../services/period.services';
import { PeriodApiResponse } from '../types/period.types';
import { periodKeys } from './period.keys';

interface UsePeriodsParams {
  seasonId?: string;
  page: number;
  size: number;
}

export const usePeriods = ({ seasonId, page, size }: UsePeriodsParams) => {
  return useFetch<PageResponse<PeriodApiResponse>>({
    queryKey: seasonId ? periodKeys.list(seasonId, page, size) : ['periods', 'empty-list'],
    service: () =>
      periodService.getAll({
        seasonId: seasonId as string,
        page,
        size,
      }),
    enabled: Boolean(seasonId),
    staleTime: 60 * 1000,
  });
};
