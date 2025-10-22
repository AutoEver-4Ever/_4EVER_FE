import axios from 'axios';
import { DashboardStatResponse } from './types/DashboardStatsType';
import { ApiResponse, DASHBOARD_ENDPOINTS } from '@/app/api';

// ----------------------- 통계 지표 -----------------------
export const getDashboardStats = async (): Promise<DashboardStatResponse> => {
  const res = await axios.get<ApiResponse<DashboardStatResponse>>(DASHBOARD_ENDPOINTS.STATS);
  console.log(res.data.data);
  return res.data.data;
};
