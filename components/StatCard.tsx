
import React from 'react';

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    isHighlighted?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, isHighlighted = false }) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200/80">
            <div className={`text-xl p-2 rounded-full ${isHighlighted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {icon}
            </div>
            <div>
                 <p className="text-xs text-gray-500">{label}</p>
                 <p className={`text-lg font-bold ${isHighlighted ? 'text-green-700' : 'text-gray-800'}`}>
                    {value}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
