interface Metric {
  value: number;
  delta_rate: number;
}

interface PeriodData {
  sales_amount: Metric;
  new_orders_count: Metric;
}

export type Period = 'week' | 'month' | 'quarter' | 'year';

export interface SalesData {
  week: PeriodData;
  month: PeriodData;
  quarter: PeriodData;
  year: PeriodData;
}

export interface SalesStatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}
