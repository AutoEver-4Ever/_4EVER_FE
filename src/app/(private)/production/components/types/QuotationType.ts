// types/QuotationType.ts

export interface Quote {
  id: string;
  customer: string;
  product: string;
  requestQuantity: number;
  requestDelivery: string;
  stockStatus: 'PASS' | 'FAIL' | 'NOT_CHECKED';
  proposedDelivery: string;
  status: 'NEW' | 'COMMITTED' | 'REJECTED';
}

export interface MaterialShortage {
  name: string;
  required: number;
  available: number;
  shortage: number;
}

export interface SimulationQuoteResult {
  quoteId: string;
  customer: string;
  product: string;
  quantity: number;
  requestDelivery: string;
  proposedDelivery: string;
  materials: MaterialShortage[];
}

export interface SimulationResult {
  selectedQuotes: string[];
  mpsResult: SimulationQuoteResult[];
}

export interface MpsWeeklyData {
  demand: number;
  requiredStock: number;
  productionRequirement: number;
  plannedProduction: number;
}

export interface MpsTableData {
  product: string;
  customer: string;
  quantity: number;
  weeks: {
    week1: MpsWeeklyData;
    week2: MpsWeeklyData;
    week3: MpsWeeklyData;
    week4: MpsWeeklyData;
  };
}
