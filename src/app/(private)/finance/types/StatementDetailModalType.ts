export interface StatementDetailModalProps {
  $setShowDetailModal: (show: boolean) => void;
  $selectedStatementId: number;
  $setSelectedStatementId: (id: number) => void;
}

export interface StatementDetailRes {
  statementId: number;
  statementCode: string;
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
