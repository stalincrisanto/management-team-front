import { useFetch } from '@/hooks/useFetch';

import { seasonService } from '../services/season.service';
import { SeasonApiResponse } from '../types/season.types';
import { seasonKeys } from './season.keys';

export const useSeasonActive = () => {
  return useFetch<SeasonApiResponse>({
    queryKey: seasonKeys.active,
    service: seasonService.getActive,
    staleTime: 60 * 1000,
  });
};
