import { Period } from '@/app/types/StatType';

export interface PeriodFilterProps {
  // periods: KeyValueItem<Period>[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}
