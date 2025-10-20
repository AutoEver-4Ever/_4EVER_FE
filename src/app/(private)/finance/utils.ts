import { Period } from '@/types/StatType';

// 전표 상태에 따른 색상
export const getChitStatusColor = (status: string) => {
  switch (status) {
    case 'UNPAID':
      return 'bg-red-100 text-red-700';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'PAID':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 전표 상태에 따른 텍스트
export const getChitStatusText = (status: string) => {
  switch (status) {
    case 'UNPAID':
      return '미납';
    case 'PENDING':
      return '확인대기';
    case 'PAID':
      return '완납';
    default:
      return status;
  }
};

// 텝에 따른 전표 유형 텍스트
export const getInvoiceType = (tab: string) => {
  switch (tab) {
    case 'sales':
      return '매출 전표';
    case 'purchase':
      return '매입 전표';
  }
};

export const getPeriodText = (period: Period) => {
  switch (period) {
    case 'week':
      return '지난 주';
    case 'month':
      return '지난 달';
    case 'quarter':
      return '지난 분기';
    case 'year':
      return '작년';
  }
};
