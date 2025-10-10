interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string; // 주문 ID
  orderNumber: string; // 주문번호 (같은 값으로 매핑 가능)
  orderDate: string; // 주문일
  deliveryDate: string; // 납기일
  amount: number; // 금액은 숫자로 (₩ 제거 후 number 저장 권장)
  status: 'confirmed' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  notes?: string;
  paymentTerms: string;
  customerInfo: {
    name: string;
    contact: string;
    phone: string;
    email?: string;
    address?: string;
  };

  items: (OrderItem & { total?: number })[];
}
