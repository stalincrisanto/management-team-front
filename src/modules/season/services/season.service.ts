import { apiClient } from '@/lib/apiClient';

import type {
  CreateSeasonRequest,
  SeasonApiResponse,
  UpdateSeasonRequest,
} from '../types/season.types';

// Helper puro — limpia el payload antes de enviarlo
const cleanEndDate = <T extends { endDate?: string | null }>(payload: T): T => ({
  ...payload,
  endDate: payload.endDate || null,
});

export const seasonService = {
  getAll: (): Promise<SeasonApiResponse[]> => apiClient.get('/seasons'),

  getActive: (): Promise<SeasonApiResponse> => apiClient.get('/seasons/active'),

  getById: (id: string): Promise<SeasonApiResponse> => apiClient.get(`/seasons/${id}`),

  create: (payload: CreateSeasonRequest): Promise<SeasonApiResponse> =>
    apiClient.post('/seasons', cleanEndDate(payload)),

  update: (id: string, payload: UpdateSeasonRequest): Promise<SeasonApiResponse> =>
    apiClient.put(`/seasons/${id}`, cleanEndDate(payload)),

  activate: (id: string): Promise<void> => apiClient.patch(`/seasons/${id}/activate`),
};
