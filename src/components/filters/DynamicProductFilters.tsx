import React, { useMemo } from 'react';
import { Product } from '../../types';
import { 
  CategoryAttribute, 
  CategoryDefinition, 
  FilterOptionData, 
  SelectedFiltersState 
} from '../../types/filter';
import { 
  CATEGORY_DEFINITIONS, 
  getCategoryAttributes, 
  findCategoryDefinition, 
  isProductInCategory 
} from '../../data/categorySchema';
import FilterGroup from './FilterGroup';

interface DynamicProductFiltersProps {
  category: string | null;
  products: Product[];
  currentFilteredProducts: Product[];
  selectedFilters: SelectedFiltersState;
  onFilterChange: (attributeId: string, value: string) => void;
  onCategoryChange: (category: string | null) => void;
  onClearAll?: () => void;
  categories?: CategoryDefinition[];
}

/**
 * Normalizes and checks if a product matches a specific attribute value.
 */
export function doesProductMatchAttributeValue(
  product: Product, 
  attr: CategoryAttribute, 
  targetValue: string
): boolean {
  const targetLower = targetValue.toLowerCase().trim();
  const rawValue = attr.isSpec 
    ? (product.specs as any)?.[attr.id] 
    : (product as any)?.[attr.id];

  if (!rawValue) return false;

  const rawLower = String(rawValue).toLowerCase().trim();

  // 1. Direct match
  if (rawLower === targetLower) return true;

  // 2. Comma, pipe or dash separated values (e.g. 'S - M - L' or 'Cut | Roll')
  if (rawLower.includes('|') || rawLower.includes(' - ') || rawLower.includes(',')) {
    const parts = rawLower.split(/[|\-,]/).map(s => s.trim()).filter(Boolean);
    if (parts.some(p => p === targetLower || p.startsWith(targetLower) || targetLower.startsWith(p))) {
      return true;
    }
  }

  // 3. Substring/prefix token match (e.g. 'S' matching 'S – 15mm')
  if (rawLower.startsWith(targetLower) || targetLower.startsWith(rawLower)) {
    return true;
  }

  return false;
}

/**
 * Evaluates whether a product matches a given set of active filter criteria.
 * Filters across different attributes use AND logic.
 * Multiple values within the same attribute use OR logic.
 */
export function doesProductMatchFilters(
  product: Product, 
  filters: SelectedFiltersState, 
  attributes: CategoryAttribute[],
  skipAttributeId?: string
): boolean {
  for (const [attrId, selectedValues] of Object.entries(filters)) {
    if (skipAttributeId && attrId === skipAttributeId) continue;
    if (!selectedValues || selectedValues.length === 0) continue;

    const attr = attributes.find(a => a.id === attrId);
    if (!attr) continue;

    // OR logic within same attribute
    const matchesAny = selectedValues.some(val => 
      doesProductMatchAttributeValue(product, attr, val)
    );

    if (!matchesAny) return false;
  }

  return true;
}

