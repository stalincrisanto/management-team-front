import type { ApiFieldError } from '@/types/api';

type ApiErrorParams = {
  status: number;
  code: string;
  message: string;
  errors?: ApiFieldError[];
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly errors: ApiFieldError[];

  constructor({ status, code, message, errors = [] }: ApiErrorParams) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}
