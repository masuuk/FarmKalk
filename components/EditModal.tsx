import React, { useState, useEffect } from 'react';
import { FarmType } from '../types';

interface EditModalProps {
    farm: FarmType;
    onSave: (updatedFarm: FarmType) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ farm, onSave, onClose }) => {
    const [materialCostUnit, setMaterialCostUnit] = useState(farm.materialCostUnit);
    const [labourCostUnit, setLabourCostUnit] = useState(farm.labourCostUnit);
    const [overheadCostUnit, setOverheadCostUnit] = useState(farm.overheadCostUnit);
    const [revUnit, setRevUnit] = useState(farm.revUnit);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleSave = () => {
        onSave({
            ...farm,
            materialCostUnit: Number(materialCostUnit) || 0,
            labourCostUnit: Number(labourCostUnit) || 0,
            overheadCostUnit: Number(overheadCostUnit) || 0,
            revUnit: Number(revUnit) || 0,
        });
    };
    
    const totalCost = (Number(materialCostUnit) || 0) + (Number(labourCostUnit) || 0) + (Number(overheadCostUnit) || 0);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 backdrop-blur-sm" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center pb-2 mb-4">
                    <h3 id="edit-modal-title" className="text-lg font-bold text-gray-800">Edit: <span className="text-green-600">{farm.emoji} {farm.name}</span></h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100" aria-label="Close modal">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="revUnit" className="block text-sm font-bold text-gray-700 mb-1">Selling Price per Unit ({farm.unit})</label>
                        <input
                            type="number"
                            id="revUnit"
                            value={revUnit}
                            onChange={(e) => setRevUnit(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 font-bold"
                            autoFocus
                        />
                    </div>
                    
                    <div className="pt-2 border-t">
                        <p className="text-sm font-bold text-gray-700 mb-2">Cost Breakdown per Unit</p>
                         <div className="space-y-3 pl-2 border-l-2 border-green-200">
                             <div>
                                <label htmlFor="materialCostUnit" className="block text-xs font-bold text-gray-600 mb-1">Material Cost</label>
                                <input
                                    type="number"
                                    id="materialCostUnit"
                                    value={materialCostUnit}
                                    onChange={(e) => setMaterialCostUnit(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 font-bold"
                                />
                            </div>
                            <div>
                                <label htmlFor="labourCostUnit" className="block text-xs font-bold text-gray-600 mb-1">Labour Cost</label>
                                <input
                                    type="number"
                                    id="labourCostUnit"
                                    value={labourCostUnit}
                                    onChange={(e) => setLabourCostUnit(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 font-bold"
                                />
                            </div>
                             <div>
                                <label htmlFor="overheadCostUnit" className="block text-xs font-bold text-gray-600 mb-1">Overhead Cost</label>
                                <input
                                    type="number"
                                    id="overheadCostUnit"
                                    value={overheadCostUnit}
                                    onChange={(e) => setOverheadCostUnit(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 font-bold"
                                />
                            </div>
                        </div>
                        <div className="mt-3 text-right pr-1">
                            <p className="text-xs text-gray-500">Total Cost per Unit: <span className="font-bold text-gray-800">{totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
                    <button onClick={onClose} className="text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mr-2 transition-colors font-bold">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors font-bold">
                        Save Changes
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default EditModal;