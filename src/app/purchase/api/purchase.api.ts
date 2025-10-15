import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { PURCHASE_ENDPOINTS } from '@/config/purchaseEndpoints';
import { ApiResponse } from '@/types/api';
import { PurchaseData } from '@/app/purchase/types/PurchaseStatsType';
import { SupplierListResponse } from '../types/SupplierType';

export const fetchPurchaseStats = async (): Promise<PurchaseData> => {
  const res = await axios.get<ApiResponse<PurchaseData>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.STATISTICS}`,
  );
  // console.log(res);
  return res.data.data;
};

// API 함수 수정
interface FetchSupplierListParams {
  page?: number;
  size?: number;
  category?: string;
  status?: string;
  searchKeyword?: string;
}

export const fetchSupplierList = async (
  params: FetchSupplierListParams = {},
): Promise<SupplierListResponse> => {
  const { page = 0, size = 10, category, status, searchKeyword } = params;

  const res = await axios.get<ApiResponse<SupplierListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.VENDORS}`,
    {
      params: {
        page,
        size,
        ...(category && { category }),
        ...(status && { status }),
        ...(searchKeyword && { searchKeyword }),
      },
    },
  );
  console.log(res.data.data);
  return res.data.data;
};
