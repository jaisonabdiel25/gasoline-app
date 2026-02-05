export interface CustomResponse<T> {
  isSuccess: boolean;
  data?: T;
  errors?: unknown
}

export interface Ids {
  id: string
}
