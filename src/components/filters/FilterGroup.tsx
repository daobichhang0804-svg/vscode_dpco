import React, { useState, useMemo } from 'react';
import { CategoryAttribute, FilterOptionData } from '../../types/filter';
import FilterOption from './FilterOption';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FilterGroupProps {
  key?: React.Key;
  attribute: CategoryAttribute;
  options: FilterOptionData[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
}

export default function FilterGroup({
  attribute,
  options,
  selectedValues,
  onToggle,
  defaultOpen = true
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCount = selectedValues.length;

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(q) || 
      opt.value.toLowerCase().includes(q)
    );
  }, [options, searchQuery]);

  if (options.length === 0) return null;

  return (
    <div className="border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-50 hover:bg-zinc-100/80 px-4 py-3 text-left flex justify-between items-center transition-colors border-b border-zinc-200/80"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs uppercase tracking-wider text-zinc-800">
            {attribute.label}
          </span>
          {attribute.unit && (
            <span className="text-[10px] text-zinc-400 font-normal lowercase">
              ({attribute.unit})
            </span>
          )}
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-brand-green text-white">
              {activeCount}
            </span>
          )}
        </div>
        <span className="text-zinc-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="p-3">
          {/* Quick inline search for groups with many options */}
          {options.length > 7 && (
            <div className="relative mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Tìm ${attribute.label.toLowerCase()}...`}
                className="w-full text-xs pl-7 pr-2 py-1.5 border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2 top-2" />
            </div>
          )}

          <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <FilterOption
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  count={opt.count}
                  disabled={opt.disabled}
                  selected={opt.selected}
                  type={attribute.type === 'single-select' ? 'radio' : 'checkbox'}
                  onToggle={onToggle}
                />
              ))
            ) : (
              <p className="text-xs text-zinc-400 py-2 text-center">Không có tùy chọn khớp</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
