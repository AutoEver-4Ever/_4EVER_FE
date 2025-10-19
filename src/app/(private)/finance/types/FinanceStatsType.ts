export interface FinanceStatsProps {
  $selectedPeriod: string;
}

interface PeriodData {}

export type Period = 'week' | 'month' | 'quarter' | 'year';

export interface FinanceStatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface FinanceStatData {
  week: PeriodData;
  month: PeriodData;
  quarter: PeriodData;
  year: PeriodData;
}
