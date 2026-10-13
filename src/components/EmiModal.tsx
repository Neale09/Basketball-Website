import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface EmiModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedWithEmi: (product: Product, months: number, monthlyAmount: number) => void;
}

export const EmiModal: React.FC<EmiModalProps> = ({
  product,
  isOpen,
  onClose,
  onProceedWithEmi
}) => {
  if (!isOpen || !product) return null;

  const [selectedTenure, setSelectedTenure] = useState<number>(3);
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');

  const price = product.discountedPrice;

  const calculateEmi = (months: number) => {
    // 3 and 6 months are 0% No Cost EMI, 9 and 12 months have slight interest
    if (months === 3 || months === 6) {
      return Math.round(price / months);
    }
    const annualRate = 0.14; // 14% p.a.
    const monthlyRate = annualRate / 12;
    const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emiPlans = [
    { months: 3, isNoCost: true, monthly: calculateEmi(3) },
    { months: 6, isNoCost: true, monthly: calculateEmi(6) },
    { months: 9, isNoCost: false, monthly: calculateEmi(9) },
    { months: 12, isNoCost: false, monthly: calculateEmi(12) }
  ];

  const currentPlan = emiPlans.find((p) => p.months === selectedTenure) || emiPlans[0];

  const banks = [
    'HDFC Bank Credit & Debit',
    'ICICI Bank Cardless & Credit',
    'SBI Cards',
    'Axis Bank',
    'Bajaj Finserv EMI Card',
    'Kotak Mahindra Bank'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-neutral-300" />
            <h2 className="text-base font-bold uppercase tracking-tight">Easy EMI Calculator & Plans</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Snapshot */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-contain bg-white rounded-lg p-1 border border-neutral-200"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 truncate">{product.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-neutral-500">Order Amount:</span>
              <span className="text-sm font-extrabold text-neutral-900">₹{price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Tenure options */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                Select Tenure Plan
              </label>
              <span className="text-[11px] font-semibold text-emerald-600">
                0% Interest on 3 & 6 Months!
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {emiPlans.map((plan) => {
                const isSelected = selectedTenure === plan.months;
                return (
                  <button
                    key={plan.months}
                    onClick={() => setSelectedTenure(plan.months)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-black bg-neutral-900 text-white shadow-md'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    {plan.isNoCost && (
                      <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${
                        isSelected ? 'bg-emerald-400 text-black' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        NO COST
                      </span>
                    )}
                    <span className="text-xs font-semibold block">{plan.months} Months</span>
                    <span className="text-base font-extrabold block mt-0.5">
                      ₹{plan.monthly.toLocaleString('en-IN')}<span className="text-[10px] font-normal">/mo</span>
                    </span>
                    <span className={`text-[10px] mt-1 block ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      Total: ₹{(plan.monthly * plan.months).toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bank Selection */}
          <div>
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide block mb-2">
              Select Your Card / Provider
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
            >
              {banks.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Summary Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Selected Plan Breakdown</span>
            </div>
            <div className="flex justify-between text-neutral-700 pt-1">
              <span>Monthly Installment:</span>
              <strong className="text-neutral-900">₹{currentPlan.monthly.toLocaleString('en-IN')} / month</strong>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>Tenure Duration:</span>
              <strong className="text-neutral-900">{currentPlan.months} Months</strong>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>Interest & Extra Fee:</span>
              <strong className={currentPlan.isNoCost ? 'text-emerald-700' : 'text-neutral-900'}>
                {currentPlan.isNoCost ? '₹0 (Zero Interest No Cost)' : '₹' + ((currentPlan.monthly * currentPlan.months) - price).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {/* Security & Verification Note */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
            <span>Instant approval via OTP. No paperwork or upfront branch visits required.</span>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-700 hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onProceedWithEmi(product, currentPlan.months, currentPlan.monthly);
            }}
            className="flex-2 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Proceed with ₹{currentPlan.monthly}/mo EMI &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
