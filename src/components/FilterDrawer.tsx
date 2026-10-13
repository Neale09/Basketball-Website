import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { FilterState, CategoryType } from '../types';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults
}) => {
  if (!isOpen) return null;

  const CUT_OPTIONS = ['Low-Top', 'Mid-Top', 'High-Top'];
  const SURFACE_OPTIONS = ['Indoor Hardwood', 'Outdoor Concrete', 'All-Court'];
  const SIZE_OPTIONS = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

  const toggleArrayItem = (list: string[], item: string): string[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">Court Filters</h2>
            <span className="text-xs text-neutral-500 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full">
              {totalResults} items
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Category Quick Filter */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Product Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'footwear', label: 'Basketball Shoes' },
                { id: 'balls', label: 'Court Basketballs' },
                { id: 'accessories', label: 'Ankle & Accessories' },
                { id: 'apparel', label: 'Jerseys & Apparel' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onUpdateFilters({ category: c.id as CategoryType })}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors border ${
                    filters.category === c.id
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footwear Cut Height */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Shoe Cut / Collar Height</h3>
            <div className="flex flex-wrap gap-2">
              {CUT_OPTIONS.map((cut) => {
                const active = filters.cut.includes(cut);
                return (
                  <button
                    key={cut}
                    onClick={() => onUpdateFilters({ cut: toggleArrayItem(filters.cut, cut) })}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                      active
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {cut}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Playing Surface Suitability */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Court Playing Surface</h3>
            <div className="space-y-2">
              {SURFACE_OPTIONS.map((surface) => {
                const active = filters.surface.includes(surface);
                return (
                  <label
                    key={surface}
                    onClick={() => onUpdateFilters({ surface: toggleArrayItem(filters.surface, surface) })}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs font-semibold text-neutral-800"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        active ? 'bg-black border-black text-white' : 'border-neutral-400 bg-white'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{surface}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Shoe Sizes */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Shoe Size (UK)</h3>
            <div className="grid grid-cols-4 gap-2">
              {SIZE_OPTIONS.map((size) => {
                const active = filters.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => onUpdateFilters({ sizes: toggleArrayItem(filters.sizes, size) })}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      active
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Price Range</h3>
              <span className="text-xs font-extrabold text-neutral-900">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="7000"
              step="250"
              value={filters.priceRange[1]}
              onChange={(e) => onUpdateFilters({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>₹500</span>
              <span>₹7,000</span>
            </div>
          </div>

          {/* Deals & Discounts */}
          <div>
            <label
              onClick={() => onUpdateFilters({ onlyDiscounted: !filters.onlyDiscounted })}
              className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Sale & Discounted Only</span>
                <span className="text-[11px] text-neutral-500">Show items with active promotional discounts</span>
              </div>
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  filters.onlyDiscounted ? 'bg-black border-black text-white' : 'border-neutral-300'
                }`}
              >
                {filters.onlyDiscounted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center gap-3">
          <button
            onClick={onResetFilters}
            className="flex-1 py-2.5 px-4 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-700 hover:bg-white transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-2 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Apply Filters ({totalResults})
          </button>
        </div>
      </div>
    </div>
  );
};
