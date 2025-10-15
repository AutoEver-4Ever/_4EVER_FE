// 각 지표의 기본 구조
interface PurchaseMetric {
  value: number;
  delta_rate: number;
}

// 하나의 기간(week, month, quarter, year) 단위 데이터 구조
interface PurchasePeriodData {
  purchase_request_count: PurchaseMetric;
  purchase_approval_pending_count: PurchaseMetric;
  purchase_order_amount: PurchaseMetric;
  purchase_order_approval_pending_count: PurchaseMetric;
}

// 전체 데이터 구조
export interface PurchaseData {
  week: PurchasePeriodData;
  month: PurchasePeriodData;
  quarter: PurchasePeriodData;
  year: PurchasePeriodData;
}
