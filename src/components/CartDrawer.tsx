import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const freeDeliveryThreshold = 999;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || items.length === 0;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = isFreeDelivery ? 0 : 99;

  let promoDiscount = 0;
  if (appliedPromo === 'HOOP10') {
    promoDiscount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'DUNK200') {
    promoDiscount = Math.min(subtotal, 200);
  }

  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'HOOP10' || code === 'DUNK200') {
      setAppliedPromo(code);
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid code. Try "HOOP10" for 10% off or "DUNK200" for ₹200 off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h2 className="text-base font-bold text-neutral-900 uppercase tracking-tight">Your Court Bag</h2>
            <span className="text-xs font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full">
              {items.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200 text-xs">
          {isFreeDelivery && items.length > 0 ? (
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Truck className="w-4 h-4" />
              <span>Congratulations! You unlocked FREE Standard Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-neutral-700 font-semibold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  Add ₹{amountNeededForFree.toLocaleString('en-IN')} more for Free Delivery
                </span>
                <span>₹{freeDeliveryThreshold}</span>
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">Your bag is currently empty</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our pro basketball footwear, composite match balls, and training gear.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800"
              >
                Shop Footwear
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#f4f5f7] rounded-lg p-2 shrink-0 flex items-center justify-center border border-neutral-200">
                  <img
                    src={item.selectedColor.image || item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>{item.selectedColor.name}</span>
                      {item.selectedSize && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-neutral-700">{item.selectedSize}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-neutral-900 min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-neutral-900">
                        ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3.5">
            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter Coupon (HOOP10 / DUNK200)"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black uppercase placeholder:normal-case"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold mt-1.5 bg-emerald-50 px-2 py-1 rounded">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Coupon {appliedPromo} Applied!
                  </span>
                  <button onClick={() => setAppliedPromo(null)} className="text-neutral-500 hover:text-black underline">
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-neutral-900'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-300">
                <span>Total Amount:</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* COD Tag */}
            <div className="bg-white p-2 rounded-lg border border-neutral-200 flex items-center justify-between text-[11px] text-neutral-700">
              <span className="font-semibold">💵 Cash On Delivery Available</span>
              <span className="text-neutral-400">Zero Extra Fee</span>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onCheckout(promoDiscount, appliedPromo || '');
              }}
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
