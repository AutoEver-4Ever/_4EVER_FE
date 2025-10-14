import axios from 'axios';
import { SalesData, SalesStatCard } from '@/app/sales/types/SalesStatsType';
import { Quote, QuoteQueryParams } from '@/app/sales/types/SalesQuoteListType';

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

export const getQuoteList = async (params?: QuoteQueryParams): Promise<Quote[]> => {
  const query = new URLSearchParams({
    ...(params?.startDate ? { startDate: params.startDate } : {}),
    ...(params?.endDate ? { endDate: params.endDate } : {}),
    ...(params?.status ? { status: params.status } : {}),
    ...(params?.search ? { search: params.search } : {}),
    ...(params?.sort ? { sort: params.sort } : {}),
    ...(params?.page ? { page: String(params.page) } : { page: '1' }),
    ...(params?.size ? { size: String(params.size) } : { size: '20' }),
  }).toString();

  const res = await axios.get(`https://api.everp.co.kr/api/business/sd/quotations?${query}`);
  const data: Quote[] = res.data.data.items;
  return data;
};
