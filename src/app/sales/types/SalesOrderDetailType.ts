export interface SalesOrderDetailProps {
  $showOrderDetailModal: boolean;
  $setShowOrderDetailModal: (show: boolean) => void;
  $selectedOrderId: number;
  $getStatusColor: (status: string) => string;
  $getStatusText: (status: string) => string;
}

export interface OrderDetail {
  order: {
    soId: number;
    soNumber: string;
    orderDate: string;
    deliveryDate: string;
    statusCode: string;
    totalAmount: number;
  };
  customer: {
    customerId: number;
    customerName: string;
    manager: {
      name: string;
      mobile: string;
      email: string;
    };
    address: string;
  };
  items: {
    productName: string;
    quantity: number;
    unit: string; // uomName
    unitPrice: number;
    amount: number;
  }[];
  note: string;
}
