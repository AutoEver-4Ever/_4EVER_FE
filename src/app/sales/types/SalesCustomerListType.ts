export interface SalesCustomerListType {
  id: string;
  name: string;
  manager: {
    name: string;
    email: string;
    mobile: string;
  };
  address: string;
  dealInfo: {
    totalOrders: number;
    totalAmount: string;
  };
  status: string;
}
