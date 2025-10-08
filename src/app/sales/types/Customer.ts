import { CustomerDetails } from '@/app/sales/types/CustomerDetails';

export interface Customer {
  id: string;
  name: string;
  type: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalAmount: string;
  lastOrder: string;
  status: string;
  details: CustomerDetails;
}
