export interface InventoryResponse {
  itemId: string;
  itemNumber: string;
  itemName: string;
  category: string;
  currentStock: number;
  safetyStock: number;
  uomName: string;
  unitPrice: number;
  totalAmount: number;
  warehouseName: string;
  warehouseType: string;
  statusCode: string;
}

export interface InventoryQueryParams {
  category?: string;
  warehouse?: string;
  status?: string;
  itemName?: string;
  page?: number;
  size?: number;
}
