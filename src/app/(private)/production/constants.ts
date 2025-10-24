import { Tab } from '@/app/types/NavigationType';
import QuotationTab from '@/app/(private)/production/components/tabs/QuotationTab';
import MrpTab from '@/app/(private)/production/components/tabs/MrpTab';
import BomTab from '@/app/(private)/production/components/tabs/BomTab';
import { KeyValueItem } from '@/app/types/CommonType';
import MpsTab from '@/app/(private)/production/components/tabs/MpsTab';
import MesTab from '@/app/(private)/production/components/tabs/MesTab';
import RequirementsTab from './components/tabs/RequirementsTab';
import OrdersTab from './components/tabs/OrdersTab';

// 생산 관리 탭 전환
export const PRODUCTION_TABS: Tab[] = [
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

export const MRP_TABS: Tab[] = [
  {
    id: 'requirements',
    name: '순소요',
    icon: 'ri-file-list-3-line',
    component: RequirementsTab,
  },
  {
    id: 'orders',
    name: '계획 주문',
    icon: 'ri-shopping-cart-line',
    component: OrdersTab,
  },
];

// 가용 재고 상태 필터링
export type AvailableStockStatus = 'ALL' | 'SUFFICIENT' | 'INSUFFICIENT' | 'UNKNOWN';
export const AVAILABLE_STOCK_STATUS: KeyValueItem<AvailableStockStatus>[] = [
  { key: 'ALL', value: '전체 가용재고' },
  { key: 'SUFFICIENT', value: '충분' }, // 재고 충분
  { key: 'UNKNOWN', value: '미확인' }, // 재고 상태 확인되지 않음
  { key: 'INSUFFICIENT', value: '부족' }, // 재고 부족
];

// 견적 상태 필터링
export type QuotationStatus = 'ALL' | 'NEW' | 'CONFIRMED';
export const QUOTATIONS_STATUS: KeyValueItem<QuotationStatus>[] = [
  { key: 'ALL', value: '전체 상태' },
  { key: 'NEW', value: '신규' },
  { key: 'CONFIRMED', value: '확정' },
];

// 제품 목록
export const PRODUCTS: KeyValueItem[] = [
  { key: 'ALL', value: '전체 제품' },
  { key: 'DOOR_PANEL', value: '도어패널' },
  { key: 'HOOD_PANEL', value: 'Hood Panel' },
  { key: 'FENDER_PANEL', value: 'Fender Panel' },
  { key: 'TRUNK_LID', value: 'Trunk Lid' },
  { key: 'ROOF_PANEL', value: 'Roof Panel' },
];

// MES 견적 필터
export const MES_QUOTE_OPTIONS: KeyValueItem[] = [
  { key: 'ALL', value: '전체 견적' },
  { key: 'Q-2024-001', value: 'Q-2024-001' },
  { key: 'Q-2024-002', value: 'Q-2024-002' },
  { key: 'Q-2024-003', value: 'Q-2024-003' },
  { key: 'Q-2024-004', value: 'Q-2024-004' },
  { key: 'Q-2024-005', value: 'Q-2024-005' },
];

// MES 상태 필터
export type MesStatusCode = 'ALL' | 'WAITING' | 'IN_PROGRESS';
export const MES_STATUS_OPTIONS: KeyValueItem<MesStatusCode>[] = [
  { key: 'ALL', value: '전체 상태' },
  { key: 'WAITING', value: '대기' },
  { key: 'IN_PROGRESS', value: '진행중' },
];

export type ProductType =
  | 'ALL'
  | 'DOOR_PANEL'
  | 'HOOD_PANEL'
  | 'FENDER_PANEL'
  | 'TRUNK_LID'
  | 'ROOF_PANEL';
