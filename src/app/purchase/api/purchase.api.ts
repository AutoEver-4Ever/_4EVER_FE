import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { PURCHASE_ENDPOINTS } from '@/config/purchaseEndpoints';
import { ApiResponse } from '@/types/api';
import { PurchaseStatResponse } from '@/app/(private)/purchase/types/PurchaseStatsType';

export const fetchPurchaseStats = async (): Promise<PurchaseStatResponse> => {
  const res = await axios.get<ApiResponse<PurchaseStatResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.STATISTICS}`,
  );
  return res.data.data;
};
