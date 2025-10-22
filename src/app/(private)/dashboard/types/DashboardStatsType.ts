import { Stat, StatResponse } from '@/types/StatType';

interface DashboardStat {
  total_sales: Stat;
  total_purchases: Stat;
  net_profit: Stat;
  total_employee: Stat;
}

export type DashboardStatRes = StatResponse<DashboardStat>;
