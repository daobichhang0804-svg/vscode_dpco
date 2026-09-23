import React, { useState } from 'react';
import { Filter, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import DynamicProductFilters from './DynamicProductFilters';
import { Product } from '../../types';
import { CategoryDefinition, SelectedFiltersState } from '../../types/filter';

interface ProductFilterPanelProps {
  category: string | null;
  products: Product[];
  currentFilteredProducts: Product[];
  selectedFilters: SelectedFiltersState;
  onFilterChange: (attributeId: string, value: string) => void;
  onCategoryChange: (category: string | null) => void;
  onClearAll: () => void;
  categories?: CategoryDefinition[];
}

export default function ProductFilterPanel({
  category,
  products,
  currentFilteredProducts,
  selectedFilters,
  onFilterChange,
  onCategoryChange,
  onClearAll,
  categories
}: ProductFilterPanelProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (acc, curr) => acc + (curr ? curr.length : 0), 
    0
  );

  return (
    <>
      {/* Mobile / Tablet Drawer Trigger Button */}
      <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-zinc-300 rounded-lg text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
          id="mobile-filter-button"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-green" />
          <span>Bộ lọc thông số kỹ thuật</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-brand-green text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="p-2.5 bg-white border border-zinc-300 rounded-lg text-zinc-500 hover:text-red-600 transition-colors"
            title="Xóa tất cả bộ lọc"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-green" />
              <h2 className="font-bold text-sm text-zinc-900 uppercase tracking-wide">
                Bộ lọc sản phẩm
              </h2>
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-zinc-500 hover:text-red-600 transition-colors"
              >
                Đặt lại ({activeFiltersCount})
              </button>
            )}
          </div>

          <DynamicProductFilters
            category={category}
            products={products}
            currentFilteredProducts={currentFilteredProducts}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onCategoryChange={onCategoryChange}
            onClearAll={onClearAll}
            categories={categories}
          />
        </div>
      </aside>

      {/* Mobile Drawer Modal */}
      {mobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-green" />
                <h3 className="font-semibold text-sm uppercase tracking-wide">Bộ lọc thông số</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <DynamicProductFilters
                category={category}
                products={products}
                currentFilteredProducts={currentFilteredProducts}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
                onCategoryChange={onCategoryChange}
                onClearAll={onClearAll}
                categories={categories}
              />
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex gap-3">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="flex-1 py-2.5 px-3 border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors"
                >
                  Xóa lọc ({activeFiltersCount})
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 px-4 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-sm font-bold shadow-sm transition-colors text-center"
              >
                Xem {currentFilteredProducts.length} kết quả
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
