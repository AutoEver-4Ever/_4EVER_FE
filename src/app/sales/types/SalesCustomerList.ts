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
export interface CustomerDetails {
  businessNumber: string;
  ceo: string;
  establishedDate: string;
  employees: number;
  industry: string;
  website: string;
  fax: string;
  manager: Manager;
  paymentTerms: string;
  creditLimit: string;
  taxType: string;
  notes: string;
}

export interface Manager {
  name: string;
  position: string;
  department: string;
  mobile: string;
  directPhone: string;
}
