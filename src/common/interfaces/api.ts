export interface IAppResponse<T> {
  status: number;
  message?: string;
  error?: string;
  data?: T;
}
