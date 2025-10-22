// types/MrpType.ts

export type AvailableStatus = 'SUFFICIENT' | 'SHORTAGE' | 'WARNING';
export type OrderStatus = 'PLANNED' | 'WAITING' | 'APPROVED' | 'REJECTED';

export interface NetRequirement {
  id: string;
  material: string;
  requiredQuantity: number;
  currentStock: number;
  safetyStock: number;
  availableStock: number;
  availableStatus: AvailableStatus;
  shortageQuantity: number;
  materialType: string;
  procurementStartDate: string;
  expectedArrivalDate: string;
  supplier: string;
}

export interface PlannedOrder {
  id: string;
  referenceQuote: string;
  material: string;
  quantity: number;
  procurementStartDate: string;
  deliveryDate: string;
  status: OrderStatus;
  supplier: string;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseRequestSummary {
  orderCount: number;
  totalAmount: number;
  requestDate: string;
}
