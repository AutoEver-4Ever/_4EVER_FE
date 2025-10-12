import { Tab } from '@/app/purchase/types/TabNavigationType';

// 구매 기간 필터링
export const PURCHASE_PERIODS = ['이번 주', '이번 달', '이번 분기', '올해'] as const;

// 탭 전환
export const PURCHASE_TABS: Tab[] = [
  {
    id: 'requests',
    name: '구매 요청',
    icon: 'ri-file-add-line',
  },
  {
    id: 'orders',
    name: '발주서',
    icon: 'ri-shopping-bag-3-line',
  },
  {
    id: 'suppliers',
    name: '공급업체 관리',
    icon: 'ri-building-line',
  },
] as const;

// 공급사
export const SUPPLIERS = [
  '대한철강',
  '알루텍',
  '스테인리스코리아',
  '용접재료상사',
  '패스너코리아',
  '케미칼솔루션',
  '구리산업',
] as const;

// 구매 요청 목록 테이블 헤더
export const PURCHASE_LIST_TABLE_HEADERS = [
  '요청번호',
  '요청자',
  '요청일',
  '총 금액',
  '상태',
  '작업',
] as const;

// 구매 요청 모달 입력 테이블 헤더
export const PURCHASE_REQUEST_TABLE_HEADERS = [
  '품목명',
  '수량',
  '단위',
  '예상 단가',
  '예상 총액',
  '희망 공급업체',
  '희망 납기일',
  '사용 목적',
  '비고',
  '작업',
] as const;

// 구매 상세 정보 모달 테이블 헤더
export const PURCHASE_ITEM_TABLE_HEADERS = ['품목명', '수량', '단위', '단가'] as const;
