// 시뮬레이션 정보
export interface SimulationData {
  status: string;
  availableQty: number;
  suggestedDueDate: string;
  generatedAt: string;
}

// 부족 재고 데이터
export interface ShortageStock {
  itemIm: string;
  itemName: string;
  requiredQuantity: number;
  currentStock: number;
  shortQuantity: number;
}

// 견적 시뮬레이션 결과 최상위 응답 타입
export interface QuotationSimulationResponse {
  quotationId: string;
  quotationCode: string;
  customerCompanyId: string;
  customerCompanyName: string;
  productId: string;
  productName: string;
  requestQuantity: number;
  requestDueDate: number;
  simulation: SimulationData;
  shortages: ShortageStock[];
}
