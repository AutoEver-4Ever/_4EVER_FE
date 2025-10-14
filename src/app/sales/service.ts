import axios from 'axios';
import { SalesData, SalesStatCard } from '@/app/sales/types/SalesStatsType';

export const fetchSalesStats = async (): Promise<Record<string, SalesStatCard[]>> => {
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
