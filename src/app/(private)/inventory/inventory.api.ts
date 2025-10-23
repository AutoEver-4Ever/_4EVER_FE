import { ApiResponse, INVENTORY_ENDPOINTS } from '@/app/api';
import { InventoryStatResponse } from './types/InventoryStatsType';
import axios from 'axios';

export const getInventoryStats = async (): Promise<InventoryStatResponse> => {
  const res = await axios.get<ApiResponse<InventoryStatResponse>>(INVENTORY_ENDPOINTS.STATS);
  return res.data.data;
};
