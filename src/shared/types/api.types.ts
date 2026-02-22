// Shared type definitions — add cross-feature types here
// e.g. ApiResponse, PaginatedResult, etc.

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
