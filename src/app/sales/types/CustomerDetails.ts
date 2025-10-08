import { Manager } from '@/app/sales/types/Manager';

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
