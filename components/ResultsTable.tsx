
import React from 'react';
import { CalculationResult, Totals } from '../types';

interface ResultsTableProps {
    results: CalculationResult[];
    totals: Totals;
    formatCurrency: (value: number) => string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, totals, formatCurrency }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full min-w-[650px] text-sm text-left text-gray-700">
                <thead className="bg-green-600 text-white uppercase text-xs">
                    <tr>
                        <th scope="col" className="px-6 py-3">Farm Type</th>
                        <th scope="col" className="px-6 py-3">Area (m²)</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3 text-right">Cost</th>
                        <th scope="col" className="px-6 py-3 text-right">Revenue</th>
                        <th scope="col" className="px-6 py-3 text-right">Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={item.name} className="bg-white border-b hover:bg-green-50 transition-colors duration-200">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4">{item.area.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="px-6 py-4">{item.quantity > 0 ? `${item.quantity.toLocaleString()} ${item.unit}` : '0'}</td>
                            <td className="px-6 py-4 text-right">{formatCurrency(item.cost)}</td>
                            <td className="px-6 py-4 text-right">{formatCurrency(item.revenue)}</td>
                            <td className="px-6 py-4 text-right font-semibold text-green-700">{formatCurrency(item.profit)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="font-bold bg-green-100 text-gray-800">
                        <td className="px-6 py-4">Totals</td>
                        <td className="px-6 py-4">{totals.area.toLocaleString()}</td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 text-right">{formatCurrency(totals.cost)}</td>
                        <td className="px-6 py-4 text-right">{formatCurrency(totals.revenue)}</td>
                        <td className="px-6 py-4 text-right text-green-800">{formatCurrency(totals.profit)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ResultsTable;
