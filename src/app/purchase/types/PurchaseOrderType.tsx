interface SupplierInfo {
  name: string;
  contact: string;
  email: string;
  address: string;
}

interface OrderItem {
  item: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface OrderDetails {
  supplierInfo: SupplierInfo;
  orderItems: OrderItem[];
  notes: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  items: string;
  totalAmount: string;
  orderDate: string;
  deliveryDate: string;
  status: 'pending' | 'approved' | 'rejected';
  details: OrderDetails;
}
