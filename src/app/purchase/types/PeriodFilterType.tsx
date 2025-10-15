import { Period } from '@/app/purchase/constants';

export interface PeriodFilterProps {
  // periods: KeyValueItem<Period>[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}
