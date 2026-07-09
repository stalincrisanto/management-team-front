import { useFetch } from '@/hooks/useFetch';

import { seasonService } from '../services/season.service';
import { SeasonApiResponse } from '../types/season.types';
import { seasonKeys } from './season.keys';

export const useSeasons = () => {
  return useFetch<SeasonApiResponse[]>({
    queryKey: seasonKeys.all,
    service: seasonService.getAll,
    staleTime: 60 * 1000,
  });
};
