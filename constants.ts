
import { FarmType } from './types';

export const FARM_TYPES: FarmType[] = [
    { name: "Broilers", pct: 0.8,  costUnit: 120, revUnit: 126, unit: "birds", cycles: 5, yield: 20 },
    { name: "Rabbit",   pct: 0.4,  costUnit: 80,  revUnit: 120, unit: "kits",  cycles: 7, yield: 2 },
    { name: "Mushroom", pct: 0.4,  costUnit: 30,  revUnit: 60,  unit: "kg",    cycles: 6, yield: 0.5 },
    { name: "Tilapia",  pct: 0.4,  costUnit: 25,  revUnit: 40,  unit: "kg",    cycles: 1, yield: 2 },
    { name: "Utilities & road", pct: 2.0, costUnit: 0, revUnit: 0, unit: "", cycles: 1, yield: 0 },
    { name: "Goats",    pct: 12,   costUnit: 1200,revUnit: 1800,unit: "goats", cycles: 1, yield: 0.01 },
    { name: "Groundnuts",pct: 12,  costUnit: 50,  revUnit: 70,  unit: "kg",    cycles: 2, yield: 0.35 },
    { name: "Tomatoes", pct: 12,   costUnit: 2.5, revUnit: 8,   unit: "kg",    cycles: 3, yield: 4 },
    { name: "Cabbages", pct: 12,   costUnit: 2.5, revUnit: 6,   unit: "heads", cycles: 2, yield: 1.5 },
    { name: "Potatoes", pct: 12,   costUnit: 2.5, revUnit: 6,   unit: "kg",    cycles: 2, yield: 2.5 },
    { name: "Watermelons",pct:12, costUnit: 2.5, revUnit: 7,   unit: "kg",    cycles: 1, yield: 2 },
    { name: "Sugar beans",pct:12, costUnit: 30,  revUnit: 45,  unit: "kg",    cycles: 1, yield: 0.15 },
    { name: "Onions",   pct: 12,   costUnit: 3,   revUnit: 7,   unit: "kg",    cycles: 2, yield: 2.5 }
];
