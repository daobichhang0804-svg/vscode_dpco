import React from 'react';
import { Product } from '../../types';
import { ExternalLink, ArrowLeftRight, FileText, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatProductCardProps {
  key?: React.Key;
  product: Product;
  onOpenQuote?: (product: Product) => void;
  onCompare?: (product: Product) => void;
  isInCompare?: boolean;
}

const ChatProductCard: React.FC<ChatProductCardProps> = ({
  product,
  onOpenQuote,
  onCompare,
  isInCompare = false
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white border border-zinc-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left">
      <div>
        <div className="relative w-full h-32 bg-zinc-50 rounded overflow-hidden mb-2.5 flex items-center justify-center border border-zinc-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/300x200/f4f5f7/007a3d?text=${encodeURIComponent(product.name || 'DPCO')}`;
            }}
          />
          {product.brand && (
            <span className="absolute top-1.5 left-1.5 bg-zinc-900/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              {product.brand}
            </span>
          )}
        </div>

        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
          SKU: {product.sku}
        </div>
        <h4
          onClick={handleView}
          className="text-xs font-bold text-zinc-900 line-clamp-2 hover:text-brand-green cursor-pointer mb-2 leading-snug"
          title={product.name}
        >
          {product.name}
        </h4>

        {/* Technical specs pill summary */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs?.size && (
            <span className="text-[10px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded">
              Size: {product.specs.size}
            </span>
          )}
          {product.specs?.color && (
            <span className="text-[10px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded">
              Màu: {product.specs.color}
            </span>
          )}
          {product.specs?.powder && (
            <span className="text-[10px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded">
              {product.specs.powder}
            </span>
          )}
          {product.specs?.static && (
            <span className="text-[10px] bg-green-50 text-green-700 font-medium px-1.5 py-0.5 rounded border border-green-200">
              ESD
            </span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-100 flex flex-col gap-1.5">
        <div className="flex gap-1.5">
          <button
            onClick={handleView}
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-semibold py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-colors"
          >
            <span>Chi tiết</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          {onCompare && (
            <button
              onClick={() => onCompare(product)}
              className={`p-1.5 rounded border transition-colors ${
                isInCompare
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700'
              }`}
              title={isInCompare ? 'Đã thêm so sánh' : 'Thêm vào so sánh'}
            >
              {isInCompare ? <Check className="w-3.5 h-3.5 text-amber-700" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {onOpenQuote && (
          <button
            onClick={() => onOpenQuote(product)}
            className="w-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green text-[11px] font-bold py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-colors border border-brand-green/30"
          >
            <FileText className="w-3 h-3" />
            <span>Yêu cầu báo giá</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatProductCard;
