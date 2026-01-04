import { FarmType } from './types';

export const FARM_TYPES: FarmType[] = [
    { name: "Broilers", emoji: "🐔", pct: 0.8,  materialCostUnit: 100, labourCostUnit: 15, overheadCostUnit: 5, revUnit: 126, unit: "birds", cycles: 5, yield: 20 },
    { name: "Rabbit",   emoji: "🐰", pct: 0.4,  materialCostUnit: 60,  labourCostUnit: 15, overheadCostUnit: 5, revUnit: 120, unit: "kits",  cycles: 5, yield: 2 },
    { name: "Mushroom", emoji: "🍄", pct: 0.4,  materialCostUnit: 20,  labourCostUnit: 8,  overheadCostUnit: 2, revUnit: 60,  unit: "kg",    cycles: 6, yield: 0.5 },
    { name: "Tilapia",  emoji: "🐟", pct: 0.4,  materialCostUnit: 20,  labourCostUnit: 3,  overheadCostUnit: 2, revUnit: 40,  unit: "kg",    cycles: 2, yield: 2 },
    { name: "Goats",    emoji: "🐐", pct: 12,   materialCostUnit: 1000,labourCostUnit: 150,overheadCostUnit: 50,revUnit: 1800,unit: "goats", cycles: 1, yield: 0.01 },
    { name: "Groundnuts",emoji: "🥜", pct: 12,  materialCostUnit: 25,  labourCostUnit: 20, overheadCostUnit: 5, revUnit: 70,  unit: "kg",    cycles: 2, yield: 0.35 },
    { name: "Tomatoes", emoji: "🍅", pct: 12,   materialCostUnit: 1,   labourCostUnit: 1,  overheadCostUnit: 0.5, revUnit: 8,   unit: "kg",    cycles: 3, yield: 4 },
    { name: "Cabbages", emoji: "🥬", pct: 12,   materialCostUnit: 1,   labourCostUnit: 1,  overheadCostUnit: 0.5, revUnit: 6,   unit: "heads", cycles: 2, yield: 1.5 },
    { name: "Potatoes", emoji: "🥔", pct: 12,   materialCostUnit: 1.5, labourCostUnit: 0.7,overheadCostUnit: 0.3, revUnit: 6,   unit: "kg",    cycles: 2, yield: 2.5 },
    { name: "Watermelons",emoji:"🍉",pct:12, materialCostUnit: 1,   labourCostUnit: 1,  overheadCostUnit: 0.5, revUnit: 7,   unit: "kg",    cycles: 1, yield: 2 },
    { name: "Sugar beans",emoji:"🫘",pct:12, materialCostUnit: 15,  labourCostUnit: 12, overheadCostUnit: 3, revUnit: 45,  unit: "kg",    cycles: 1, yield: 0.15 },
    { name: "Onions",   emoji: "🧅", pct: 12,   materialCostUnit: 1,   labourCostUnit: 1.5,overheadCostUnit: 0.5, revUnit: 7,   unit: "kg",    cycles: 2, yield: 2.5 },
    { name: "Utilities & road", emoji: "🛣️", pct: 2.0, materialCostUnit: 0, labourCostUnit: 0, overheadCostUnit: 0, revUnit: 0, unit: "", cycles: 1, yield: 0 },
];