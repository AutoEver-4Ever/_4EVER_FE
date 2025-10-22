// ----------------------- 통계 지표 -----------------------
export const getDashboardStats = async (): Promise<SalesStatResponse> => {
  const res = await axios.get<ApiResponse<SalesStatResponse>>(DASHBOARD_ENDPOINTS.STATS);
  return res.data.data;
};
