import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="text-base font-bold text-neutral-900 uppercase tracking-tight">Saved Items</h2>
            <span className="text-xs font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">Your wishlist is empty</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Save basketball shoes and equipment you want to review or purchase later.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-[#f4f5f7] rounded-lg p-2 shrink-0 flex items-center justify-center border border-neutral-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {product.specs.surface || 'All Court'} · {product.specs.cut || 'Standard'}
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xs font-extrabold text-neutral-900">
                        ₹{product.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      {product.discountPercent > 0 && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="flex-1 py-1.5 px-3 bg-neutral-900 hover:bg-black text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Move to Bag
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 border border-neutral-200 rounded-lg"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
