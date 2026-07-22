import 'client-only';

import { getStoredToken } from '@/modules/auth/lib/authStorage';

import type { ApiFailureResponse, ApiResponse } from '@/types/api';
import { ApiError } from '@/types/apiError';

import { buildRequestHeaders } from './requestHeaders';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestOptions = Omit<RequestInit, 'body'> & {
  auth?: boolean;
  body?: unknown;
};

const getApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL no está configurada');
  }

  return API_BASE_URL.replace(/\/$/, '');
};

const buildUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${baseUrl}${normalizedEndpoint}`;
};

const isJsonResponse = (response: Response): boolean => {
  const contentType = response.headers.get('content-type');

  return Boolean(contentType?.includes('application/json'));
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  if (!isJsonResponse(response)) {
    return undefined;
  }

  return response.json();
};

const isApiFailureResponse = (body: unknown): body is ApiFailureResponse => {
  if (!body || typeof body !== 'object') {
    return false;
  }

  return 'success' in body && body.success === false;
};

const isApiSuccessResponse = <T>(body: unknown): body is ApiResponse<T> => {
  if (!body || typeof body !== 'object') {
    return false;
  }

  return 'success' in body && body.success === true && 'data' in body;
};

const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { auth = true, headers, body, ...requestOptions } = options;

  const token = auth ? getStoredToken() : null;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(buildUrl(endpoint), {
    ...requestOptions,
    credentials: 'omit',
    cache: requestOptions.cache ?? 'no-store',
    headers: buildRequestHeaders(headers, body, token),
    body: body !== undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const responseBody = await parseResponseBody(response);

  if (response.status === 401) {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    const loginUrl = currentPath.startsWith('/auth/sign-in')
      ? '/auth/sign-in'
      : `/auth/sign-in?redirectTo=${encodeURIComponent(currentPath)}`;

    window.location.replace(loginUrl);

    throw new ApiError({
      status: 401,
      code: 'UNAUTHORIZED',
      message: 'La sesión expiró o ya no es válida.',
    });
  }

  if (!response.ok) {
    if (isApiFailureResponse(responseBody)) {
      throw new ApiError({
        status: response.status,
        code: responseBody.code,
        message: responseBody.message,
        errors: 'errors' in responseBody ? responseBody.errors : [],
      });
    }

    throw new ApiError({
      status: response.status,
      code: 'HTTP_ERROR',
      message: `Error HTTP ${response.status}`,
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (isApiFailureResponse(responseBody)) {
    throw new ApiError({
      status: response.status,
      code: responseBody.code,
      message: responseBody.message,
      errors: 'errors' in responseBody ? responseBody.errors : [],
    });
  }

  if (isApiSuccessResponse<T>(responseBody)) {
    return responseBody.data;
  }

  return responseBody as T;
};

export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  },

  post<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<TResponse> {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'POST',
      body,
    });
  },

  put<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<TResponse> {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    });
  },

  patch<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<TResponse> {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    });
  },

  delete<TResponse = void>(endpoint: string, options?: RequestOptions): Promise<TResponse> {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },
};
