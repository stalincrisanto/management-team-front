export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
  timestamp: string;
};

export type ApiErrorResponse = {
  success: false;
  code: string;
  message: string;
  timestamp: string;
};

export type ValidationErrorResponse = ApiErrorResponse & {
  errors: ApiFieldError[];
};

export type ApiFailureResponse = ApiErrorResponse | ValidationErrorResponse;

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
