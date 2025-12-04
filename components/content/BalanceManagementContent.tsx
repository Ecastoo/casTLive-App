import React, { useState } from 'react';
import { PurchaseOption, Transaction } from '../../types';
import NeonButton from '../NeonButton';
import RefundPanel from '../RefundPanel';
import ConfirmationModal from '../ConfirmationModal';

const purchaseOptions: PurchaseOption[] = [
    { amount: 500, price: 4.99, bonus: 0 },
    { amount: 1200, price: 9.99, bonus: 200 },
    { amount: 2500, price: 19.99, bonus: 500 },
    { amount: 6500, price: 49.99, bonus: 1500 },
];

const transactionHistory: Transaction[] = [
    { id: 't1', type: 'purchase', description: 'Stardust Pack (1200)', amount: 1200, date: '2024-07-20' },
    { id: 't2', type: 'gift_sent', description: 'Galactic Whale to Orion_Nebula', amount: -1000, date: '2024-07-19' },
    { id: 't3', type: 'gift_received', description: 'Comet\'s Kiss from Stardust_Seeker', amount: 50, date: '2024-07-18' },
];


const BalanceManagementContent: React.FC = () => {
    const [isRefundPanelOpen, setIsRefundPanelOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState<PurchaseOption | null>(null);

    const handlePurchase = (option: PurchaseOption) => {
        // In a real app, this would trigger a payment flow
        console.log(`Purchased ${option.amount} stardust for $${option.price}`);
        setShowConfirmation(null);
    }
    
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                Balance Management
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Manage your ʚɞ Stardust balance, view transaction history, and request refunds.
                </p>
            </div>

            {/* Current Balance & Purchase */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-2xl flex flex-col items-center justify-center text-center">
                    <p className="text-gray-400 font-semibold">Current Balance</p>
                    <p className="text-6xl font-bold text-pink-400 text-glow my-2">
                        1,250 <span className="font-serif">ʚɞ</span>
                    </p>
                </div>

                <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl">
                    <h3 className="text-2xl font-semibold mb-4 text-glow text-cyan-300">Purchase Stardust</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {purchaseOptions.map(option => (
                            <button key={option.amount} onClick={() => setShowConfirmation(option)} className="group relative p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all text-center">
                                <p className="text-xl font-bold text-white">{option.amount.toLocaleString()} <span className="font-serif text-pink-400">ʚɞ</span></p>
                                <p className="text-sm text-gray-400">${option.price}</p>
                                {option.bonus > 0 && <div className="absolute -top-2 -right-2 text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-full rotate-12">+ {option.bonus}</div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transaction History & Refund */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                    <h3 className="text-2xl font-semibold mb-4 text-glow text-white">Transaction History</h3>
                    <ul className="space-y-3">
                        {transactionHistory.map(t => (
                            <li key={t.id} className="flex justify-between items-center text-sm p-2 bg-black/20 rounded-md">
                                <div>
                                    <p className="font-semibold text-gray-200">{t.description}</p>
                                    <p className="text-xs text-gray-500">{t.date}</p>
                                </div>
                                <p className={`font-bold ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{t.amount.toLocaleString()} ʚɞ</p>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-2xl">
                    <h3 className="text-2xl font-semibold mb-4 text-glow text-red-300">Need Help?</h3>
                    <p className="text-gray-300 mb-4">If you've encountered an issue with a purchase or gift, you can request a refund for review.</p>
                    <NeonButton color="red" onClick={() => setIsRefundPanelOpen(true)}>Request Refund</NeonButton>
                </div>
            </div>
            
            <RefundPanel isOpen={isRefundPanelOpen} onClose={() => setIsRefundPanelOpen(false)} />

            {showConfirmation && (
                <ConfirmationModal 
                    isOpen={!!showConfirmation}
                    onClose={() => setShowConfirmation(null)}
                    onConfirm={() => handlePurchase(showConfirmation)}
                    title="Confirm Purchase"
                    confirmText="Confirm"
                    color="cyan"
                >
                    <p className="text-center text-gray-300">Are you sure you want to purchase <span className="font-bold text-white">{showConfirmation.amount.toLocaleString()} ʚɞ</span> for <span className="font-bold text-white">${showConfirmation.price}</span>?</p>
                </ConfirmationModal>
            )}

        </div>
    );
};

export default BalanceManagementContent;
