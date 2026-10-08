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

const SIZE_PREFIX = /^(xxs|xs|s|sm|m|ml|l|xl|xxl)\s*(\d)/i;

/** "l21 mm" -> "L 21mm", "L  21 mm" -> "L 21mm" */
export function normalizeValue(v: string): string {
  return v
    .replace(/\s+/g, ' ')
    .replace(/(\d)\s+(mm|cm)\b/gi, (_, d, u) => `${d}${u.toLowerCase()}`)
    .replace(SIZE_PREFIX, (_, l, d) => `${l.toUpperCase()} ${d}`)
    .trim();
}

/** Tách chuỗi gộp "S 15mm – M 18mm | L 20mm" thành từng giá trị đã chuẩn hóa */
export function splitValues(raw: unknown): string[] {
  if (raw === null || raw === undefined) return [];
  return String(raw)
    .split(/\s*\|\s*|\s*,\s+|\s*;\s*|\s+[-–—]\s+/)
    .map(normalizeValue)
    .filter(Boolean);
}

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
  const rawValue = attr.isSpec
    ? (product.specs as any)?.[attr.id]
    : (product as any)?.[attr.id];

  if (!rawValue) return false;

  const target = normalizeValue(targetValue).toLowerCase();
  return splitValues(rawValue).some(p => p.toLowerCase() === target);
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
            // 1. Gom giá trị duy nhất (đã tách + chuẩn hóa + bỏ trùng không phân biệt hoa thường)
      const normalizedOptions = (attr.options || []).flatMap(o => splitValues(o));
      const candidateMap = new Map<string, string>();
      const addCandidate = (v: unknown) =>
        splitValues(v).forEach(part => {
          const key = part.toLowerCase();
          if (!candidateMap.has(key)) candidateMap.set(key, part);
        });

      (attr.options || []).forEach(addCandidate);
      categoryBaseProducts.forEach(p =>
        addCandidate(attr.isSpec ? (p.specs as any)?.[attr.id] : (p as any)?.[attr.id])
      );

      const candidateValues = Array.from(candidateMap.values());
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
        const indexA = normalizedOptions.indexOf(a.value);
        const indexB = normalizedOptions.indexOf(b.value);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        return a.label.localeCompare(b.label, 'vi', { numeric: true });
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
