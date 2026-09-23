import React from 'react';
import { X } from 'lucide-react';
import { CategoryAttribute, SelectedFiltersState } from '../../types/filter';

interface ActiveFilterChipsProps {
  selectedFilters: SelectedFiltersState;
  attributes: CategoryAttribute[];
  onRemove: (attributeId: string, value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({ 
  selectedFilters, 
  attributes, 
  onRemove, 
  onClearAll 
}: ActiveFilterChipsProps) {
  const activeEntries = Object.entries(selectedFilters).filter(([_, values]) => values && values.length > 0);
  const totalActiveCount = activeEntries.reduce((acc, [_, vals]) => acc + vals.length, 0);

  if (totalActiveCount === 0) return null;

  const getAttributeLabel = (attrId: string): string => {
    const attr = attributes.find(a => a.id === attrId);
    return attr ? attr.label : attrId;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1">
        Đang lọc:
      </span>

      {activeEntries.map(([attrId, values]) => {
        const attrLabel = getAttributeLabel(attrId);

        return values.map(val => (
          <span 
            key={`${attrId}-${val}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-xs font-medium text-zinc-800 border border-zinc-200 shadow-xs group"
          >
            <span className="text-zinc-400 font-normal">{attrLabel}:</span>
            <span className="text-brand-green font-semibold">{val}</span>
            <button
              type="button"
              onClick={() => onRemove(attrId, val)}
              className="ml-1 p-0.5 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none"
              aria-label={`Xóa bộ lọc ${attrLabel} ${val}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ));
      })}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline ml-auto pl-2 transition-colors cursor-pointer"
      >
        Xóa tất cả ({totalActiveCount})
      </button>
    </div>
  );
}
