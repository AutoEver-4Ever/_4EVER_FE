export interface SalesCustomerDetailType {
  id: string;
  name: string;
  ceo: string;
  businessNumber: string;
  status: string;
  dealInfo: DealInfo;
  manager: Manager;
  contact: Contact;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Manager {
  name: string;
  email: string;
  mobile: string;
}

export interface DealInfo {
  totalOrders: string;
  totalAmount: string;
  notes: string;
}
