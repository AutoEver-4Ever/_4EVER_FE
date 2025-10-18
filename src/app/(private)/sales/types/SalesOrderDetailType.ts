import { OrderStatus } from '@/app/(private)/sales/types/SalesOrderListType';

export interface SalesOrderDetailProps {
  $showOrderDetailModal: boolean;
  $setShowOrderDetailModal: (show: boolean) => void;
  $selectedOrderId: number;
}

export interface OrderDetail {
  order: {
    soId: number;
    soNumber: string;
    orderDate: string;
    deliveryDate: string;
    statusCode: OrderStatus;
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
