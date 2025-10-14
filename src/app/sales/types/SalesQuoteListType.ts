export type QuoteStatus =
  | 'ALL'
  | 'APPROVED'
  | 'REVIEW'
  | 'PENDING'
  | 'REJECTED'
  | '전체'
  | '승인'
  | '검토'
  | '대기'
  | '반려';

export interface QuoteItem {
  product: string;
  specification: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  quotationId: number;
  quotationCode: string;
  customerName: string;
  ownerName: string;
  quotationDate: string;
  dueDate: string;
  totalAmount: number;
  statusLabel: QuoteStatus;
}

export interface QuoteFormItem {
  id: number;
  product: string;
  specification: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface QuoteFormData {
  customer: string;
  customerContact: string;
  customerEmail: string;
  quoteDate: string;
  validUntil: string;
  items: QuoteFormItem[];
  totalAmount: number;
  notes: string;
  paymentTerms: string;
  deliveryTerms: string;
  warranty: string;
}

export interface QuoteQueryParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  search?: string;
  sort?: string;
  page?: number;
  size?: number;
}
