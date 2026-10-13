import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, MapPin, Phone, CreditCard, Banknote } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  promoCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  promoCode,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Vignesh Devadiga',
    phone: '9876543210',
    email: 'devadigavigneshn@gmail.com',
    pincode: '560001',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Flat 402, Hoops Arena Court Road, Indiranagar',
    paymentMethod: 'cod' // 'cod' | 'upi' | 'card' | 'emi'
  });

  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 999 || items.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-neutral-300" />
                <h2 className="text-base font-bold uppercase tracking-tight">Express Court Checkout</h2>
              </div>
              <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Customer Contact */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-600 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-600 block mb-1">Mobile Number (For Delivery OTP) *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 text-xs bg-neutral-100 border border-r-0 border-neutral-300 rounded-l-lg text-neutral-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  2. Delivery Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-600 block mb-1">Street Address & Landmark *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-600 block mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neutral-600 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neutral-600 block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  3. Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <div>
                      <span className="text-xs font-bold block">Cash On Delivery</span>
                      <span className="text-[10px] opacity-80">Pay at doorstep</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    <div className="w-4 h-4 font-bold text-xs">⚡</div>
                    <div>
                      <span className="text-xs font-bold block">UPI / QR Code</span>
                      <span className="text-[10px] opacity-80">GPay, PhonePe, Paytm</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <div>
                      <span className="text-xs font-bold block">Credit / Debit Card</span>
                      <span className="text-[10px] opacity-80">Visa, MasterCard, RuPay</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'emi' })}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'emi'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    <div className="w-4 h-4 font-bold text-xs">%</div>
                    <div>
                      <span className="text-xs font-bold block">No-Cost EMI</span>
                      <span className="text-[10px] opacity-80">From ₹{Math.round(total / 3)}/mo</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({items.length} items):</span>
                  <span className="font-bold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon ({promoCode}):</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Standard Court Delivery:</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-neutral-900'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total Amount Payable:</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  100% Secure Checkout
                </span>
                <span>Upto 7 Days Free Returns</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer active:scale-98"
              >
                Place Order · ₹{total.toLocaleString('en-IN')} {formData.paymentMethod === 'cod' ? '(Cash on Delivery)' : ''}
              </button>
            </form>
          </div>
        ) : (
          /* Step: Order Confirmation */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase block">Order Confirmed!</span>
              <h2 className="text-2xl font-black text-neutral-900 mt-1">Thank You, {formData.name}!</h2>
              <p className="text-xs text-neutral-600 mt-1">
                Your basketball footwear order <strong className="text-neutral-900">{orderId}</strong> has been received and is being prepared for dispatch.
              </p>
            </div>

            {/* Shipment tracker preview */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium">Estimated Delivery:</span>
                <span className="font-bold text-neutral-900">Within 3-4 Business Days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium">Payment Mode:</span>
                <span className="font-bold text-neutral-900 uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium">Deliver To:</span>
                <span className="font-semibold text-neutral-800 text-right truncate max-w-[200px]">
                  {formData.address}, {formData.city}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Back to Court Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
