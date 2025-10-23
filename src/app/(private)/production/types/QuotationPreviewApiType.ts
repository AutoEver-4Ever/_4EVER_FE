export interface WeekData {
  week: string;
  demand: number;
  requiredQuantity: number;
  productionQuantity: number;
  mps: number;
}

// 제안 납기 계획 프리뷰 결과 최상위 응답 타입
export interface QuotationPreviewResponse {
  quotationNumber: string;
  customerCompanyName: string;
  productName: string;
  confirmedDueDate: string;
  weeks: WeekData[];
}
