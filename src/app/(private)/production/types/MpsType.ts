export type ProductType =
  | 'ALL'
  | 'DOOR_PANEL'
  | 'HOOD_PANEL'
  | 'FENDER_PANEL'
  | 'TRUNK_LID'
  | 'ROOF_PANEL';

export interface WeeklyProductionData {
  week: string;
  demand: number;
  inventory: number;
  production: number;
  mps: number;
  leadTime: number;
}

export interface ProductionSchedule {
  weeks: string[];
  data: WeeklyProductionData[];
}

export type ProductionDataMap = Record<Exclude<ProductType, 'ALL'>, ProductionSchedule>;

export interface DemandSource {
  quote: string;
  customer: string;
  quantity: number;
}
