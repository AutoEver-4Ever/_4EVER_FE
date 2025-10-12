// 구매 요청 작성란 입력
export interface PurchaseRequestItem {
  id: string;
  itemName: string; // 품목명
  quantity: string; // 수량
  unit: string; // 단위
  estimatedPrice: string; // 예상 총액
  supplier: string; // 희망 공급업체
  dueDate: string; // 희망 납기일
  purpose: string; // 사용 목적
  notes: string; // 비고
}
