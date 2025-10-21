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

export interface InventoryCheckRes {
  itemId: number;
  itemName: string;
  requiredQty: number;
  inventoryQty: number;
  shortageQty: number;
  statusCode: string;
  productionRequired: boolean;
  inventoryCheckTime: string;
}

export interface QuoteReviewModalProps {
  $onClose: () => void;
  $selectedQuoteId: number;
}
