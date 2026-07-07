export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
  timestamp: string;
};

export type ApiFailureResponse = {
  success: false;
  code: string;
  message: string;
  timestamp: string;
  errors?: FieldError[];
};

export type FieldError = {
  field: string;
  message: string;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
};