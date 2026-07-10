import { PageResponse } from '@/types/pageResponse';
import { apiClient } from '@/lib/apiClient';

import { CreatePeriodRequest, PeriodApiResponse, UpdatePeriodRequest } from '../types/period.types';

interface GetPeriodsParams {
  seasonId: string;
  page: number;
  size: number;
}

export const periodService = {
  getAll: ({ seasonId, page, size }: GetPeriodsParams): Promise<PageResponse<PeriodApiResponse>> =>
    apiClient.get(`/periods?seasonId=${seasonId}&page=${page}&size=${size}`),

  getById: (id: string): Promise<PeriodApiResponse> => apiClient.get(`/periods/${id}`),

  create: (payload: CreatePeriodRequest): Promise<PeriodApiResponse> =>
    apiClient.post('/periods', payload),

  update: (id: string, payload: UpdatePeriodRequest): Promise<PeriodApiResponse> =>
    apiClient.put(`/periods/${id}`, payload),
};
