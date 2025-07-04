import React from 'react';

export const AccountSummary: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="font-medium text-orange-900 mb-2">Checking Account</h3>
                <p className="text-3xl font-bold text-orange-600">$12,345.67</p>
                <p className="text-sm text-orange-700 mt-1">Available Balance</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2">Savings Account</h3>
                <p className="text-3xl font-bold text-green-600">$25,890.12</p>
                <p className="text-sm text-green-700 mt-1">+2.1% APY</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="font-medium text-amber-900 mb-2">Credit Card</h3>
                <p className="text-3xl font-bold text-amber-600">$1,234.56</p>
                <p className="text-sm text-amber-700 mt-1">Available Credit: $8,765.44</p>
            </div>
        </div>
    );
};
