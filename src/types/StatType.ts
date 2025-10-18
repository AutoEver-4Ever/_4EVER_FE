export type Period = 'week' | 'month' | 'quarter' | 'year';

// 각 지표의 기본 구조
export interface Stat {
  value: number;
  delta_rate: number;
}

// 지표 api 응답 데이터 구조
export type StatResponse<T> = {
  [key in Period]: T;
};

export interface StatCardType {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}