export default function DynamicProductFilters({
  category,
  products,
  currentFilteredProducts,
  selectedFilters,
  onFilterChange,
  onCategoryChange,
  onClearAll,
  categories = CATEGORY_DEFINITIONS
}: DynamicProductFiltersProps) {

  // Current category definition
  const currentCategoryDef = useMemo(() => {
    return findCategoryDefinition(category);
  }, [category]);

  // Schema-defined attributes for this specific category
  const categoryAttributes = useMemo(() => {
    return getCategoryAttributes(category);
  }, [category]);

  // Products belonging strictly to the current category
  const categoryBaseProducts = useMemo(() => {
    if (!category) return products;
    return products.filter(p => isProductInCategory(p.category, category));
  }, [products, category]);

  /**
   * Faceted search computation:
   * For each attribute configured for the category, calculate available options and counts.
   * Options that yield 0 results when combined with other active filters are marked disabled.
   */
  const attributeOptionsMap = useMemo(() => {
    const map = new Map<string, FilterOptionData[]>();

    categoryAttributes.forEach(attr => {
      // 1. Gather all unique candidate values for this attribute
      const candidateSet = new Set<string>();

      // Prefer predefined schema options if present
      if (attr.options && attr.options.length > 0) {
        attr.options.forEach(opt => candidateSet.add(opt));
      }

      // Also harvest any values present in the actual products of this category
      categoryBaseProducts.forEach(p => {
        const raw = attr.isSpec ? (p.specs as any)?.[attr.id] : (p as any)?.[attr.id];
        if (raw) {
          if (typeof raw === 'string' && (raw.includes('|') || raw.includes(' - ') || raw.includes(','))) {
            raw.split(/[|\-,]/).map(s => s.trim()).filter(Boolean).forEach(part => candidateSet.add(part));
          } else {
            candidateSet.add(String(raw).trim());
          }
        }
      });

      const candidateValues = Array.from(candidateSet);
      if (candidateValues.length === 0) return;

      // 2. Filter products by all OTHER selected attributes (faceting rule)
      const subsetForFacet = categoryBaseProducts.filter(p => 
        doesProductMatchFilters(p, selectedFilters, categoryAttributes, attr.id)
      );

      // 3. Compute count for each candidate value
      const optionsData: FilterOptionData[] = candidateValues.map(val => {
        let count = 0;
        subsetForFacet.forEach(p => {
          if (doesProductMatchAttributeValue(p, attr, val)) {
            count++;
          }
        });

        const selected = (selectedFilters[attr.id] || []).includes(val);
        const disabled = count === 0 && !selected;

        return {
          value: val,
          label: val,
          count,
          disabled,
          selected
        };
      });

      // Sort: available options first, then preserve schema order or alphabetical
      optionsData.sort((a, b) => {
        if (a.disabled !== b.disabled) return a.disabled ? 1 : -1;
        if (attr.options) {
          const indexA = attr.options.indexOf(a.value);
          const indexB = attr.options.indexOf(b.value);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        }
        return a.label.localeCompare(b.label);
      });

      map.set(attr.id, optionsData);
    });

    return map;
  }, [categoryAttributes, categoryBaseProducts, selectedFilters]);

  return (
    <div className="flex flex-col gap-5" id="dynamic-product-filters">
      {/* Category Selection Block */}
      <div className="border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="bg-brand-green text-white font-bold py-2.5 px-4 text-xs uppercase tracking-wider flex justify-between items-center">
          <span>Danh mục sản phẩm</span>
          <span className="text-[11px] font-normal opacity-80">
            {categoryBaseProducts.length} SP
          </span>
        </div>
        
        <div className="p-3 space-y-1.5">
          {/* All categories option */}
          <label 
            className={`flex items-center justify-between py-1.5 px-2.5 rounded transition-colors cursor-pointer select-none ${
              category === null ? 'bg-emerald-50 text-brand-green font-semibold' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <input
                type="radio"
                name="product-category"
                checked={category === null}
                onChange={() => onCategoryChange(null)}
                className="h-4 w-4 border-zinc-300 text-brand-green focus:ring-brand-green cursor-pointer"
              />
              <span className="text-sm">Tất cả sản phẩm</span>
            </div>
            <span className="text-xs text-zinc-400 tabular-nums">({products.length})</span>
          </label>

          {/* Defined Categories */}
          {categories.map(cat => {
            const isSelected = currentCategoryDef?.id === cat.id || 
              (category && isProductInCategory(category, cat.id));
            const catCount = products.filter(p => isProductInCategory(p.category, cat.id)).length;

            return (
              <label 
                key={cat.id} 
                className={`flex items-center justify-between py-1.5 px-2.5 rounded transition-colors cursor-pointer select-none ${
                  isSelected ? 'bg-emerald-50 text-brand-green font-semibold' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                  <input
                    type="radio"
                    name="product-category"
                      checked={!!isSelected}
                    onChange={() => onCategoryChange(cat.name)}
                    className="h-4 w-4 border-zinc-300 text-brand-green focus:ring-brand-green cursor-pointer"
                  />
                  <span className="text-sm truncate">{cat.name}</span>
                </div>
                <span className="text-xs text-zinc-400 tabular-nums">({catCount})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Dynamic Category-Specific Filter Groups */}
      {categoryAttributes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {categoryAttributes.map(attr => {
            const options = attributeOptionsMap.get(attr.id) || [];
            if (options.length === 0) return null;

            return (
              <FilterGroup
                key={attr.id}
                attribute={attr}
                options={options}
                selectedValues={selectedFilters[attr.id] || []}
                onToggle={(val) => onFilterChange(attr.id, val)}
              />
            );
          })}
        </div>
      ) : category ? (
        <div className="p-4 bg-zinc-50 rounded-lg border border-dashed border-zinc-200 text-center">
          <p className="text-xs text-zinc-500">
            Danh mục này chưa cấu hình thuộc tính kỹ thuật.
          </p>
        </div>
    ) : null}
  </div>
  );
}
