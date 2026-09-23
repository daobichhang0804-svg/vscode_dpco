import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart: (product: Product) => void;
  onCompare: (product: Product) => void;
  compareList: Product[];
  onClearFilters?: () => void;
}

export default function ProductGrid({
  products,
  loading = false,
  onAddToCart,
  onCompare,
  compareList,
  onClearFilters
}: ProductGridProps) {

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="bg-zinc-100 animate-pulse rounded-lg h-96 flex flex-col justify-end p-4 border border-zinc-200">
            <div className="h-4 bg-zinc-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-12 text-center my-6">
        <PackageOpen className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-zinc-800 mb-1">
          Không tìm thấy sản phẩm phù hợp
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
          Không có sản phẩm nào thỏa mãn tất cả các thông số kỹ thuật bạn đã chọn. Hãy thử bỏ chọn một số tiêu chí hoặc làm mới bộ lọc.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white text-sm font-semibold rounded-lg hover:bg-brand-green-dark transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Xóa tất cả bộ lọc</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      id="product-grid"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onCompare={onCompare}
          isCompared={compareList.some((p) => p.id === product.id)}
        />
      ))}
    </div>
  );
}
