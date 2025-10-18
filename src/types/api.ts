// 공통 api response
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}
