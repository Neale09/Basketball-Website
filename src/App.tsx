import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { FilterDrawer } from './components/FilterDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { EmiModal } from './components/EmiModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrustBanner } from './components/TrustBanner';
import { Footer } from './components/Footer';
import { SupportWidget } from './components/SupportWidget';

import { BASKETBALL_PRODUCTS } from './data/products';
import { Product, ProductColor, CartItem, FilterState, CategoryType } from './types';
import { X, Sparkles, Filter } from 'lucide-react';

export default function App() {
  // Navigation & Filter state
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    cut: [],
    surface: [],
    sizes: [],
    priceRange: [500, 7000],
    onlyDiscounted: false,
    sortBy: 'featured'
  });

  // Drawers and Modals
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [emiProduct, setEmiProduct] = useState<Product | null>(null);

  // Cart & Wishlist state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aerocourt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aerocourt_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aerocourt_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aerocourt_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Synchronize category selection with filter state
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    setFilters((prev) => ({
      ...prev,
      category
    }));
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    color?: ProductColor,
    size?: string,
    quantity: number = 1
  ) => {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || (product.sizes ? product.sizes[0] : undefined);
    const itemKey = `${product.id}-${selectedColor.name}-${selectedSize || 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity
        }
      ];
    });

    showToast(`Added ${product.name} to your Court Bag!`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to Wishlist!`);
    }
  };

  const handleProceedWithEmi = (product: Product, months: number, monthlyAmount: number) => {
    handleAddToCart(product);
    setIsCartOpen(true);
    showToast(`EMI plan for ${months} months (₹${monthlyAmount}/mo) selected.`);
  };

  const handleDirectCheckout = (product: Product, color: ProductColor, size?: string) => {
    handleAddToCart(product, color, size, 1);
    setIsCheckoutOpen(true);
  };

  // Active filter count computation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count += 1;
    if (filters.cut.length > 0) count += filters.cut.length;
    if (filters.surface.length > 0) count += filters.surface.length;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (filters.onlyDiscounted) count += 1;
    if (filters.priceRange[1] < 7000) count += 1;
    return count;
  }, [filters]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return BASKETBALL_PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'all') {
        if (filters.category === 'new') {
          if (!product.isNew) return false;
        } else if (filters.category === 'sale') {
          if (product.discountPercent <= 0) return false;
        } else {
          if (product.category !== filters.category) return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSurface = product.specs.surface?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesSurface) {
          return false;
        }
      }

      // Cut type filter
      if (filters.cut.length > 0) {
        if (!product.specs.cut || !filters.cut.includes(product.specs.cut)) {
          return false;
        }
      }

      // Surface filter
      if (filters.surface.length > 0) {
        if (!product.specs.surface || !filters.surface.includes(product.specs.surface)) {
          return false;
        }
      }

      // Size filter
      if (filters.sizes.length > 0) {
        if (!product.sizes || !product.sizes.some((s) => filters.sizes.includes(s))) {
          return false;
        }
      }

      // Discounted only
      if (filters.onlyDiscounted && product.discountPercent <= 0) {
        return false;
      }

      // Price range
      if (
        product.discountedPrice < filters.priceRange[0] ||
        product.discountedPrice > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') {
        return a.discountedPrice - b.discountedPrice;
      }
      if (filters.sortBy === 'price-high') {
        return b.discountedPrice - a.discountedPrice;
      }
      if (filters.sortBy === 'discount-high') {
        return b.discountPercent - a.discountPercent;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0; // featured default
    });
  }, [filters, searchQuery]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setFilters({
      category: 'all',
      searchQuery: '',
      cut: [],
      surface: [],
      sizes: [],
      priceRange: [500, 7000],
      onlyDiscounted: false,
      sortBy: 'featured'
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Top Filter & Sort Bar */}
      <FilterBar
        onToggleFilters={() => setIsFilterDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
        sortBy={filters.sortBy}
        onSortChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
        totalProducts={filteredProducts.length}
      />

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-500 font-semibold">Active:</span>
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-full font-semibold text-neutral-800">
              Category: {filters.category}
              <button onClick={() => handleCategoryChange('all')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.cut.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-full font-semibold text-neutral-800">
              {c}
              <button
                onClick={() => setFilters((p) => ({ ...p, cut: p.cut.filter((x) => x !== c) }))}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.surface.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-full font-semibold text-neutral-800">
              {s}
              <button
                onClick={() => setFilters((p) => ({ ...p, surface: p.surface.filter((x) => x !== s) }))}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.sizes.map((sz) => (
            <span key={sz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-full font-semibold text-neutral-800">
              Size: {sz}
              <button
                onClick={() => setFilters((p) => ({ ...p, sizes: p.sizes.filter((x) => x !== sz) }))}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.onlyDiscounted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-full font-semibold text-neutral-800">
              On Sale
              <button onClick={() => setFilters((p) => ({ ...p, onlyDiscounted: false }))} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-neutral-500 hover:text-black font-semibold underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Product Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-2xl">
              🏀
            </div>
            <h2 className="text-lg font-bold text-neutral-900">No court items match your filter criteria</h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
              Try adjusting your price range, playing surface, or shoe cut preferences to find more basketball gear.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
                onOpenEmi={setEmiProduct}
                onAddToCart={(prod, col, sz) => handleAddToCart(prod, col, sz, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Trust Features Strip matching Screenshot 2 */}
      <TrustBanner />

      {/* Dark Athletic Footer matching Screenshot 2 */}
      <Footer />

      {/* Floating Support & Sizing Widget */}
      <SupportWidget />

      {/* Modals & Slide-out Drawers */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onUpdateFilters={(newVals) => setFilters((prev) => ({ ...prev, ...newVals }))}
        onResetFilters={resetAllFilters}
        totalResults={filteredProducts.length}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenEmi={(prod) => {
          setQuickViewProduct(null);
          setEmiProduct(prod);
        }}
        onDirectCheckout={handleDirectCheckout}
      />

      <EmiModal
        product={emiProduct}
        isOpen={!!emiProduct}
        onClose={() => setEmiProduct(null)}
        onProceedWithEmi={handleProceedWithEmi}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={(discount, code) => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(prod) => handleToggleWishlist(prod)}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={0}
        promoCode=""
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
