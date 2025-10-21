import { Period, Stat, StatResponse } from '@/app/types/StatType';

interface FinanceStat {
  total_purchases: Stat;
  net_profit: Stat;
  accounts_receivable: Stat;
  total_sales: Stat;
}

export type FinanceStatResponse = StatResponse<FinanceStat>;
