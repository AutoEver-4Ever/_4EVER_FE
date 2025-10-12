import { PurchaseRequestResult } from '@/app/purchase/types/PurchaseRequestResultType';

export interface PurchaseRequestDetailModalProps {
  isOpen: boolean;
  request: PurchaseRequestResult | null;
  onClose: () => void;
}
