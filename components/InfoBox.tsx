
import React from 'react';

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    variant: 'warning' | 'info';
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children, variant }) => {
    const variantClasses = {
        warning: "bg-yellow-100/50 text-yellow-800",
        info: "bg-blue-100/50 text-blue-800",
    };

    return (
        <div className={`p-3 rounded-lg mt-4 text-xs ${variantClasses[variant]}`} role="alert">
            <h3 className="font-semibold mb-0.5">
                {title}
            </h3>
            <div className="opacity-80">
                {children}
            </div>
        </div>
    );
};

export default InfoBox;
