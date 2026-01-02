
import React, { useState, useMemo, useCallback } from 'react';
import { FARM_TYPES } from './constants';
import { FarmType, CalculationResult, Totals, Currency } from './types';
import ConfigurationPanel from './components/ConfigurationPanel';
import ResultsPanel from './components/ResultsPanel';

const App: React.FC = () => {
    const [totalArea, setTotalArea] = useState<number>(10000);
    const [currency, setCurrency] = useState<Currency>('ZAR');
    const [exchangeRate, setExchangeRate] = useState<number>(17.50);
    const [farmTypes, setFarmTypes] = useState<FarmType[]>(FARM_TYPES);

    const handleUpdateFarmType = (index: number, updatedFarm: FarmType) => {
        const newFarmTypes = [...farmTypes];
        newFarmTypes[index] = updatedFarm;
        setFarmTypes(newFarmTypes);
    };

    const formatCurrency = useCallback((value: number) => {
        const convertedValue = currency === 'USD' ? value / exchangeRate : value;
        const options = {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        };
        const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-ZA', options);
        return formatter.format(convertedValue).replace('ZAR', 'R');
    }, [currency, exchangeRate]);

    const { results, totals } = useMemo(() => {
        let totalCost = 0;
        let totalRevenue = 0;
        let totalAllocatedArea = 0;

        const calculatedResults: CalculationResult[] = farmTypes.map((farm: FarmType) => {
            const area = (farm.pct / 100) * totalArea;
            totalAllocatedArea += area;
            const quantity = farm.name !== "Utilities & road" ? Math.round(farm.yield * area * farm.cycles) : 0;
            
            const cost = quantity * farm.costUnit;
            const revenue = quantity * farm.revUnit;
            const profit = revenue - cost;

            totalCost += cost;
            totalRevenue += revenue;

            return {
                name: farm.name,
                emoji: farm.emoji,
                area,
                quantity,
                cost,
                revenue,
                profit,
                unit: farm.unit,
            };
        });

        const totalProfit = totalRevenue - totalCost;
        const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

        const calculatedTotals: Totals = {
            cost: totalCost,
            revenue: totalRevenue,
            profit: totalProfit,
            profitMargin,
            area: totalArea,
        };

        return { results: calculatedResults, totals: calculatedTotals };
    }, [totalArea, farmTypes, currency, exchangeRate]);


    return (
        <div className="bg-green-50/50 min-h-screen text-gray-800 p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8 p-6 bg-green-700 rounded-xl shadow-md">
                    <h1 className="text-4xl font-bold text-white">
                        🚜 Farm Profitability Calculator
                    </h1>
                    <p className="text-green-200 mt-1">
                        Instantly analyze costs, revenue, and profit for your farm.
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2">
                        <ConfigurationPanel
                            totalArea={totalArea}
                            setTotalArea={setTotalArea}
                            currency={currency}
                            setCurrency={setCurrency}
                            exchangeRate={exchangeRate}
                            setExchangeRate={setExchangeRate}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <ResultsPanel
                            farmTypes={farmTypes}
                            onUpdateFarmType={handleUpdateFarmType}
                            results={results}
                            totals={totals}
                            formatCurrency={formatCurrency}
                        />
                    </div>
                </main>

                <footer className="text-center mt-8 text-sm text-green-700/80">
                    <p>South African Market Estimates</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
