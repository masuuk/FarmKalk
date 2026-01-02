
export interface FarmType {
  name: string;
  pct: number;
  costUnit: number;
  revUnit: number;
  unit: string;
  cycles: number;
  yield: number;
}

export interface CalculationResult {
  name: string;
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
