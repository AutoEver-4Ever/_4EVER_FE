import axios from 'axios';
import { SALES_ENDPOINTS, ApiResponse, ApiResponseNoData } from '@/app/api';

import { SalesStatResponse } from '@/app/(private)/sales/types/SalesStatsType';
import { Quote, QuoteQueryParams } from '@/app/(private)/sales/types/SalesQuoteListType';
import { Inventories, QuoteDetail } from '@/app/(private)/sales/types/QuoteDetailModalType';
import { CustomerDetail } from '@/app/(private)/sales/types/SalesCustomerDetailType';
import {
  SalesCustomer,
  CustomerQueryParams,
} from '@/app/(private)/sales/types/SalesCustomerListType';
import { CustomerData, ServerResponse } from '@/app/(private)/sales/types/NewCustomerModalType';
import { AnalyticsQueryParams, SalesAnalysis } from '@/app/(private)/sales/types/SalesChartType';
import { Order, OrderQueryParams } from '@/app/(private)/sales/types/SalesOrderListType';
import { OrderDetail } from '@/app/(private)/sales/types/SalesOrderDetailType';
import { Page } from '@/types/Page';
import { InventoryCheckRes } from './types/QuoteReviewModalType';

// ----------------------- 통계 지표 -----------------------
export const getSalesStats = async (): Promise<SalesStatResponse> => {
  const res = await axios.get<ApiResponse<SalesStatResponse>>(SALES_ENDPOINTS.STATS);
  return res.data.data;

  // return Object.entries(datas).reduce(
  //   (acc, [period, stats]) => {
  //     const cards: SalesStatCard[] = [
  //       {
  //         title: '매출',
  //         value: `₩${stats.sales_amount.value.toLocaleString()}`,
  //         change: `${stats.sales_amount.delta_rate > 0 ? '+' : ''}${(
  //           stats.sales_amount.delta_rate * 100
  //         ).toFixed(1)}%`,
  //         changeType: stats.sales_amount.delta_rate >= 0 ? 'increase' : 'decrease',
  //         icon: 'ri-money-dollar-circle-line',
  //         color: 'blue',
  //       },
  //       {
  //         title: '신규 주문',
  //         value: `${stats.new_orders_count.value.toLocaleString()}건`,
  //         change: `${stats.new_orders_count.delta_rate > 0 ? '+' : ''}${(
  //           stats.new_orders_count.delta_rate * 100
  //         ).toFixed(1)}%`,
  //         changeType: stats.new_orders_count.delta_rate >= 0 ? 'increase' : 'decrease',
  //         icon: 'ri-shopping-cart-line',
  //         color: 'green',
  //       },
  //     ];
  //     acc[period] = cards;
  //     return acc;
  //   },
  //   {} as Record<string, SalesStatCard[]>,
  // );
};

// ----------------------- 견적 관리 -----------------------
export const getQuoteList = async (
  params?: QuoteQueryParams,
): Promise<{ data: Quote[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.startDate && { startDate: params.startDate }),
    ...(params?.endDate && { endDate: params.endDate }),
    ...(params?.status && { status: params.status }),
    ...(params?.search && { search: params.search }),
    ...(params?.sort && { sort: params.sort }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ items: Quote[]; page: Page }>>(
    `${SALES_ENDPOINTS.QUOTES_LIST}?${query}`,
  );

  return { data: res.data.data.items, pageData: res.data.data.page };
};

export const getQuoteDetail = async (quotationId: number): Promise<QuoteDetail> => {
  const res = await axios.get<ApiResponse<QuoteDetail>>(SALES_ENDPOINTS.QUOTE_DETAIL(quotationId));
  return res.data.data;
};

// ----------------------- 주문 관리 -----------------------
export const getOrderList = async (
  params?: OrderQueryParams,
): Promise<{ data: Order[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.start && { start: params.start }),
    ...(params?.end && { end: params.end }),
    ...(params?.status && { status: params.status }),
    ...(params?.keyword && { keyword: params.keyword }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: Order[]; page: Page }>>(
    `${SALES_ENDPOINTS.ORDERS_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const res = await axios.get<ApiResponse<OrderDetail>>(SALES_ENDPOINTS.ORDER_DETAIL(orderId));
  return res.data.data;
};

export const postQuotationConfirm = async (quotesId: number[]): Promise<ApiResponseNoData> => {
  const res = await axios.post<ApiResponseNoData>(SALES_ENDPOINTS.QUOTE_CONFIRM, {
    quotationIds: quotesId,
  });
  return res.data;
};

export const postInventoryCheck = async (items: Inventories[]): Promise<InventoryCheckRes[]> => {
  const res = await axios.post<ApiResponse<{ items: InventoryCheckRes[] }>>(
    SALES_ENDPOINTS.INVENTORY_CHECK,
    {
      items,
    },
  );
  return res.data.data.items;
};

export const postDeliveryProcess = async (quotesId: number): Promise<ApiResponseNoData> => {
  const res = await axios.post<ApiResponseNoData>(SALES_ENDPOINTS.QUOTE_DELIVERY_PROCESS(quotesId));
  return res.data;
};

// ----------------------- 고객 관리 -----------------------
export const getCustomerList = async (
  params?: CustomerQueryParams,
): Promise<{ data: SalesCustomer[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.status && { status: params.status }),
    ...(params?.keyword && { keyword: params.keyword }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ customers: SalesCustomer[]; page: Page }>>(
    `${SALES_ENDPOINTS.CUSTOMERS_LIST}?${query}`,
  );

  return { data: res.data.data.customers, pageData: res.data.data.page };
};

export const getCustomerDetail = async (customerId: number): Promise<CustomerDetail> => {
  const res = await axios.get<ApiResponse<CustomerDetail>>(
    SALES_ENDPOINTS.CUSTOMER_DETAIL(customerId),
  );
  return res.data.data;
};

export const postCustomer = async (customer: CustomerData): Promise<ServerResponse> => {
  const res = await axios.post<ApiResponse<ServerResponse>>(
    SALES_ENDPOINTS.CUSTOMERS_LIST,
    customer,
  );
  return res.data.data;
};

// ----------------------- 매출 분석 -----------------------
export const getAnalytics = async (params?: AnalyticsQueryParams): Promise<SalesAnalysis> => {
  const query = new URLSearchParams({
    ...(params?.start && { start: params.start }),
    ...(params?.end && { end: params.end }),
  }).toString();

  const res = await axios.get<ApiResponse<SalesAnalysis>>(`${SALES_ENDPOINTS.ANALYTICS}?${query}`);
  return res.data.data;
};
