import { Period } from '@/app/purchase/types/PurchaseStatsType';

export interface PeriodFilterProps {
  // periods: KeyValueItem<Period>[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}
