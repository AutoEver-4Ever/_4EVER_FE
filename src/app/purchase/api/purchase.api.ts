import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { PURCHASE_ENDPOINTS } from '@/config/purchaseEndpoints';
import { ApiResponse } from '@/types/api';
import { PurchaseStatsData } from '@/app/purchase/types/PurchaseStatsType';
import {
  PurchaseOrderDetailResponse,
  PurchaseOrderListResponse,
} from '@/app/purchase/types/PurchaseOrderType';
import {
  PurchaseReqDetailResponse,
  PurchaseReqListResponse,
} from '@/app/purchase/types/PurchaseReqType';
import { SupplierDetailResponse, SupplierListResponse } from '@/app/purchase/types/SupplierType';

interface PaginationParams {
  page?: number;
  size?: number;
}

interface FetchPurchaseReqParams extends PaginationParams {
  status?: string;
  searchKeyword?: string;
  createdFrom?: string;
  createdTo?: string;
}

// 구매 요청 등록
export interface CreatePurchaseRequest {
  requesterId: number;
  items: {
    itemName: string;
    quantity: number;
    uomName: string;
    expectedUnitPrice: number;
    expectedTotalPrice: number;
    preferredVendorName: string;
    desiredDeliveryDate: string;
    purpose: string;
    note?: string;
  }[];
}

interface FetchSupplierListParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
}

interface FetchPurchaseOrderParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
  orderDateFrom?: string;
  orderDateTo?: string;
}

// 구매 관리 지표
export const fetchPurchaseStats = async (): Promise<PurchaseStatsData> => {
  const res = await axios.get<ApiResponse<PurchaseStatsData>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.STATISTICS}`,
  );
  // console.log(res);
  return res.data.data;
};

// 구매 요청 목록
export const fetchPurchaseReqList = async (
  params: FetchPurchaseReqParams,
): Promise<PurchaseReqListResponse> => {
  const { page = 0, size = 10, status, createdFrom, createdTo } = params;

  const res = await axios.get<ApiResponse<PurchaseReqListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_REQUISITIONS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
        ...(createdFrom && { createdFrom }),
        ...(createdTo && { createdTo }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

// 구매 요청 승인
export const postApporvePurchaseReq = async (poId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_ORDER_APPROVE(poId)}`,
  );
  return res.data;
};

// 구매 요청 반려
export const postRejectPurchaseReq = async (poId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_ORDER_REJECT(poId)}`,
  );
  return res.data;
};

// 구매 요청 상세정보
export const fetchPurchaseReqDetail = async (
  purchaseId: number,
): Promise<PurchaseReqDetailResponse> => {
  const res = await axios.get<ApiResponse<PurchaseReqDetailResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_REQUISITION_DETAIL(purchaseId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};

// 구매 요청 등록
export const createPurchaseRequest = async (
  data: CreatePurchaseRequest,
): Promise<ApiResponse<null>> => {
  const res = await axios.post<ApiResponse<null>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_REQUISITIONS}`,
    data,
  );
  return res.data;
};

// 발주서 목록
export const fetchPurchaseOrderList = async (
  params: FetchPurchaseOrderParams,
): Promise<PurchaseOrderListResponse> => {
  const { page = 0, size = 10, status, orderDateFrom, orderDateTo } = params;

  const res = await axios.get<ApiResponse<PurchaseOrderListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_ORDERS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
        ...(orderDateFrom && { orderDateFrom }),
        ...(orderDateTo && { orderDateTo }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

// 발주서 상세정보
export const fetchPurchaseOrderDetail = async (
  purchaseId: number,
): Promise<PurchaseOrderDetailResponse> => {
  const res = await axios.get<ApiResponse<PurchaseOrderDetailResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.PURCHASE_ORDER_DETAIL(purchaseId)}`,
  );

  console.log(res.data.data);
  return res.data.data;
};

// 공급업체 목록
export const fetchSupplierList = async (
  params: FetchSupplierListParams = {},
): Promise<SupplierListResponse> => {
  const { page = 0, size = 10, category, status, searchKeyword } = params;

  const res = await axios.get<ApiResponse<SupplierListResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.SUPPLIER}`,
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

// 공급업체 상세정보
export const fetchSupplierDetail = async (supplierId: number): Promise<SupplierDetailResponse> => {
  const res = await axios.get<ApiResponse<SupplierDetailResponse>>(
    `${API_BASE_URL}${PURCHASE_ENDPOINTS.SUPPLIER_DETAIL(supplierId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};
