export const SHIPPING_TABLE_HEADERS = [
  '주문 번호',
  '고객 정보',
  '주문일',
  '납기일',
  '주문 금액',
  '상태',
  '작업',
] as const;

export const RECEIVING_TABLE_HEADERS = [
  '발주서 번호',
  '공급업체',
  '주문일',
  '납기일',
  '주문 금액',
  '상태',
] as const;

export const INVENTORY_TABLE_HEADERS = [
  '품목',
  '카테고리',
  '현재재고',
  '안전재고',
  '단가',
  '총 가치',
  '창고 위치',
  '상태',
  '작업',
] as const;
