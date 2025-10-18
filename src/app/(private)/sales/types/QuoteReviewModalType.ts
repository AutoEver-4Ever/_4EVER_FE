export interface Quote {
  id: string;
  customer: string;
  contact: string;
  date: string;
  deliveryDate: string;
  amount: number;
  status: string;
}

export interface InventoryItem {
  product: string;
  currentStock: number;
  requiredStock: number;
  available: boolean;
}

export interface StockCheckResult {
  hasStock: boolean;
  items: InventoryItem[];
  checkDate: string;
  deliveryPossible: boolean;
}

export interface QuoteReviewModalProps {
  $onClose: () => void;
}
