
import React, { useState } from 'react';
import { CalculationResult, Totals, FarmType } from '../types';
import EditModal from './EditModal';

interface ResultsTableProps {
    results: CalculationResult[];
    totals: Totals;
    formatCurrency: (value: number) => string;
    farmTypes: FarmType[];
    onUpdateFarmType: (index: number, updatedFarm: FarmType) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, totals, formatCurrency, farmTypes, onUpdateFarmType }) => {
    const [editingFarmIndex, setEditingFarmIndex] = useState<number | null>(null);

    const handleSave = (updatedFarm: FarmType) => {
        if (editingFarmIndex !== null) {
            onUpdateFarmType(editingFarmIndex, updatedFarm);
        }
        setEditingFarmIndex(null);
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200/80 bg-white">
                <table className="w-full min-w-[650px] text-sm text-left text-gray-700">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                        <tr>
                            <th scope="col" className="px-4 py-3">Farm Type</th>
                            <th scope="col" className="px-4 py-3">Area (m²)</th>
                            <th scope="col" className="px-4 py-3">Quantity</th>
                            <th scope="col" className="px-4 py-3 text-right">Cost</th>
                            <th scope="col" className="px-4 py-3 text-right">Revenue</th>
                            <th scope="col" className="px-4 py-3 text-right">Profit</th>
                            <th scope="col" className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/80">
                        {results.map((item, index) => (
                            <tr key={item.name} className="hover:bg-green-50/50 transition-colors duration-200">
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                    <span className="mr-2">{item.emoji}</span>{item.name}
                                </td>
                                <td className="px-4 py-3">{item.area.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td className="px-4 py-3 text-gray-600">{item.quantity > 0 ? `${item.quantity.toLocaleString()} ${item.unit}` : '—'}</td>
                                <td className="px-4 py-3 text-right">{formatCurrency(item.cost)}</td>
                                <td className="px-4 py-3 text-right">{formatCurrency(item.revenue)}</td>
                                <td className="px-4 py-3 text-right font-semibold text-green-700">{formatCurrency(item.profit)}</td>
                                <td className="px-4 py-3 text-center">
                                    {item.name !== "Utilities & road" && (
                                        <button
                                            onClick={() => setEditingFarmIndex(index)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md disabled:text-gray-400"
                                            aria-label={`Edit ${item.name}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="font-bold bg-green-50 text-gray-800 border-t-2 border-green-200">
                            <td className="px-4 py-3">Totals</td>
                            <td className="px-4 py-3">{totals.area.toLocaleString()}</td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3 text-right">{formatCurrency(totals.cost)}</td>
                            <td className="px-4 py-3 text-right">{formatCurrency(totals.revenue)}</td>
                            <td className="px-4 py-3 text-right text-green-800">{formatCurrency(totals.profit)}</td>
                            <td className="px-4 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {editingFarmIndex !== null && farmTypes[editingFarmIndex] && (
                <EditModal
                    farm={farmTypes[editingFarmIndex]}
                    onClose={() => setEditingFarmIndex(null)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default ResultsTable;
