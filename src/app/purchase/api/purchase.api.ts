import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { PURCHASE_ENDPOINTS } from '@/config/purchaseEndpoints';
import { ApiResponse } from '@/types/api';
import { PurchaseStatsData } from '@/app/purchase/types/PurchaseStatsType';
import { PurchaseOrderListResponse } from '@/app/purchase/types/PurchaseOrderType';
import {
  PurchaseReqDetailResponse,
  PurchaseReqListResponse,
} from '@/app/purchase/types/PurchaseReqType';
import { SupplierDetailResponse, SupplierListResponse } from '@/app/purchase/types/SupplierType';

export const fetchPurchaseStats = async (): Promise<PurchaseStatsData> => {
  const res = await axios.get<ApiResponse<PurchaseStatsData>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.STATISTICS}`,
  );
  // console.log(res);
  return res.data.data;
};

interface PaginationParams {
  page?: number;
  size?: number;
}

interface FetchPurchaseReqParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
}

export const fetchPurchaseReqList = async (
  params: FetchPurchaseReqParams,
): Promise<PurchaseReqListResponse> => {
  const { page = 0, size = 10, status } = params;

  const res = await axios.get<ApiResponse<PurchaseReqListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_REQUISITIONS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

// API 함수 수정
interface FetchSupplierListParams extends PaginationParams {
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
  return res.data.data;
};

export const fetchPurchaseReqDetail = async (
  purchaseId: number,
): Promise<PurchaseReqDetailResponse> => {
  const res = await axios.get<ApiResponse<PurchaseReqDetailResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_REQUISITION_DETAIL(purchaseId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};

interface FetchPurchaseOrderParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
}
export const fetchPurchaseOrderList = async (
  params: FetchPurchaseOrderParams,
): Promise<PurchaseOrderListResponse> => {
  const { page = 0, size = 10, status } = params;

  const res = await axios.get<ApiResponse<PurchaseOrderListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_ORDERS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

export const fetchSupplierDetail = async (vendorId: number): Promise<SupplierDetailResponse> => {
  const res = await axios.get<ApiResponse<SupplierDetailResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.VENDOR_DETAIL(vendorId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};
