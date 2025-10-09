export type QuoteStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | '승인됨'
  | '검토중'
  | '임시저장'
  | '거절됨';

export type QuotePriority = '긴급' | '높음' | '보통' | '낮음';

export interface QuoteItem {
  product: string;
  specification: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  customer: string;
  contact: string;
  email: string;
  quoteDate: string;
  validUntil: string;
  amount: number;
  status: QuoteStatus;
  priority: QuotePriority;
  items: QuoteItem[];
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
  priority: QuotePriority;
  items: QuoteFormItem[];
  totalAmount: number;
  notes: string;
  paymentTerms: string;
  deliveryTerms: string;
  warranty: string;
}
