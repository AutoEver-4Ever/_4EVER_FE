export interface InvoiceDetailModalProps {
  $setShowDetailModal: (show: boolean) => void;
  $selectedInvoiceId: number;
  $setSelectedInvoiceId: (id: number) => void;
}

export interface InvoicetDetailRes {
  invoiceId: number;
  invoiceCode: string;
  connection: {
    connectionId: number;
    connectionCode: string;
    connectionName: string;
  };
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  reference: {
    referenceId: number;
    referenceCode: string;
  };
  note: string;
  items: {
    itemName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }[];
}
