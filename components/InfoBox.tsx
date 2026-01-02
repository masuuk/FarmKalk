
import React from 'react';

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    variant: 'warning' | 'info';
    icon: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children, variant, icon }) => {
    const baseClasses = "border-l-4 p-4 rounded-r-lg mt-6";
    const variantClasses = {
        warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
        info: "bg-blue-50 border-blue-400 text-blue-800",
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]}`} role="alert">
            <h3 className="font-bold flex items-center gap-2 mb-1">
                {icon}
                {title}
            </h3>
            <div className="text-sm">
                {children}
            </div>
        </div>
    );
};

export default InfoBox;
