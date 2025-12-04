import React from 'react';
import NeonButton from './NeonButton';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    color?: 'cyan' | 'pink' | 'red' | 'green';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children, confirmText = "Confirm", cancelText = "Cancel", color = "cyan" }) => {
    if (!isOpen) return null;

    const colorClasses = {
        cyan: 'border-cyan-500/30 text-cyan-500/50',
        pink: 'border-pink-500/30 text-pink-500/50',
        red: 'border-red-500/30 text-red-500/50',
        green: 'border-green-500/30 text-green-500/50',
    }[color];

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div 
                className={`bg-gray-900/80 backdrop-blur-xl border ${colorClasses} rounded-2xl w-full max-w-md p-6 box-glow m-4 animate-fade-in-up`}
                onClick={e => e.stopPropagation()}
            >
                <h2 className={`text-2xl font-bold text-glow text-white mb-4 text-center`}>{title}</h2>
                <div className="my-6">
                    {children}
                </div>
                <div className="flex justify-center gap-4">
                    <NeonButton color="purple" onClick={onClose} className="px-6 py-2">{cancelText}</NeonButton>
                    <NeonButton color={color} onClick={onConfirm} className="px-6 py-2">{confirmText}</NeonButton>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
