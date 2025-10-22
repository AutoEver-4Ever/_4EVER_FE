import { StatCardType } from '@/types/StatType';
import { DashboardStatResponse } from './types/DashboardStatsType';
import { createStatCard } from '@/lib/CreateStatCard';

// total_sales: number;
//   total_purchases: number;
//   net_profit: number;
//   employee_count: number;

export const mapDashboardStatsToCards = (
  data: DashboardStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard('총 매출', stats.total_sales.value, stats.total_sales.delta_rate, '₩'),
        createStatCard(
          '총 매입',
          stats.total_purchases.value,
          stats.total_purchases.delta_rate,
          '₩',
        ),
        createStatCard('순이익', stats.net_profit.value, stats.net_profit.delta_rate, '₩'),
        createStatCard(
          '총 직원 수',
          stats.total_employee.value,
          stats.total_employee.delta_rate,
          '명',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
