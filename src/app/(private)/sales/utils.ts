import { InventoryCheckRes } from '@/app/(private)/sales/types/QuoteReviewModalType';

// 숫자 값을 억으로 변환(통화)
export const formatCurrency = (value: number) => {
  return `₩${(value / 100000000).toFixed(1)}억`;
};

// 재고가 모두 충족되는지 여부 확인
export const isAllInventoryFulfilled = (arr: InventoryCheckRes[]): boolean => {
  if (arr.length === 0) return true;
  return !arr.some((item) => item.productionRequired === true);
};
