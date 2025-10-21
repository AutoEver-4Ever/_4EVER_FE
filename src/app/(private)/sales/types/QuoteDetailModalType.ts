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
  ceoName: string;
  items: Item[];
  totalAmount: number;
}

interface Item {
  itemId: number;
  itemName: string;
  quantity: number;
  uomName: string;
  unitPrice: number;
  amount: number;
}

export interface Inventories {
  itemId: number;
  itemName: string;
  requiredQty: number;
}
