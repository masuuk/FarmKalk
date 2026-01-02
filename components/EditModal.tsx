
import React, { useState, useEffect } from 'react';
import { FarmType } from '../types';

interface EditModalProps {
    farm: FarmType;
    onSave: (updatedFarm: FarmType) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ farm, onSave, onClose }) => {
    const [costUnit, setCostUnit] = useState(farm.costUnit);
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
            costUnit: Number(costUnit) || 0,
            revUnit: Number(revUnit) || 0,
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 id="edit-modal-title" className="text-xl font-bold text-gray-800">Edit: {farm.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="costUnit" className="block text-sm font-medium text-gray-700 mb-1">Cost per Unit ({farm.unit})</label>
                        <input
                            type="number"
                            id="costUnit"
                            value={costUnit}
                            onChange={(e) => setCostUnit(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label htmlFor="revUnit" className="block text-sm font-medium text-gray-700 mb-1">Selling Price per Unit ({farm.unit})</label>
                        <input
                            type="number"
                            id="revUnit"
                            value={revUnit}
                            onChange={(e) => setRevUnit(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end items-center mt-6 pt-4 border-t">
                    <button onClick={onClose} className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mr-2 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors">
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
