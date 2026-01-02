
import React from 'react';

interface StatCardProps {
    label: string;
    value: string;
    isHighlighted?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, isHighlighted = false }) => {
    return (
        <div className="bg-green-50/70 p-4 rounded-xl shadow-sm text-center transition-transform hover:scale-105">
            <p className="text-sm sm:text-base text-gray-600">{label}</p>
            <p className={`text-xl sm:text-2xl font-bold mt-1 ${isHighlighted ? 'text-green-700' : 'text-green-800'}`}>
                {value}
            </p>
        </div>
    );
};

export default StatCard;
