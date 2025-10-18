import { CustomerStatus } from '@/app/(private)/sales/types/SalesCustomerListType';

export interface CustomerDetail {
  customerId: number;
  customerCode: string;
  companyName: string;
  businessNumber: string;
  ceoName: string;
  statusCode: CustomerStatus;
  contact: Contact;
  manager: Manager;
  transaction: Transaction;
  note: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Manager {
  name: string;
  mobile: string;
  email: string;
}

export interface Transaction {
  totalOrders: number;
  totalAmount: number;
}
