import { CustomerStatus } from '@/app/(private)/sales/types/SalesCustomerListType';
import { OrderStatus } from '@/app/(private)/sales/types/SalesOrderListType';
import { QuoteStatus } from '@/app/(private)/sales/types/SalesQuoteListType';
import { InventoryCheckRes } from '@/app/(private)/sales/types/QuoteReviewModalType';

// 고객 활성/비활성 상태에 따른 텍스트
export const getCustomerStatusText = (status: CustomerStatus) => {
  switch (status) {
    case 'ACTIVE':
      return '활성';
    case 'DEACTIVE':
      return '비활성';

    default:
      return status;
  }
};

// 고객 활성/비활성 상태에 따른 색상
export const getCustomerStatusColor = (status: string) => {
  return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
};

// 주문 상탸에 따른 색상
export const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'IN_PRODUCTION':
      return 'bg-blue-100 text-blue-700';
    case 'MATERIAL_PREPARATION':
      return 'bg-green-100 text-green-700';
    case 'READY_FOR_SHIPMENT':
      return 'bg-yellow-100 text-yellow-700';
    case 'DELIVERING':
      return 'bg-purple-100 text-purple-700';
    case 'DELIVERED':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 주문 상탸에 따른 텍스트
export const getOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case 'IN_PRODUCTION':
      return '생산중';
    case 'MATERIAL_PREPARATION':
      return '자재 준비중';
    case 'READY_FOR_SHIPMENT':
      return '출하 준비 완료';
    case 'DELIVERING':
      return '배송중';
    case 'DELIVERED':
      return '배송완료';

    default:
      return status;
  }
};

// 견적서 상탸에 따른 색상
export const getQuoteStatusColor = (status: QuoteStatus) => {
  switch (status) {
    case 'PENDING':
      return 'bg-gray-100 text-gray-800';
    case 'REVIEW':
      return 'bg-yellow-100 text-yellow-800';
    case 'APPROVED':
      return 'bg-green-100 text-green-800';
    case 'ALL':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// 견적서 상탸에 따른 텍스트
export const getQuoteStatusText = (status: QuoteStatus) => {
  switch (status) {
    case 'PENDING':
      return '대기';
    case 'REVIEW':
      return '검토';
    case 'APPROVED':
      return '승인';
    case 'REJECTED':
      return '반려';

    default:
      return status;
  }
};

// 숫자 값을 억으로 변환(통화)
export const formatCurrency = (value: number) => {
  return `₩${(value / 100000000).toFixed(1)}억`;
};

// 재고가 모두 충족되는지 여부 확인
export const isAllInventoryFulfilled = (arr: InventoryCheckRes[]): boolean => {
  if (arr.length === 0) return true;
  return !arr.some((item) => item.productionRequired === true);
};
