export type QuoteStatus =
  | 'approved'
  | 'pending'
  | 'draft'
  | 'rejected'
  | '검토'
  | '대기'
  | '반려';

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
  date: string;
  deliveryDate: string;
  amount: number;
  status: QuoteStatus;
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
