import { ApiResponse, INVENTORY_ENDPOINTS } from '@/app/api';
import { InventoryStatResponse } from './types/InventoryStatsType';
import axios from 'axios';
import { InventoryQueryParams, InventoryResponse } from './types/InventoryListType';
import { Page } from '@/types/Page';
import { InventoryDetailResponse } from './types/InventoryDetailType';

export const getInventoryStats = async (): Promise<InventoryStatResponse> => {
  const res = await axios.get<ApiResponse<InventoryStatResponse>>(INVENTORY_ENDPOINTS.STATS);
  return res.data.data;
};

export const getInventoryList = async (
  params?: InventoryQueryParams,
): Promise<{ data: InventoryResponse[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.category && { category: params.category }),
    ...(params?.warehouse && { warehouse: params.warehouse }),
    ...(params?.status && { status: params.status }),
    ...(params?.itemName && { itemName: params.itemName }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: InventoryResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.INVENTORY_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getInventoryDetail = async (inventoryId: string): Promise<InventoryDetailResponse> => {
  const res = await axios.get<ApiResponse<InventoryDetailResponse>>(
    INVENTORY_ENDPOINTS.INVENTORY_DETAIL(inventoryId),
  );
  return res.data.data;
};
