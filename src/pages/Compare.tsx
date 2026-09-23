import React, { useState, useMemo } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { Search, X, Plus } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductsContext';
import { convertDriveUrl } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function Compare() {
  const { compareList, handleCompare, handleRemoveFromCompare } = useOutletContext<any>();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !compareList.find((cp: Product) => cp.id === p.id)
    ).slice(0, 5);
  }, [products, searchTerm, compareList]);

  const addProduct = (p: Product) => {
    if (compareList.length >= 4) {
      alert(t('compare.limit'));
      return;
    }
    handleCompare(p);
    setSearchTerm('');
  };

  const handleBulkQuoteRequest = () => {
    navigate('/contact', { state: { bulkQuote: compareList } });
  };

  return (
    <div className="pb-24">
      {/* HEADER PAGE */}
      <div className="py-16 px-6 lg:px-8 border-b border-zinc-200 bg-zinc-50 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t('compare.list')} {compareList.length} {t('compare.products')}</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight">{t('compare.title')}</h1>
          </div>
          <div className="w-full md:max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder={t('compare.search')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none text-sm transition-colors"
            />
            {/* Search Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 shadow-xl z-50 rounded-b max-h-64 overflow-y-auto">
                {searchResults.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => addProduct(p)}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-zinc-50 border-b border-zinc-100 last:border-0 transition-colors"
                  >
                    <img src={convertDriveUrl(p.image)} alt={p.name} className="h-10 w-10 object-cover rounded bg-zinc-100" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900">{p.name}</div>
                      <div className="text-xs text-brand-green font-medium">{p.brand}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto">
        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500 bg-zinc-50 border border-zinc-200">
            <p className="mb-4">{t('compare.empty')}</p>
            <Link to="/products" className="text-brand-green hover:underline font-medium">{t('header.products')}</Link>
          </div>
        ) : (
          <div className="border border-zinc-200 bg-white min-w-max">
            <table className="w-full text-sm">
              <tbody>
                {/* Ảnh */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 w-48 bg-zinc-50 text-left align-middle font-bold text-zinc-900">{t('product.image')}</th>
                  {compareList.map((product: Product) => (
                    <td key={product.id} className="p-4 border-b border-l border-zinc-200 w-64 align-top relative">
                      <button 
                        onClick={() => handleRemoveFromCompare(product.id)}
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors z-10"
                        title={t('common.remove')}
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <img src={convertDriveUrl(product.image)} alt={product.name} className="h-32 w-full object-cover rounded mb-3 bg-zinc-100" />
                    </td>
                  ))}
                  {compareList.length < 4 && (
                    <td className="p-4 border-b border-l border-zinc-200 w-64 align-middle text-center bg-zinc-50/50">
                      <div className="h-32 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 gap-2 p-4">
                        <Plus className="h-8 w-8" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{t('compare.add_nth')} {compareList.length + 1}...</span>
                      </div>
                    </td>
                  )}
                </tr>

                {/* Tên sản phẩm */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900">{t('product.name')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`name-${product.id}`} className="p-4 border-b border-l border-zinc-200 font-bold text-zinc-900">
                      <Link to={`/product/${product.id}`} className="hover:text-brand-green">{product.name}</Link>
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-b border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

                {/* Giá */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900">{t('product.price')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`price-${product.id}`} className="p-4 border-b border-l border-zinc-200 text-brand-green font-medium">
                      {t('product.contact')}
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-b border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

                {/* Thương hiệu */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900">{t('product.brand')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`brand-${product.id}`} className="p-4 border-b border-l border-zinc-200 text-zinc-700">
                      {product.brand}
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-b border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

                {/* Loại */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900">{t('product.category')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`cat-${product.id}`} className="p-4 border-b border-l border-zinc-200 text-zinc-700">
                      {product.category}
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-b border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

                {/* Tình trạng */}
                <tr>
                  <th className="p-4 border-b border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900">{t('product.availability')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`stock-${product.id}`} className="p-4 border-b border-l border-zinc-200 text-zinc-700">
                      {t('product.inStock')}
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-b border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

                {/* Chi tiết */}
                <tr>
                  <th className="p-4 border-zinc-200 bg-zinc-50 text-left font-bold text-zinc-900 align-top">{t('product.details')}</th>
                  {compareList.map((product: Product) => (
                    <td key={`specs-${product.id}`} className="p-4 border-l border-zinc-200 text-zinc-700 align-top">
                      <ul className="space-y-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <li key={key}>
                            <span className="font-bold text-zinc-900 block mb-1">{key}:</span>
                            <span className="text-zinc-600 block">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {compareList.length < 4 && <td className="p-4 border-l border-zinc-200 bg-zinc-50/50"></td>}
                </tr>

              </tbody>
            </table>
          </div>
        )}

        {/* BULK QUOTE ACTION */}
        {compareList.length > 0 && (
          <div className="mt-8">
            <button 
              onClick={handleBulkQuoteRequest}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-5 px-8 flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest transition-colors rounded-sm shadow-sm"
            >
              {t('compare.submit')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
