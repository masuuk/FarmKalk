
import React from 'react';
import { CalculationResult } from '../types';

interface ProfitChartProps {
    results: CalculationResult[];
    formatCurrency: (value: number) => string;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ results, formatCurrency }) => {
    const profitableFarms = results.filter(r => r.profit > 0 && r.name !== "Utilities & road");
    const maxProfit = Math.max(...profitableFarms.map(r => r.profit), 0);
    
    if (maxProfit === 0) {
        return (
            <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
                No profit data to display.
            </div>
        );
    }

    return (
        <div className="bg-white/50 p-4 rounded-lg border border-gray-200/80 shadow-sm">
             <h4 className="text-sm font-semibold text-gray-600 mb-3 text-center">Profit Contribution</h4>
            <div className="w-full h-48 flex items-end justify-around gap-2 px-2">
                {profitableFarms.map((item) => {
                    const barHeight = (item.profit / maxProfit) * 100;
                    return (
                        <div key={item.name} className="flex-1 flex flex-col items-center h-full justify-end group">
                            <div
                                className="w-full bg-green-200 hover:bg-green-400 rounded-t-md transition-all duration-300 ease-in-out cursor-pointer relative"
                                style={{ height: `${barHeight}%` }}
                                title={`${item.name}: ${formatCurrency(item.profit)}`}
                            >
                               <div className="absolute bottom-full mb-1 w-max max-w-xs left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {formatCurrency(item.profit)}
                                </div>
                            </div>
                            <div className="text-center mt-1.5 text-2xl">
                                {item.emoji}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfitChart;
