export interface CustomResponse<T> {
  isSuccess: boolean;
  data?: T;
  errors?: string[];
}

export interface Ids {
  id: string
}
