import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenEmi: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onOpenEmi,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [imageError, setImageError] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Calculate monthly EMI (roughly 3-month split)
  const monthlyEmi = Math.round(product.discountedPrice / 3);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    onAddToCart(product, selectedColor, defaultSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl transition-all duration-300 hover:shadow-lg p-2.5 sm:p-3 relative">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl bg-[#f4f5f7] overflow-hidden flex items-center justify-center p-4">
        {/* Top-Left: Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50/90 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-blue-100 shadow-2xs">
              {product.discountPercent}% Off
            </span>
          </div>
        )}

        {/* Top-Right: Quick Actions (Eye & Wishlist) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {/* Quick View Button */}
          <button
            onClick={() => onQuickView(product)}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist(product)}
            className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer ${
              isWishlisted ? 'text-red-500 fill-red-500' : 'text-neutral-700 hover:text-red-500'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.8] ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Shoe / Product Visual */}
        <div 
          onClick={() => onQuickView(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          {!imageError ? (
            <img
              src={selectedColor.image || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-106 transition-transform duration-300 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 text-neutral-600 rounded-lg p-4">
              <span className="text-2xl mb-1">🏀</span>
              <span className="text-xs font-semibold text-center">{product.name}</span>
            </div>
          )}
        </div>

        {/* Hover Quick Add to Bag Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-neutral-900/95 hover:bg-black text-white text-xs font-bold rounded-lg shadow-md backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="pt-3 pb-1 flex flex-col flex-grow">
        {/* Sub-label kicker */}
        {product.tag && (
          <span className="text-[12px] font-semibold text-blue-600 mb-0.5">
            {product.tag}
          </span>
        )}

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-[15px] font-bold text-neutral-900 hover:text-black line-clamp-1 cursor-pointer transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 my-2">
          {product.colors.map((color, index) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                title={color.name}
                className={`w-4 h-4 rounded-full border border-neutral-300 relative transition-transform ${
                  isSelected ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110' : 'hover:scale-105'
                }`}
                style={{
                  background: color.secondaryHex
                    ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                    : color.hex
                }}
              />
            );
          })}
          {product.colors.length > 1 && (
            <span className="text-[10px] text-neutral-400 font-medium ml-1">
              +{product.colors.length}
            </span>
          )}
        </div>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-2 mt-auto">
          {product.discountPercent > 0 ? (
            <>
              <span className="text-xs text-neutral-400 font-medium">
                MRP <span className="line-through text-red-500 font-semibold">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </span>
              <span className="text-base font-extrabold text-neutral-900 tracking-tight">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
            </>
          ) : (
            <span className="text-base font-extrabold text-neutral-900 tracking-tight">
              MRP ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* EMI Line matching Screenshot 1 */}
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-neutral-600">
          <span>or ₹{monthlyEmi.toLocaleString('en-IN')}/Month</span>
          <button
            onClick={() => onOpenEmi(product)}
            className="inline-flex items-center px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Buy on EMI &gt;
          </button>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden mt-3">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-neutral-900 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5"
          >
            {addedNotice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span>{addedNotice ? 'Added' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
