import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  onToggleFilters: () => void;
  activeFilterCount: number;
  sortBy: FilterState['sortBy'];
  onSortChange: (sortBy: FilterState['sortBy']) => void;
  totalProducts: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onToggleFilters,
  activeFilterCount,
  sortBy,
  onSortChange,
  totalProducts
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Filters Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFilters}
            className="inline-flex items-center gap-2.5 px-4 py-2 border border-neutral-300 rounded-full text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>Filters</span>
            <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
            Showing <strong className="text-neutral-900 font-semibold">{totalProducts}</strong> court items
          </span>
        </div>

        {/* Right: Sort by Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-600 flex items-center gap-1.5">
            <span>Sort by</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
              className="appearance-none bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold rounded-full pl-4 pr-9 py-2 hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer shadow-xs"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount-high">Discount: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            {/* Custom Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
