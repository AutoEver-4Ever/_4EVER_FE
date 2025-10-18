// 견적 관리 테이블 헤더
export const QUOTE_LIST_TABLE_HEADERS = [
  '선택',
  '견적번호',
  '고객명',
  '담당자',
  '견적일자',
  '납기일',
  '견적금액',
  '상태',
  '작업',
] as const;

// 주문 관리 테이블 헤더
export const ORDER_LIST_TABLE_HEADERS = [
  '주문번호',
  '고객정보',
  '주문일',
  '납기일',
  '주문금액',
  '상태',
  '작업',
] as const;

// 고객 관리 테이블 헤더
export const CUSTOMER_LIST_TABLE_HEADERS = [
  '고객정보',
  '연락처',
  '주소',
  '거래실적',
  '상태',
  '작업',
] as const;
