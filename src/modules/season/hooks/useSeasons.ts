import { useFetch } from '@/hooks/useFetch';

import { seasonService } from '../services/season.service';
import { SeasonApiResponse } from '../types/season.types';

export const useSeasons = () => {
  return useFetch<SeasonApiResponse[]>({
    queryKey: ['seasons'],
    service: seasonService.getAll,
    staleTime: 60 * 1000,
  });
};
