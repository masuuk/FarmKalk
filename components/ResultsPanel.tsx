
import React, { useState } from 'react';
import { CalculationResult, Totals, FarmType } from '../types';
import StatCard from './StatCard';
import ResultsTable from './ResultsTable';
import InfoBox from './InfoBox';
import ProfitChart from './ProfitChart';

const ResultsPanel: React.FC<{
    results: CalculationResult[];
    totals: Totals;
    formatCurrency: (value: number) => string;
    farmTypes: FarmType[];
    onUpdateFarmType: (index: number, updatedFarm: FarmType) => void;
}> = ({
    results,
    totals,
    formatCurrency,
    farmTypes,
    onUpdateFarmType
}) => {
    const [isChartVisible, setIsChartVisible] = useState(true);
    const cycleInfoItems = farmTypes.filter(f => f.name !== 'Utilities & road');

    return (
        <div className="bg-white/80 p-3 sm:p-5 rounded-xl shadow-lg h-full border border-gray-200/80 backdrop-blur-sm">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Profitability Report
                </h2>
                <button 
                    onClick={() => setIsChartVisible(!isChartVisible)}
                    className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-md transition-colors"
                    aria-label={isChartVisible ? 'Hide chart' : 'Show chart'}
                    title={isChartVisible ? 'Hide chart' : 'Show chart'}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <StatCard label="Total Cost" value={formatCurrency(totals.cost)} icon={"🛒"} />
                <StatCard label="Total Revenue" value={formatCurrency(totals.revenue)} icon={"💰"}/>
                <StatCard label="Total Profit" value={formatCurrency(totals.profit)} isHighlighted icon={"✨"} />
                <StatCard label="Profit Margin" value={`${totals.profitMargin.toFixed(1)}%`} isHighlighted icon={"📈"} />
            </div>

            {isChartVisible && (
                 <div className="mb-4 transition-all duration-500 ease-in-out">
                    <ProfitChart results={results} formatCurrency={formatCurrency} />
                </div>
            )}

            <ResultsTable
                results={results}
                totals={totals}
                formatCurrency={formatCurrency}
                farmTypes={farmTypes}
                onUpdateFarmType={onUpdateFarmType}
            />

            <InfoBox 
                title="Annual Production Cycles"
                variant="info"
            >
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-1">
                    {cycleInfoItems.map(farm => (
                        <div key={farm.name} className="flex items-center gap-1.5" title={`${farm.name}: ${farm.cycles} cycles`}>
                            <span className="text-base">{farm.emoji}</span>
                            <span className="font-semibold text-xs bg-green-200/60 text-green-900 px-1.5 py-0.5 rounded-full">
                                {farm.cycles}
                            </span>
                        </div>
                    ))}
                </div>
            </InfoBox>

        </div>
    );
};

export default ResultsPanel;
