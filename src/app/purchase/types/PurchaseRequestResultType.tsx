interface PurchaseItem {
  name: string;
  quantity: string;
  unit: string;
  price: string;
}
export interface PurchaseRequestResult {
  id: string;
  requester: string;
  department: string;
  requestDate: string;
  dueDate: string;
  totalAmount: string;
  status: 'approved' | 'pending' | 'waiting' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  items: PurchaseItem[];
}
