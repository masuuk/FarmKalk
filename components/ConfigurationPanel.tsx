
import React from 'react';
import { Currency } from '../types';
import InfoBox from './InfoBox';

interface ConfigurationPanelProps {
    totalArea: number;
    setTotalArea: (value: number) => void;
    currency: Currency;
    setCurrency: (value: Currency) => void;
    exchangeRate: number;
    setExchangeRate: (value: number) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
    totalArea,
    setTotalArea,
    currency,
    setCurrency,
    exchangeRate,
    setExchangeRate
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-xl font-bold text-green-700 border-b pb-3 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Configuration
            </h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="totalArea" className="block text-sm font-medium text-gray-700 mb-1">Total Farm Area (m²)</label>
                    <input
                        type="number"
                        id="totalArea"
                        value={totalArea}
                        onChange={(e) => setTotalArea(Number(e.target.value))}
                        min="100"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                    />
                </div>

                <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white"
                    >
                        <option value="ZAR">South African Rand (R)</option>
                        <option value="USD">US Dollar ($)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1 italic">Select USD to enable exchange rate.</p>
                </div>

                {currency === 'USD' && (
                    <div className="transition-all duration-300 ease-in-out">
                        <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-700 mb-1">USD to ZAR Rate</label>
                        <input
                            type="number"
                            id="exchangeRate"
                            value={exchangeRate}
                            onChange={(e) => setExchangeRate(Number(e.target.value))}
                            step="0.01"
                            min="1"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                        />
                    </div>
                )}
                 <InfoBox
                    title="Currency Conversion"
                    variant="warning"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
                >
                    <p>All costs and revenues are based in ZAR. When USD is selected, values are divided by the exchange rate you provide.</p>
                </InfoBox>
            </div>
        </div>
    );
};

export default ConfigurationPanel;
