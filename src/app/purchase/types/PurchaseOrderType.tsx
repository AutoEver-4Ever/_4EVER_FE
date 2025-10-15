import { Page } from '@/types/Page';
import { PurchaseOrderStatus } from '@/app/purchase/constants';

interface SupplierInfo {
  name: string;
  contact: string;
  email: string;
  address: string;
}

interface OrderItem {
  item: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface OrderDetails {
  supplierInfo: SupplierInfo;
  orderItems: OrderItem[];
  notes: string;
}

// export interface PurchaseOrder {
//   details: OrderDetails;
// }

// 개별 발주(Purchase Order) 항목
export interface PurchaseOrder {
  id: number;
  poNumber: string; // 발주 번호
  supplierName: string; // 공급업체명
  itemsSummary: string; // 품목 요약
  orderDate: string; // 발주일 (YYYY-MM-DD)
  deliveryDate: string; // 납기일 (YYYY-MM-DD)
  totalAmount: number; // 총 금액
  status: PurchaseOrderStatus; // 상태
}

// 최종 응답 타입
export interface PurchaseOrderListResponse {
  content: PurchaseOrder[];
  page: Page;
}
