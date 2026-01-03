
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
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow-md border border-gray-200/80 bg-white">
                <table className="w-full min-w-[650px] text-sm text-left text-gray-700">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                        <tr>
                            <th scope="col" className="px-4 py-3">Farm Type</th>
                            <th scope="col" className="px-4 py-3 text-center">Area (m²)</th>
                            <th scope="col" className="px-4 py-3 text-center">Quantity</th>
                            <th scope="col" className="px-4 py-3 text-center">Cost</th>
                            <th scope="col" className="px-4 py-3 text-center">Revenue</th>
                            <th scope="col" className="px-4 py-3 text-center">Profit</th>
                            <th scope="col" className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/80">
                        {results.map((item, index) => {
                            if (item.name === "Utilities & road") return null;
                            return (
                                <tr key={item.name} className="hover:bg-green-50/30 transition-colors duration-200">
                                    <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                                        <span className="mr-2">{item.emoji}</span>{item.name}
                                    </td>
                                    <td className="px-4 py-3 text-center">{item.area.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    <td className="px-4 py-3 text-gray-600 text-center">{item.quantity > 0 ? `${item.quantity.toLocaleString()} ${item.unit}` : '—'}</td>
                                    <td className="px-4 py-3 text-center">{formatCurrency(item.cost)}</td>
                                    <td className="px-4 py-3 text-center">{formatCurrency(item.revenue)}</td>
                                    <td className="px-4 py-3 text-center font-bold text-green-700">{formatCurrency(item.profit)}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => setEditingFarmIndex(index)}
                                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-md disabled:text-gray-400"
                                            aria-label={`Edit ${item.name}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="font-bold bg-gray-50 text-gray-800 border-t-2 border-gray-200">
                            <td className="px-4 py-3">Totals</td>
                            <td className="px-4 py-3 text-center">{totals.area.toLocaleString()}</td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3 text-center">{formatCurrency(totals.cost)}</td>
                            <td className="px-4 py-3 text-center">{formatCurrency(totals.revenue)}</td>
                            <td className="px-4 py-3 text-center text-green-800">{formatCurrency(totals.profit)}</td>
                            <td className="px-4 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {results.map((item, index) => {
                    if (item.name === "Utilities & road") return null;
                    return (
                        <div key={item.name} className="bg-white p-4 rounded-lg shadow-md border border-gray-200/80">
                            <div className="flex justify-between items-start">
                                 <h3 className="text-base font-bold text-gray-800 mb-2">
                                    <span className="mr-2">{item.emoji}</span>{item.name}
                                </h3>
                                <button
                                    onClick={() => setEditingFarmIndex(index)}
                                    className="p-1.5 text-green-600 hover:bg-green-100 rounded-md -mt-1 -mr-1"
                                    aria-label={`Edit ${item.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>
                           
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t pt-2 mt-2">
                                <div>
                                    <p className="text-gray-500 text-xs">Area</p>
                                    <p className="font-bold">{item.area.toLocaleString(undefined, { maximumFractionDigits: 0 })} m²</p>
                                </div>
                                 <div>
                                    <p className="text-gray-500 text-xs">Quantity</p>
                                    <p className="font-bold">{item.quantity > 0 ? `${item.quantity.toLocaleString()} ${item.unit}` : '—'}</p>
                                </div>
                                 <div>
                                    <p className="text-gray-500 text-xs">Cost</p>
                                    <p className="font-bold">{formatCurrency(item.cost)}</p>
                                </div>
                                 <div>
                                    <p className="text-gray-500 text-xs">Revenue</p>
                                    <p className="font-bold">{formatCurrency(item.revenue)}</p>
                                </div>
                                 <div className="col-span-2 bg-green-50 p-2 rounded-md mt-1">
                                    <p className="text-green-600 text-xs">Profit</p>
                                    <p className="font-bold text-green-700">{formatCurrency(item.profit)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Mobile Totals Card */}
                <div className="bg-green-100/60 p-4 rounded-lg shadow-md border border-green-200/80 mt-4">
                     <h3 className="text-base font-bold text-green-800 mb-2">
                        Grand Totals
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-green-200/80 pt-2">
                        <div>
                            <p className="text-green-700 text-xs">Total Area</p>
                            <p className="font-bold text-green-900">{totals.area.toLocaleString()} m²</p>
                        </div>
                        <div>
                            <p className="text-green-700 text-xs">Total Cost</p>
                            <p className="font-bold text-green-900">{formatCurrency(totals.cost)}</p>
                        </div>
                        <div>
                            <p className="text-green-700 text-xs">Total Revenue</p>
                            <p className="font-bold text-green-900">{formatCurrency(totals.revenue)}</p>
                        </div>
                         <div className="font-bold">
                            <p className="text-green-700 text-xs">Total Profit</p>
                            <p className="text-lg text-green-900">{formatCurrency(totals.profit)}</p>
                        </div>
                    </div>
                </div>
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
