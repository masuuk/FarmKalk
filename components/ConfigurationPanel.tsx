
import React from 'react';
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
    const broilerData = farmTypes.find(f => f.name === 'Broilers');
    const rabbitData = farmTypes.find(f => f.name === 'Rabbit');

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg h-full border border-gray-200/80">
            <h2 className="text-lg font-bold text-green-700 pb-3 mb-4 flex items-center gap-2 border-b border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v2a1 1 0 01-1 1h-3.5a1.5 1.5 0 00-3 0V15a1 1 0 01-1 1H6a1 1 0 01-1-1v-4.03a3.342 3.342 0 01.9-2.206l2.1-2.625A3.342 3.342 0 0110 3.5z" />
                  <path d="M10 3.5a1.5 1.5 0 00-3 0V4a1 1 0 01-1 1H3a1 1 0 00-1 1v2a1 1 0 001 1h3.5a1.5 1.5 0 013 0V15a1 1 0 001 1h4a1 1 0 001-1v-4.03a3.342 3.342 0 00-.9-2.206l-2.1-2.625A3.342 3.342 0 0010 3.5z" />
                </svg>
                Configuration
            </h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="totalArea" className="block text-sm font-medium text-gray-600 mb-1">Total Farm Area (m²)</label>
                    <input
                        type="number"
                        id="totalArea"
                        value={totalArea}
                        onChange={(e) => setTotalArea(Number(e.target.value))}
                        min="100"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as Currency)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white text-sm"
                        >
                            <option value="ZAR">Rand (R)</option>
                            <option value="USD">Dollar ($)</option>
                        </select>
                    </div>

                    {currency === 'USD' && (
                        <div className="transition-all duration-300 ease-in-out">
                            <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-600 mb-1">USD to ZAR Rate</label>
                            <input
                                type="number"
                                id="exchangeRate"
                                value={exchangeRate}
                                onChange={(e) => setExchangeRate(Number(e.target.value))}
                                step="0.01"
                                min="1"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-shadow text-sm"
                            />
                        </div>
                    )}
                </div>
                
                <div className="border-t pt-4 space-y-3">
                     <h3 className="text-base font-semibold text-gray-700">Quick Adjustments</h3>
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

                 <InfoBox
                    title="Currency Conversion"
                    variant="warning"
                >
                    <p>All values are based in ZAR. When USD is selected, they are converted using your exchange rate.</p>
                </InfoBox>
            </div>
        </div>
    );
};

export default ConfigurationPanel;
