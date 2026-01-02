
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

    const cycleInfoString = farmTypes.filter(f => f.name !== 'Utilities & road').map(f => `${f.name}: ${f.cycles}`).join(' | ');

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-green-700 border-b pb-3 mb-6 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Farm Profitability Report
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Cost" value={formatCurrency(totals.cost)} />
                <StatCard label="Total Revenue" value={formatCurrency(totals.revenue)} />
                <StatCard label="Total Profit" value={formatCurrency(totals.profit)} isHighlighted />
                <StatCard label="Profit Margin" value={`${totals.profitMargin.toFixed(1)}%`} isHighlighted />
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
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>}
            >
                <p>{cycleInfoString}</p>
            </InfoBox>

        </div>
    );
};

export default ResultsPanel;
