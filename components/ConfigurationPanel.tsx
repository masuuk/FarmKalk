
import React, { useState } from 'react';
import { Currency, FarmType } from '../types';
import InfoBox from './InfoBox';

interface ConfigurationPanelProps {
    totalArea: number;
    setTotalArea: (value: number) => void;
    currency: Currency;
    setCurrency: (value: Currency) => void;
    exchangeRate: number;
    setExchangeRate: (value: number) => void;
    farmTypes: FarmType[];
    onUpdateFarmUnitValues: (farmName: string, newValues: { costUnit?: number; revUnit?: number }) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
    totalArea,
    setTotalArea,
    currency,
    setCurrency,
    exchangeRate,
    setExchangeRate,
    farmTypes,
    onUpdateFarmUnitValues
}) => {
    const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(false);
    const broilerData = farmTypes.find(f => f.name === 'Broilers');
    const rabbitData = farmTypes.find(f => f.name === 'Rabbit');

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg h-full border border-gray-200/80">
            <h2 className="text-lg font-bold text-green-700 pb-3 mb-4 flex items-center gap-2 border-b border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L7.86 5.89c-.33.13-.69.13-1.02 0l-2.79-1.52c-1.47-.8-3.14.26-2.87 1.95l.59 3.65c.09.55-.13 1.12-.52 1.52L.3 14.89c-1.21 1.21.26 3.23 1.95 2.87l3.65-.59c.55-.09 1.12.13 1.52.52l2.34 2.96c1.13 1.43 3.29 1.43 4.42 0l2.34-2.96c.4-.39.97-.61 1.52-.52l3.65.59c1.69.36 3.16-1.66 1.95-2.87L15.3 11.9c-.39-.4-.61-.97-.52-1.52l.59-3.65c.27-1.69-1.4-2.75-2.87-1.95l-2.79 1.52c-.33.13-.69.13-1.02 0l-.65-2.72zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Configuration
            </h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="totalArea" className="block text-sm font-medium text-gray-600 mb-1">Total Farm Area</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 text-sm">m²</span>
                            </div>
                            <input
                                type="number"
                                id="totalArea"
                                value={totalArea}
                                onChange={(e) => setTotalArea(Number(e.target.value))}
                                min="100"
                                className="w-full p-2 pl-9 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow text-sm"
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as Currency)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white text-sm"
                        >
                            <option value="ZAR">🇿🇦 Rand (R)</option>
                            <option value="USD">🇺🇸 Dollar ($)</option>
                        </select>
                    </div>
                </div>

                {currency === 'USD' && (
                    <div className="transition-all duration-300 ease-in-out">
                        <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-600 mb-1">USD to ZAR Rate</label>
                            <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 text-sm">$→R</span>
                            </div>
                            <input
                                type="number"
                                id="exchangeRate"
                                value={exchangeRate}
                                onChange={(e) => setExchangeRate(Number(e.target.value))}
                                step="0.01"
                                min="1"
                                className="w-full p-2 pl-11 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow text-sm"
                            />
                        </div>
                    </div>
                )}
                
                <div className="border-t border-gray-200">
                    <button
                        onClick={() => setIsAdjustmentsOpen(!isAdjustmentsOpen)}
                        className="flex justify-between items-center w-full py-3 text-left font-semibold text-gray-700 hover:bg-gray-50 rounded-md px-2"
                    >
                        <span>Quick Adjustments</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isAdjustmentsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isAdjustmentsOpen && (
                        <div className="px-2 pb-2 space-y-3 bg-gray-50/70 rounded-b-md">
                             {broilerData && (
                                 <div className="grid grid-cols-2 gap-3">
                                     <div>
                                         <label htmlFor="broilerCost" className="block text-xs font-medium text-gray-500">🐔 Broiler Cost</label>
                                         <input type="number" id="broilerCost" value={broilerData.costUnit} onChange={(e) => onUpdateFarmUnitValues('Broilers', { costUnit: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm" />
                                     </div>
                                      <div>
                                         <label htmlFor="broilerPrice" className="block text-xs font-medium text-gray-500">🐔 Broiler Price</label>
                                         <input type="number" id="broilerPrice" value={broilerData.revUnit} onChange={(e) => onUpdateFarmUnitValues('Broilers', { revUnit: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm" />
                                     </div>
                                 </div>
                             )}
                             {rabbitData && (
                                 <div className="grid grid-cols-2 gap-3">
                                     <div>
                                         <label htmlFor="rabbitCost" className="block text-xs font-medium text-gray-500">🐰 Rabbit Cost</label>
                                         <input type="number" id="rabbitCost" value={rabbitData.costUnit} onChange={(e) => onUpdateFarmUnitValues('Rabbit', { costUnit: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm" />
                                     </div>
                                      <div>
                                         <label htmlFor="rabbitPrice" className="block text-xs font-medium text-gray-500">🐰 Rabbit Price</label>
                                         <input type="number" id="rabbitPrice" value={rabbitData.revUnit} onChange={(e) => onUpdateFarmUnitValues('Rabbit', { revUnit: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-md mt-1 text-sm" />
                                     </div>
                                 </div>
                             )}
                        </div>
                    )}
                </div>

                 <InfoBox
                    title="Currency Conversion"
                    variant="warning"
                >
                    <p>All values are based in ZAR. When USD is selected, they are converted using your provided exchange rate.</p>
                </InfoBox>
            </div>
        </div>
    );
};

export default ConfigurationPanel;
