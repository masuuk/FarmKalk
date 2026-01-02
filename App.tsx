
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

    const handleUpdateFarmUnitValues = (farmName: string, newValues: { costUnit?: number; revUnit?: number }) => {
        setFarmTypes(prevFarmTypes => 
            prevFarmTypes.map(farm => 
                farm.name === farmName ? { ...farm, ...newValues } : farm
            )
        );
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
            area: totalArea, // Use totalArea from state for the final total, not summed allocatedArea
        };

        return { results: calculatedResults, totals: calculatedTotals };
    }, [totalArea, farmTypes]);


    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 flex items-center justify-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 0011 7v10zM4 17a1 1 0 001.447.894l4-2A1 1 0 0010 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 004 7v10z" />
                        </svg>
                        Farm Profitability Calculator
                    </h1>
                    <p className="text-green-700 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
                        Estimate annual revenue, cost, and profit by farm type — with live USD/ZAR conversion.
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-1">
                        <ConfigurationPanel
                            totalArea={totalArea}
                            setTotalArea={setTotalArea}
                            currency={currency}
                            setCurrency={setCurrency}
                            exchangeRate={exchangeRate}
                            setExchangeRate={setExchangeRate}
                            farmTypes={farmTypes}
                            onUpdateFarmUnitValues={handleUpdateFarmUnitValues}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <ResultsPanel
                            farmTypes={farmTypes}
                            onUpdateFarmType={handleUpdateFarmType}
                            results={results}
                            totals={totals}
                            formatCurrency={formatCurrency}
                        />
                    </div>
                </main>

                <footer className="text-center mt-8 md:mt-12 text-green-600">
                    <p>Farm Profitability Calculator | South African Market Estimates</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
