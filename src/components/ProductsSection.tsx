import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductsContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductFilterPanel from './filters/ProductFilterPanel';
import ActiveFilterChips from './filters/ActiveFilterChips';
import ProductGrid from './ProductGrid';
import { 
  CATEGORY_DEFINITIONS, 
  getCategoryAttributes, 
  findCategoryDefinition, 
  isProductInCategory 
} from '../data/categorySchema';
import { doesProductMatchFilters } from './filters/DynamicProductFilters';
import { SelectedFiltersState } from '../types/filter';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { toSlug } from '../utils';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
  onCompare: (product: Product) => void;
  compareList: Product[];
}

export default function ProductsSection({ 
  onAddToCart, 
  onCompare, 
  compareList 
}: ProductsSectionProps) {
  const { products, loading, refreshProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  // Read initial category and filter state from URL const initialCategoryParam = searchParams.get('category');
const initialCategoryParam = searchParams.get('category');
const matchedInitialCat = findCategoryDefinition(initialCategoryParam);

const resolveCategoryFromSlug = (slug: string | null): string | null => {
  if (!slug) return null;
  const found = products.find(p => p.category && toSlug(p.category) === slug);
  return found ? found.category : slug;
};

const [selectedCategory, setSelectedCategory] = useState<string | null>(
  matchedInitialCat ? matchedInitialCat.name : resolveCategoryFromSlug(initialCategoryParam)
);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersState>(() => {
    const initialFilters: SelectedFiltersState = {};
    const cat = findCategoryDefinition(initialCategoryParam);
    const attrs = getCategoryAttributes(cat?.id || initialCategoryParam);

    attrs.forEach(attr => {
      const paramVal = searchParams.get(attr.id);
      if (paramVal) {
        initialFilters[attr.id] = paramVal.split(',').map(s => s.trim()).filter(Boolean);
      }
    });
    return initialFilters;
  });

  const [sortBy, setSortBy] = useState<string>('default');

  // Configured attributes for the currently active category
  const activeCategoryAttributes = useMemo(() => {
    return getCategoryAttributes(selectedCategory);
  }, [selectedCategory]);

  // Synchronize URL parameters whenever selectedCategory or selectedFilters change
  const updateUrlParams = useCallback((newCategory: string | null, newFilters: SelectedFiltersState) => {
    const params = new URLSearchParams();

    if (newCategory) {
  const catDef = findCategoryDefinition(newCategory);
  params.set('category', catDef ? catDef.slug : toSlug(newCategory));
}

    Object.entries(newFilters).forEach(([attrId, values]) => {
      if (values && values.length > 0) {
        params.set(attrId, values.join(','));
      }
    });

    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Handle category change: clear invalid filters & switch schema dynamically
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    // When changing category: remove filters that are not valid for the new category
    const newCategoryAttrs = getCategoryAttributes(category);
    const validAttrIds = new Set(newCategoryAttrs.map(a => a.id));

    setSelectedFilters(prev => {
      const pruned: SelectedFiltersState = {};
      for (const attrId of Object.keys(prev)) {
        if (validAttrIds.has(attrId) && prev[attrId]) {
          pruned[attrId] = prev[attrId];
        }
      }
      updateUrlParams(category, pruned);
      return pruned;
    });
  };

  // Toggle single filter option value
  const handleFilterChange = (attributeId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[attributeId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];

      const newState: SelectedFiltersState = { ...prev };
      if (updated.length === 0) {
        delete newState[attributeId];
      } else {
        newState[attributeId] = updated;
      }

      updateUrlParams(selectedCategory, newState);
      return newState;
    });
  };

  // Clear all active filters for current view
  const handleClearAll = () => {
    const emptyFilters: SelectedFiltersState = {};
    setSelectedFilters(emptyFilters);
    updateUrlParams(selectedCategory, emptyFilters);
  };

  // 1. Filter by Category
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(p => isProductInCategory(p.category, selectedCategory));
  }, [products, selectedCategory]);

  // 2. Filter by Dynamic Facet Attributes
  const filteredProducts = useMemo(() => {
    if (Object.keys(selectedFilters).length === 0) {
      return categoryProducts;
    }

    return categoryProducts.filter(p => 
      doesProductMatchFilters(p, selectedFilters, activeCategoryAttributes)
    );
  }, [categoryProducts, selectedFilters, activeCategoryAttributes]);

  // 3. Sorting
  const displayedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <section id="products" className="py-12 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-b border-zinc-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-brand-green"></span>
              <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                {selectedCategory || 'Tất cả danh mục'}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              {t('header.products')}
            </h2>
          </div>
          
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button 
              type="button"
              onClick={() => refreshProducts()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 transition-colors disabled:opacity-60 cursor-pointer shadow-2xs"
              title="Cập nhật lại dữ liệu mới nhất từ Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-brand-green ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Làm mới dữ liệu</span>
            </button>

            <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 border border-zinc-200 rounded-lg">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <label htmlFor="sort-select" className="text-xs font-medium text-zinc-500 hidden sm:inline">
                Sắp xếp:
              </label>
              <select 
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-zinc-700 focus:outline-none cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="name-asc">Tên sản phẩm: A → Z</option>
                <option value="name-desc">Tên sản phẩm: Z → A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Product Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Reusable Filter Panel (Handles Desktop Sidebar & Mobile Modal) */}
          <ProductFilterPanel
            category={selectedCategory}
            products={products}
            currentFilteredProducts={filteredProducts}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onCategoryChange={handleCategoryChange}
            onClearAll={handleClearAll}
            categories={CATEGORY_DEFINITIONS}
          />

          {/* Product Listing Main Column */}
          <main className="flex-1 min-w-0 w-full">
            {/* Active Filter Chips */}
            <ActiveFilterChips 
              selectedFilters={selectedFilters}
              attributes={activeCategoryAttributes}
              onRemove={handleFilterChange}
              onClearAll={handleClearAll}
            />

            {/* Product Cards Grid */}
            <ProductGrid
              products={displayedProducts}
              loading={loading}
              onAddToCart={onAddToCart}
              onCompare={onCompare}
              compareList={compareList}
              onClearFilters={handleClearAll}
            />
          </main>
        </div>

      </div>
    </section>
  );
}
