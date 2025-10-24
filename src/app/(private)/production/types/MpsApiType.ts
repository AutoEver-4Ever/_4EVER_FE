// 주별 수요/생산 데이터
export interface WeekData {
  period: string; // 예: "9월 1주차"
  demand: number | null;
  requiredInventory: number | null;
  productionNeeded: number | null;
  plannedProduction: number | null;
}

// 제품별 생산/재고 시뮬레이션
export interface MpsListResponse {
  productId: string;
  productName: string;
  periodType: string | null;
  startDate: string | null;
  endDate: string | null;
  periods: string[]; // 주차 리스트
  demand: (number | null)[];
  requiredInventory: (number | null)[];
  productionNeeded: (number | null)[];
  plannedProduction: (number | null)[];
  totalPlannedProduction: number;
  totalDemand: number;
  productionWeeks: number;
  averageWeeklyProduction: number;
  // weeklyData?: WeekData[];
}

export interface MpsListParams {
  itemId?: string;
  startdate?: string;
  enddate?: string;
}
