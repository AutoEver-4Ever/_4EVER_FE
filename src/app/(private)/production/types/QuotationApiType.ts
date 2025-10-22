import { AvailableStockStatus } from '@/app/(private)/production/constants';
import { Page } from '@/app/types/Page';
import { QuotationStatus } from '@/app/(private)/production/constants';

export interface QuotationData {
  quotationId: string;
  quotationNumber: string;
  customerName: string;
  managerName: string;
  quotationDate: string;
  dueDate: string;
  totalAmount: number;
  statusCode: QuotationStatus;
}

// 견적 관리 리스트 최상위 응답 타입
export interface QuotationListResponse {
  items: QuotationData[];
  page: Page;
}

// 응답 요청시 request params
export interface FetchQuotationParams {
  availableStatus?: AvailableStockStatus;
  status?: QuotationStatus;
  page?: number;
  size?: number;
}
