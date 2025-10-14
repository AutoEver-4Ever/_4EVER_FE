import { Period } from '@/app/purchase/types/PurchaseStatsType';

export interface PeriodFilterProps {
  // periods: KeyValueItem<Period>[];
  selectedPeriod: string;
  onPeriodChange: (period: Period) => void;
}
