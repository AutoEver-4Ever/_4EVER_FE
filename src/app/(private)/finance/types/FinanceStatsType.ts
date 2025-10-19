export interface FinanceStatsProps {
  $selectedPeriod: string;
}

export interface FinanceStats {
  totalSales: number;
  totalSalesChange: number;
  totalPurchases: number;
  totalPurchasesChange: number;
  netProfit: number;
  netProfitChange: number;
  accountsReceivable: number;
  accountsReceivableChange: number;
}
