// src/types/api-error.ts
import type { FieldError } from './api';

type ApiErrorParams = {
  status: number;
  code: string;
  message: string;
  errors?: FieldError[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly errors: FieldError[];

  constructor({ status, code, message, errors = [] }: ApiErrorParams) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }

  // Útil para mostrar errores de validación en formularios
  getFieldError(field: string): string | undefined {
    return this.errors.find((e) => e.field === field)?.message;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isValidationError(): boolean {
    return this.status === 400 && this.errors.length > 0;
  }
}