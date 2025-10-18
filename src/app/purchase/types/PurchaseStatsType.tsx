import { Stat, StatResponse } from '@/types/StatType';

export interface PurchaseStat {
  purchase_request_count: Stat;
  purchase_approval_pending_count: Stat;
  purchase_order_amount: Stat;
  purchase_order_approval_pending_count: Stat;
}
// 전체 데이터 구조
export type PurchaseStatResponse = StatResponse<PurchaseStat>;
