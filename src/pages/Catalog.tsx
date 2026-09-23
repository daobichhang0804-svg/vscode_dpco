import { useOutletContext } from 'react-router-dom';
import ProductsSection from '../components/ProductsSection';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export default function Catalog() {
  const { handleAddToCart, handleCompare, compareList } = useOutletContext<any>();
  const { t } = useLanguage();

  return (
    <div className="bg-transparent">
      <div className="py-12 px-6 lg:px-8 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Products / Catalog</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight">{t('catalog.title')}</h1>
          </div>
          <div className="text-sm text-zinc-500 max-w-md">
            {t('catalog.desc')}
          </div>
        </div>
      </div>
      <ProductsSection 
        onAddToCart={handleAddToCart}
        onCompare={handleCompare}
        compareList={compareList}
      />
    </div>
  );
}
