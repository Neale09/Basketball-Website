import React, { useState } from 'react';
import { X, Heart, Star, Check, ShieldCheck, Truck, RotateCcw, Ruler } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string, quantity?: number) => void;
  onOpenEmi: (product: Product) => void;
  onDirectCheckout: (product: Product, color: ProductColor, size?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenEmi,
  onDirectCheckout
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const monthlyEmi = Math.round(product.discountedPrice / 3);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize || undefined, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image & Badges */}
          <div className="bg-[#f5f6f8] p-6 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-200">
            {/* Tag Badge */}
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                {product.discountPercent}% Off
              </span>
            )}

            <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
              <img
                src={selectedColor.image || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Performance Spec Summary */}
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">Court Surface</span>
                <span className="font-semibold text-neutral-800">{product.specs.surface || 'All Court'}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">Ankle Collar</span>
                <span className="font-semibold text-neutral-800">{product.specs.cut || 'Standard'}</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Kicker & Rating */}
              <div className="flex items-center justify-between mb-1.5">
                {product.tag && (
                  <span className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                    {product.tag}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-neutral-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Price & EMI */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-neutral-900">
                  ₹{product.discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.discountPercent > 0 && (
                  <span className="text-sm text-neutral-400 font-medium">
                    MRP <span className="line-through text-red-500">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  </span>
                )}
              </div>

              {/* EMI Callout */}
              <div className="mt-2 flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                <span className="text-neutral-600">EMI starts at ₹{monthlyEmi.toLocaleString('en-IN')}/mo</span>
                <button
                  onClick={() => onOpenEmi(product)}
                  className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-xs hover:bg-neutral-800 ml-auto cursor-pointer"
                >
                  Buy on EMI &gt;
                </button>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              <div className="mt-4">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wide block mb-2">
                  Select Colorway: <span className="text-neutral-600 font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                          isSelected ? 'border-black ring-2 ring-black ring-offset-2 scale-110' : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{
                          background: color.secondaryHex
                            ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                            : color.hex
                        }}
                        title={color.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                      Select Size (UK)
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      Size Guide
                    </button>
                  </div>

                  {/* Size Guide Info Dropdown */}
                  {showSizeGuide && (
                    <div className="p-3 mb-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-700 space-y-1 border border-neutral-300">
                      <p className="font-bold text-neutral-900">Standard Basketball Footwear Sizing:</p>
                      <p>• UK 7 = US 8 = 25.5 cm | UK 8 = US 9 = 26.5 cm</p>
                      <p>• UK 9 = US 10 = 27.5 cm | UK 10 = US 11 = 28.5 cm</p>
                      <p className="text-neutral-500 italic">Recommendation: Choose your true size for snug lockdown on hardwood.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tech Specs List */}
              <div className="mt-5 pt-4 border-t border-neutral-200">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide block mb-2">
                  Key Specifications:
                </span>
                <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
                  {product.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions: Quantity & Buy Buttons */}
            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-600 hover:text-black hover:bg-neutral-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-neutral-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-600 hover:text-black hover:bg-neutral-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border border-neutral-300 hover:border-black transition-colors ${
                    isWishlisted ? 'text-red-500 border-red-500' : 'text-neutral-700'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onDirectCheckout(product, selectedColor, selectedSize || undefined);
                }}
                className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-bold border border-neutral-300 transition-colors"
              >
                Instant Buy with Cash On Delivery &gt;
              </button>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-700" />
                  Free Shipping &gt; ₹999
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
                  7-Day Easy Returns
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  100% Genuine Basketball Gear
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
