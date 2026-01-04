export interface FarmType {
  name: string;
  emoji: string;
  pct: number;
  materialCostUnit: number;
  labourCostUnit: number;
  overheadCostUnit: number;
  revUnit: number;
  unit: string;
  cycles: number;
  yield: number;
}

export interface CalculationResult {
  name: string;
  emoji: string;
  area: number;
  quantity: number;
  cost: number;
  revenue: number;
  profit: number;
  unit: string;
}

export interface Totals {
  cost: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  area: number;
}

export type Currency = 'ZAR' | 'USD';