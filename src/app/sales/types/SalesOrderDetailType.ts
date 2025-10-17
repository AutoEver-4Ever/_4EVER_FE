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
    customerCode: string;
    customerBaseAddress: string;
    customerDetailAddress: string;
    manager: {
      managerName: string;
      managerPhone: string;
      managerEmail: string;
    };
  };
  items: {
    productName: string;
    quantity: number;
    uonName: string;
    unitPrice: number;
    amount: number;
  }[];
  note: string;
}
