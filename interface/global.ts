export interface CustomResponse<T> {
  isSuccess: boolean;
  data: T;
  errors?: object
}
