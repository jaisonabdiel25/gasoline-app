export interface CustomResponse<T> {
  isSuccess: boolean;
  data: T;
  errors?: object
}

export interface Ids {
  id: string
}
