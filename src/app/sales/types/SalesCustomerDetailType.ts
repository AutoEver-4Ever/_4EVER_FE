export interface CustomerDetail {
  customerId: number;
  customerCode: string;
  companyName: string;
  businessNumber: string;
  ceo: string;
  establishmentDate: string;
  industry: string;
  creditRating: string;
  employeeCount: number;
  website: string;
  status: string;
  contact: Contact;
  manager: Manager;
  transaction: Transaction;
  note: string;
}

export interface Contact {
  phone: string;
  fax: string;
  email: string;
  address: string;
}

export interface Manager {
  name: string;
  position: string;
  department: string;
  mobile: string;
  directPhone: string;
}

export interface Transaction {
  totalOrders: number;
  totalAmount: number;
  lastOrderDate: string;
  paymentTerm: string;
  creditLimit: number;
  taxType: string;
}
