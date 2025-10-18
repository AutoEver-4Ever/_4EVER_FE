export interface DashboardHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: (p: string) => void;
  onOpenDownload: () => void;
}
