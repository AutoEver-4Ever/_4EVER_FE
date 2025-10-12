interface PurchaseItem {
  name: string;
  quantity: string;
  unit: string;
  price: string;
}

interface PurchaseRequest {
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

export interface PurchaseRequestDetailModalProps {
  isOpen: boolean;
  request: PurchaseRequest | null;
  onClose: () => void;
}
