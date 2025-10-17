import { Period } from '@/app/(private)/purchase/constants';

export interface PeriodFilterProps {
  // periods: KeyValueItem<Period>[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}
