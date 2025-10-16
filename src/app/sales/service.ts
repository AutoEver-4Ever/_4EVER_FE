import axios from 'axios';
import { SalesData, SalesStatCard } from '@/app/sales/types/SalesStatsType';
import { Quote, QuoteQueryParams } from '@/app/sales/types/SalesQuoteListType';
import { QuoteDetail } from '@/app/sales/types/QuoteDetailModalType';
import { CustomerDetail } from '@/app/sales/types/SalesCustomerDetailType';
import {
  SalesCustomer,
  CustomerQueryParams,
  PageType,
} from '@/app/sales/types/SalesCustomerListType';
import {
  CreateCustomerResponse,
  CustomerData,
  ServerResponse,
} from '@/app/sales/types/NewCustomerModalType';
import { AnalyticsQueryParams, SalesAnalysis } from '@/app/sales/types/SalesChartType';
import { Order, OrderQueryParams } from '@/app/sales/types/SalesOrderListType';
import { OrderDetail } from '@/app/sales/types/SalesOrderDetailType';

// 통계 지표
export const getSalesStats = async (): Promise<Record<string, SalesStatCard[]>> => {
  const res = await axios.get('https://api.everp.co.kr/api/business/sd/statistics');
  const datas: SalesData = res.data.data;

  const data = Object.entries(datas).reduce(
    (acc, [period, stats]) => {
      const cards: SalesStatCard[] = [
        {
          title: '매출',
          value: `₩${stats.sales_amount.value.toLocaleString()}`,
          change: `${stats.sales_amount.delta_rate > 0 ? '+' : ''}${(stats.sales_amount.delta_rate * 100).toFixed(1)}%`,
          changeType: stats.sales_amount.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-money-dollar-circle-line',
          color: 'blue',
        },
        {
          title: '신규 주문',
          value: `${stats.new_orders_count.value.toLocaleString()}건`,
          change: `${stats.new_orders_count.delta_rate > 0 ? '+' : ''}${(stats.new_orders_count.delta_rate * 100).toFixed(1)}%`,
          changeType: stats.new_orders_count.delta_rate >= 0 ? 'increase' : 'decrease',
          icon: 'ri-shopping-cart-line',
          color: 'green',
        },
      ];
      acc[period] = cards;
      return acc;
    },
    {} as Record<string, SalesStatCard[]>,
  );
  return data;
};

// ----------------------- 견적 관리 -----------------------
export const getQuoteList = async (
  params?: QuoteQueryParams,
): Promise<{ data: Quote[]; pageData: PageType }> => {
  const query = new URLSearchParams({
    ...(params?.startDate ? { startDate: params.startDate } : {}),
    ...(params?.endDate ? { endDate: params.endDate } : {}),
    ...(params?.status ? { status: params.status } : {}),
    ...(params?.search ? { search: params.search } : {}),
    ...(params?.sort ? { sort: params.sort } : {}),
    ...(params?.page ? { page: String(params.page) } : {}),
    ...(params?.size ? { size: String(params.size) } : {}),
  }).toString();
  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/quotations?${query}`);
  const data: Quote[] = res.data.data.items;
  const pageData: PageType = res.data.data.page;

  return { data, pageData };
};

export const getQuoteDetail = async (quotationId: number): Promise<QuoteDetail> => {
  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/quotations/${quotationId}`);
  const data: QuoteDetail = res.data.data;
  return data;
};

// ----------------------- 주문 관리 -----------------------
export const getOrderList = async (
  params?: OrderQueryParams,
): Promise<{ data: Order[]; pageData: PageType }> => {
  const query = new URLSearchParams({
    ...(params?.start ? { start: params.start } : {}),
    ...(params?.end ? { end: params.end } : {}),
    ...(params?.status ? { status: params.status } : {}),
    ...(params?.keyword ? { keyword: params.keyword } : {}),
    ...(params?.page ? { page: String(params.page) } : {}),
    ...(params?.size ? { size: String(params.size) } : {}),
  }).toString();

  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/orders?${query}`);
  const data: Order[] = res.data.data.content;
  const pageData: PageType = res.data.data.page;
  return { data, pageData };
};

export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/orders/1201`);
  const data: OrderDetail = res.data.data;
  return data;
};

// ----------------------- 고객 관리 -----------------------
export const getCustomerList = async (
  params?: CustomerQueryParams,
): Promise<{ data: SalesCustomer[]; pageData: PageType }> => {
  const query = new URLSearchParams({
    ...(params?.status ? { status: params.status } : {}),
    ...(params?.keyword ? { keyword: params.keyword } : {}),
    ...(params?.page ? { page: String(params.page) } : {}),
    ...(params?.size ? { size: String(params.size) } : {}),
  }).toString();

  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/customers?${query}`);
  const data: SalesCustomer[] = res.data.data.customers;
  const pageData: PageType = res.data.data.page;
  return { data, pageData };
};

export const getCustomerDetail = async (customerId: number): Promise<CustomerDetail> => {
  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/customers/${customerId}`);
  const data: CustomerDetail = res.data.data;
  return data;
};

export const postCustomer = async (customer: CustomerData): Promise<ServerResponse> => {
  const res = await axios.post('https://api.everp.co.kr/api/business/sd/customers', customer);
  return res.data;
};
// ----------------------- 매출 분석 -----------------------

export const getAnalytics = async (params?: AnalyticsQueryParams): Promise<SalesAnalysis> => {
  const query = new URLSearchParams({
    ...(params?.start ? { start: params.start } : {}),
    ...(params?.end ? { end: params.end } : {}),
  }).toString();

  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/analytics/sales?${query}`);
  return res.data.data;
};
