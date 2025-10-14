export interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}
