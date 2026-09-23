import React, { useMemo, useRef, useEffect } from 'react';
import { SearchSuggestion, SEARCH_SUGGESTIONS } from '../data/searchIntents';
import { useProducts } from '../contexts/ProductsContext';
import { Search, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onQueryChange: (q: string) => void;
}

export default function SearchDropdown({ query, isOpen, onClose, onQueryChange }: SearchDropdownProps) {
  const { products } = useProducts();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside the search form itself (handled by parent)
      if (ref.current && !ref.current.contains(event.target as Node) && !(event.target as Element).closest('form')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = (keyword: string) => {
    onQueryChange(keyword);
    onClose();
    navigate('/products');
  };

  const dynamicResults = useMemo(() => {
    if (!query.trim()) return { productMatches: [], intentMatches: [] };
    
    const lowerQuery = query.toLowerCase();
    
    const productMatches = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      (p.sku && p.sku.toLowerCase().includes(lowerQuery))
    ).slice(0, 5);

    const intentMatches = SEARCH_SUGGESTIONS.filter(s => 
      s.keyword.toLowerCase().includes(lowerQuery)
    ).slice(0, 4);

    return { productMatches, intentMatches };
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-zinc-100 overflow-hidden z-50 transition-all duration-200">
      {query.trim() ? (
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Kết quả tìm kiếm cho "{query}"</h4>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600"><X className="w-4 h-4" /></button>
          </div>
          
          {dynamicResults.productMatches.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-brand-green mb-2 px-2 bg-brand-green/5 py-1 rounded">Sản phẩm cụ thể</h5>
              <div className="space-y-1">
                {dynamicResults.productMatches.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.name)}
                    className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-50 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-900 group-hover:text-brand-green transition-colors">{p.name}</div>
                      <div className="text-xs text-zinc-500">{p.category} • {p.brand}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-brand-green transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {dynamicResults.intentMatches.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-brand-green mb-2 px-2 bg-brand-green/5 py-1 rounded">Từ khóa gợi ý</h5>
              <div className="space-y-1">
                {dynamicResults.intentMatches.map(s => (
                  <button
                    key={s.keyword}
                    onClick={() => handleSelect(s.keyword)}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-zinc-50 transition-colors group"
                  >
                    <Search className="w-4 h-4 text-zinc-400 mr-2 group-hover:text-brand-green transition-colors" />
                    <span className="text-sm text-zinc-700 group-hover:text-brand-green transition-colors">{s.keyword}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {dynamicResults.productMatches.length === 0 && dynamicResults.intentMatches.length === 0 && (
            <div className="py-6 text-center text-sm text-zinc-500">
              Không tìm thấy kết quả nào phù hợp.
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Group 1: Popular */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-100 pb-2">Sản phẩm phổ biến</h4>
              <ul className="space-y-3">
                {SEARCH_SUGGESTIONS.filter(s => s.category === 'Sản phẩm phổ biến').slice(0, 5).map(s => (
                  <li key={s.keyword}>
                    <button 
                      onClick={() => handleSelect(s.keyword)}
                      className="text-sm text-zinc-700 hover:text-brand-green transition-colors text-left flex items-start group"
                    >
                      <Search className="w-3.5 h-3.5 mr-2 mt-0.5 text-zinc-300 group-hover:text-brand-green transition-colors flex-shrink-0" />
                      {s.keyword}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group 2: Technical */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-100 pb-2">Theo yêu cầu kỹ thuật</h4>
              <ul className="space-y-3">
                {SEARCH_SUGGESTIONS.filter(s => s.category === 'Theo yêu cầu kỹ thuật').slice(0, 5).map(s => (
                  <li key={s.keyword}>
                    <button 
                      onClick={() => handleSelect(s.keyword)}
                      className="text-sm text-zinc-700 hover:text-brand-green transition-colors text-left flex items-start group"
                    >
                      <Search className="w-3.5 h-3.5 mr-2 mt-0.5 text-zinc-300 group-hover:text-brand-green transition-colors flex-shrink-0" />
                      {s.keyword}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group 3: Application */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-100 pb-2">Theo nhu cầu & Mua sắm</h4>
              <ul className="space-y-3">
                {SEARCH_SUGGESTIONS.filter(s => s.category === 'Theo nhu cầu' || s.category === 'Tìm kiếm thương mại').slice(0, 5).map(s => (
                  <li key={s.keyword}>
                    <button 
                      onClick={() => handleSelect(s.keyword)}
                      className="text-sm text-zinc-700 hover:text-brand-green transition-colors text-left flex items-start group"
                    >
                      <Search className="w-3.5 h-3.5 mr-2 mt-0.5 text-zinc-300 group-hover:text-brand-green transition-colors flex-shrink-0" />
                      {s.keyword}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
