export type CustomerStatus = 'ALL' | 'ACTIVE' | 'DEACTIVE';
export interface SalesCustomer {
  customerId: number;
  customerCode: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  transactionAmount: number;
  orderCount: number;
  lastOrderDate: string;
  status: string;
}

export interface CustomerQueryParams {
  status?: string;
  keyword?: string;
  page?: number;
  size?: number;
}
