import { ApiResponse, INVENTORY_ENDPOINTS } from '@/app/api';
import { InventoryStatResponse } from './types/InventoryStatsType';
import axios from 'axios';
import { InventoryQueryParams, InventoryResponse } from './types/InventoryListType';
import { Page } from '@/types/Page';
import { InventoryDetailResponse } from './types/InventoryDetailType';
import { LowStockItemResponse } from './types/LowStockItems';
import { StockMovementResponse } from './types/StockMovement';
import {
  ManageMentCommonQueryParams,
  ProductionListResponse,
  ReadyToShipListResponse,
} from './types/InventoryShippingListType';
import { ReceivedListResponse } from './types/InventoryReceivingListType';

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

export const getLowStockItems = async (): Promise<LowStockItemResponse[]> => {
  const res = await axios.get<ApiResponse<{ content: LowStockItemResponse[] }>>(
    INVENTORY_ENDPOINTS.LOW_STOCK,
  );
  return res.data.data.content;
};

export const getCurrentStockMovement = async (): Promise<StockMovementResponse[]> => {
  const res = await axios.get<ApiResponse<{ content: StockMovementResponse[] }>>(
    INVENTORY_ENDPOINTS.RECENT_STOCK_MOVEMENT,
  );

  return res.data.data.content;
};

export const getProductionList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ProductionListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ProductionListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.PRODUCTION_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getReadyToShipList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReadyToShipListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReadyToShipListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.READY_TO_SHIP_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getPendingList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReceivedListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReceivedListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.PENDING_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getReceivedList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReceivedListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
    ...(params?.startDate && { startDate: String(params.startDate) }),
    ...(params?.endDate && { endDate: String(params.endDate) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReceivedListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.RECEIVED_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};
