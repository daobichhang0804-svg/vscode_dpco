import React, { useState } from 'react';
import { Heart, Repeat, Search, X, FileText, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { convertDriveUrl } from '../utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCompare: (product: Product) => void;
  isCompared: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onCompare, 
  isCompared 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare(product);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div 
        className="group relative flex flex-col justify-between bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all p-3 sm:p-4 h-full"
      >
        {/* Top: Image Section with 3 Action Buttons */}
        <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center mb-3">
          <Link 
            to={`/product/${product.id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={convertDriveUrl(product.image)}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/400x500/f4f5f7/007a3d?text=Suzuki+Latex';
              }}
              className="max-h-full max-w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Top-Right 3 Vertical Square Action Buttons */}
          <div className="absolute top-1 right-1 flex flex-col gap-1 z-10">
            {/* 1. Wishlist / Favorite Button */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#007a3d] hover:bg-[#006331] transition-colors text-white cursor-pointer shadow-2xs"
            >
              <Heart 
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isFavorite ? 'fill-white text-white' : 'text-white'
                }`} 
              />
            </button>

            {/* 2. Compare Button (Icon turns red when active) */}
            <button
              type="button"
              onClick={handleToggleCompare}
              title={isCompared ? "Bỏ so sánh" : "So sánh sản phẩm"}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#007a3d] hover:bg-[#006331] transition-colors cursor-pointer shadow-2xs"
            >
              <Repeat 
                className={`w-4 h-4 transition-colors ${
                  isCompared ? 'text-red-500 stroke-[2.5]' : 'text-white stroke-[2]'
                }`} 
              />
            </button>

            {/* 3. Quick View / Search Button */}
            <button
              type="button"
              onClick={handleOpenQuickView}
              title="Xem nhanh thông tin"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#007a3d] hover:bg-[#006331] transition-colors text-white cursor-pointer shadow-2xs"
            >
              <Search className="w-4 h-4 text-white stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Content: Title, Price & Button */}
        <div className="flex flex-col flex-1 text-left">
          <Link 
            to={`/product/${product.id}`}
            className="font-bold text-zinc-900 text-sm sm:text-base leading-snug hover:text-[#007a3d] transition-colors line-clamp-2 mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          <p className="text-[#007a3d] font-bold text-base sm:text-lg mb-3">
            Liên hệ
          </p>

          {/* Full-width "Xem chi tiết" Button */}
          <div className="mt-auto">
            <Link
              to={`/product/${product.id}`}
              className="block w-full py-2 px-4 bg-[#007a3d] hover:bg-[#006331] text-white font-bold text-sm text-center transition-colors"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>

      {/* Quick View Modal (Triggered by Search Icon) */}
      {showQuickView && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200"
          onClick={() => setShowQuickView(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white border border-zinc-200 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 p-1.5 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-1">
              {/* Image Preview */}
              <div className="aspect-square bg-zinc-50 border border-zinc-100 flex items-center justify-center p-4">
                <img
                  src={convertDriveUrl(product.image)}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Info & Specs */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#007a3d] mb-1">
                  {product.brand}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {product.name}
                </h3>
                {product.sku && (
                  <p className="text-xs text-zinc-500 font-mono mb-2">
                    Mã SKU: {product.sku}
                  </p>
                )}
                <p className="text-xl font-bold text-[#007a3d] mb-4">
                  Giá: Liên hệ
                </p>

                {/* Specs List */}
                <div className="border border-zinc-200 text-xs mb-6 overflow-hidden">
                  <div className="bg-zinc-100 px-3 py-1.5 font-bold text-zinc-700 border-b border-zinc-200">
                    Thông số kỹ thuật
                  </div>
                  <div className="divide-y divide-zinc-100 max-h-48 overflow-y-auto">
                    {Object.entries(product.specs)
                      .filter(([_, val]) => Boolean(val))
                      .map(([key, val]) => (
                        <div key={key} className="grid grid-cols-2 px-3 py-1.5">
                          <span className="font-semibold text-zinc-600 capitalize">
                            {key}:
                          </span>
                          <span className="text-zinc-800">{String(val)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      setShowQuickView(false);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-yellow hover:bg-yellow-400 text-zinc-900 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Thêm vào báo giá</span>
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setShowQuickView(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#007a3d] hover:bg-[#006331] text-white font-bold text-xs uppercase tracking-wider transition-colors text-center"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
