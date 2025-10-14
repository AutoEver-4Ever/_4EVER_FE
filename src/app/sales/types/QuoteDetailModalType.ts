import { Quote, QuoteStatus } from '@/app/sales/types/SalesQuoteListType';

export interface QuoteDetailModalProps {
  $showQuoteModal: boolean;
  $setShowQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  $selectedQuote: Quote | null;
  $getStatusColor: (status: QuoteStatus) => string;
  $getStatusText: (status: QuoteStatus) => string;
}
