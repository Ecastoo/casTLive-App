import React from 'react';
import NeonButton from './NeonButton';
import FormField from './FormField';

interface RefundPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const RefundPanel: React.FC<RefundPanelProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-gray-900/80 backdrop-blur-xl border border-red-500/30 rounded-2xl w-full max-w-lg p-6 box-glow text-red-500/50 m-4 animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-glow text-red-300 mb-4">Refund Request</h2>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); onClose(); }}>
                    <FormField label="Transaction ID">
                        <input type="text" placeholder="e.g., t1, gift_id_12345" />
                    </FormField>
                     <FormField label="Reason for Refund">
                        <select>
                            <option>Unauthorized Purchase</option>
                            <option>Accidental Purchase</option>
                            <option>Gift Animation Did Not Play</option>
                            <option>Other</option>
                        </select>
                    </FormField>
                     <FormField label="Additional Details">
                        <textarea rows={3} placeholder="Please provide as much detail as possible..."></textarea>
                    </FormField>
                    <div className="flex justify-end gap-4 pt-4">
                        <NeonButton color="cyan" onClick={onClose} className="px-6 py-2">Cancel</NeonButton>
                        <NeonButton color="red" type="submit" className="px-6 py-2">Submit Request</NeonButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RefundPanel;
