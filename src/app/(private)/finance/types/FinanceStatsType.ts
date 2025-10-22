import { Period, Stat, StatResponse } from '@/types/StatType';

interface FinanceStat {
  totalPurchases: Stat;
  netProfit: Stat;
  accountsReceivable: Stat;
  totalSales: Stat;
}

export type FinanceStatResponse = StatResponse<FinanceStat>;
