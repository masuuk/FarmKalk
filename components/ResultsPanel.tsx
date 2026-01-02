
import React from 'react';
import { CalculationResult, Totals, FarmType } from '../types';
import StatCard from './StatCard';
import ResultsTable from './ResultsTable';
import InfoBox from './InfoBox';

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

    const cycleInfoString = farmTypes.filter(f => f.name !== 'Utilities & road').map(f => `${f.emoji} ${f.cycles}`).join(' | ');

    return (
        <div className="bg-white/80 p-5 rounded-xl shadow-lg h-full border border-gray-200/80 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-green-700 pb-3 mb-4 flex items-center gap-2 border-b border-gray-200">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Profitability Report
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <StatCard label="Total Cost" value={formatCurrency(totals.cost)} icon={"🛒"} />
                <StatCard label="Total Revenue" value={formatCurrency(totals.revenue)} icon={"💰"}/>
                <StatCard label="Total Profit" value={formatCurrency(totals.profit)} isHighlighted icon={"✨"} />
                <StatCard label="Profit Margin" value={`${totals.profitMargin.toFixed(1)}%`} isHighlighted icon={"📈"} />
            </div>

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
                <p className="text-xs leading-relaxed">{cycleInfoString}</p>
            </InfoBox>

        </div>
    );
};

export default ResultsPanel;
