import { Tab } from '@/types/NavigationType';
import QuotationTab from '@/app/(private)/production/components/QuotationTab';
import MpsTab from '@/app/(private)/production/components/MpsTab';
import MrpTab from '@/app/(private)/production/components/MrpTab';
import MesTab from '@/app/(private)/production/components/MesTab';
import BomTab from '@/app/(private)/production/components/BomTab';

// 생산 관리 탭 전환
export const Production_TABS: Tab[] = [
  {
    id: 'quotations',
    name: '견적 관리',
    icon: 'ri-file-text-line',
    component: QuotationTab,
  },
  {
    id: 'mps',
    name: 'MPS',
    icon: 'ri-calendar-schedule-line',
    component: MpsTab,
  },
  {
    id: 'mrp',
    name: 'MRP',
    icon: 'ri-settings-3-line',
    component: MrpTab,
  },
  {
    id: 'mes',
    name: 'MES',
    icon: 'ri-settings-3-line',
    component: MesTab,
  },
  {
    id: 'bom',
    name: 'BOM',
    icon: 'ri-file-list-3-line',
    component: BomTab,
  },
];
