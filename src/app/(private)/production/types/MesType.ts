export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'on_hold';
export type ProcessStatus = 'pending' | 'in_progress' | 'completed';

export interface Process {
  code: string;
  name: string;
  status: ProcessStatus;
  startTime: string | null;
  endTime: string | null;
}

export interface ProductionOrder {
  id: string;
  productName: string;
  quantity: number;
  status: WorkOrderStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  currentProcess: string;
  quote: string;
  processes: Process[];
}
