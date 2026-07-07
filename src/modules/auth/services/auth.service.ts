import { apiClient } from '@/lib/apiClient';

import { LoginRequest, LoginResponse, UserMeResponse } from '../types/auth.type';

export const authService = {
  login: (payload: LoginRequest): Promise<LoginResponse> =>
    apiClient.post<LoginResponse, LoginRequest>('/auth/login', payload, { auth: false }),

  me: (): Promise<UserMeResponse> => apiClient.get<UserMeResponse>('/auth/me'),

  logout: (): Promise<void> => apiClient.post<void>('/auth/logout'),
};
