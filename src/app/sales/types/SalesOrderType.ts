export interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  customerInfo: {
    name: string;
    contact: string;
    address: string;
    email: string;
  };
  deliveryDate: string;
  paymentTerms: string;
  notes: string;
}
