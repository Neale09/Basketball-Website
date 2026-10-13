import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, X, ChevronRight, Menu } from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Banner Notice */}
      <div className="bg-neutral-900 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span>⚡ 100% Authentic Basketball Footwear & Gear</span>
        <span className="hidden sm:inline text-neutral-400">|</span>
        <span className="hidden sm:inline">Free Shipping On Orders Above ₹999</span>
        <span className="hidden md:inline text-neutral-400">|</span>
        <span className="hidden md:inline">Cash On Delivery Available</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo - Geometric Athletic Styling matching Nivia aesthetic */}
          <div className="flex items-center">
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              {/* Geometric Chevron Diamond Mark */}
              <div className="relative w-8 h-8 flex items-center justify-center bg-black text-white rounded-sm transform group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2L3 9L6 12L12 7.5L18 12L21 9L12 2Z" />
                  <path d="M12 22L21 15L18 12L12 16.5L6 12L3 15L12 22Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tighter text-black uppercase leading-none font-sans">
                  AEROCOURT
                </span>
                <span className="text-[9px] tracking-widest font-semibold text-neutral-500 uppercase -mt-0.5">
                  HOOPS & FOOTWEAR
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isNew = cat.id === 'new';
              const isSale = cat.id === 'sale';

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id as CategoryType);
                    onSearchChange('');
                  }}
                  className={`relative py-2 transition-colors cursor-pointer text-sm font-semibold tracking-tight ${
                    isActive ? 'text-black' : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isNew && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 rounded-sm">
                      New
                    </span>
                  )}
                  {isSale && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-sm">
                      Sale
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1.5 w-48 sm:w-64 border border-neutral-300">
                  <Search className="w-4 h-4 text-neutral-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search shoes, balls..."
                    autoFocus
                    className="w-full bg-transparent px-2 text-sm text-neutral-900 focus:outline-none placeholder:text-neutral-400"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-neutral-400 hover:text-neutral-700 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-800 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 stroke-[1.8]" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-800 hover:text-black rounded-full hover:bg-neutral-100 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="p-2 text-neutral-800 hover:text-black rounded-full hover:bg-neutral-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as CategoryType);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left ${
                activeCategory === cat.id ? 'bg-neutral-100 text-black font-bold' : 'text-neutral-700'
              }`}
            >
              <span>{cat.label}</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
