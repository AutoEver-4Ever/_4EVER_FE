export interface PeriodFilterProps {
  periods: readonly string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}
