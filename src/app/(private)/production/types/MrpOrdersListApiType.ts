// MRP 순소요 목록 최상위 응답 타입
export interface MrpOrdersListResponse {
  itemId: string;
  itemName: string;
  requiredQuantity: number;
  currentStock: number;
  safetyStock: number;
  availableStock: number;
  availableStatusCode: string;
  shortageQty: number;
  itemType: string;
  procurementStartDate: string;
  expectedArrivalDate: string;
  supplierCompanyName: string;
}

export interface FetchMrpOrdersListParams {
  quotationId?: string;
  productId?: string;
}
