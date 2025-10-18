import { QuoteStatus } from '@/app/(private)/sales/types/SalesQuoteListType';

export interface QuoteDetailModalProps {
  $onClose: () => void;
  $selectedQuoteId: number;
}

export interface QuoteDetail {
  quotationId: number;
  quotationCode: string;
  quotationDate: string;
  dueDate: string;
  statusCode: QuoteStatus;
  statusLabel: QuoteStatus;
  customerName: string;
  ownerName: string;
  items: Item[];
  totalAmount: number;
}

interface Item {
  itemId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}
