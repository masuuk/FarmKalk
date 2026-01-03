
import React from 'react';

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    variant: 'warning' | 'info';
    onClose?: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children, variant, onClose }) => {
    const variantClasses = {
        warning: {
            bg: "bg-yellow-100/50",
            text: "text-yellow-800",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            )
        },
        info: {
            bg: "bg-green-100/50",
            text: "text-green-800",
            icon: null
        },
    };

    const currentVariant = variantClasses[variant];

    return (
        <div className={`p-3 rounded-lg mt-4 text-xs ${currentVariant.bg} ${currentVariant.text} relative`} role="alert">
            <h3 className={`font-semibold mb-1 flex items-center gap-1.5 ${currentVariant.icon ? '' : 'justify-center'}`}>
                {currentVariant.icon}
                {title}
            </h3>
            <div className="opacity-90 pr-5">
                {children}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Close message"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            )}
        </div>
    );
};

export default InfoBox;
