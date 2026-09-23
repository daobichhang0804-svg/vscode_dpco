import React from 'react';
import { ChatMessage, ChatAction } from '../../types/chat';
import { Product } from '../../types';
import ChatProductCard from './ChatProductCard';
import ChatLeadForm from './ChatLeadForm';
import { MapPin, Globe, Database, Building2, ExternalLink, Phone, ArrowLeftRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessageItemProps {
  key?: React.Key;
  message: ChatMessage;
  onOpenQuoteModal?: (productName?: string) => void;
  onCompareProduct?: (product: Product) => void;
  compareList?: Product[];
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onOpenQuoteModal,
  onCompareProduct,
  compareList = []
}) => {
  const isUser = message.role === 'user';
  const navigate = useNavigate();

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'navigate' && action.url) {
      navigate(action.url);
    } else if (action.type === 'open_quote_modal') {
      if (onOpenQuoteModal) {
        onOpenQuoteModal(action.payload?.productName);
      }
    } else if (action.type === 'open_compare' && action.url) {
      navigate('/compare');
    } else if (action.type === 'call_phone') {
      window.location.href = action.url || 'tel:0948281881';
    } else if (action.type === 'view_product' && action.url) {
      navigate(action.url);
    }
  };

  // Format markdown helper for clean rendering without external library overhead
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bullet point
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ');
      let content = line;
      if (isBullet) {
        content = line.trim().replace(/^[-*•]\s+/, '');
      }

      // Convert **bold** tags
      const parts = content.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-zinc-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc my-1 text-zinc-800">
            {renderedParts}
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 text-zinc-800 leading-relaxed">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4 text-xs md:text-sm`}>
      {/* Sender Header */}
      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-zinc-400">
        {!isUser && (
          <span className="flex items-center gap-1 font-bold text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            DPCO AI Assistant
          </span>
        )}
        <span>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 shadow-sm text-left ${
          isUser
            ? 'bg-zinc-900 text-white rounded-tr-none'
            : 'bg-white border border-zinc-200/80 text-zinc-900 rounded-tl-none'
        }`}
      >
        {/* Grounding Source Badge */}
        {!isUser && message.groundingType && (
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-100 pb-1.5">
            {message.groundingType === 'supabase' && (
              <>
                <Database className="w-3 h-3 text-brand-green" />
                <span>Nguồn: Dữ liệu sản phẩm DPCO / Supabase</span>
              </>
            )}
            {message.groundingType === 'official_site' && (
              <>
                <Building2 className="w-3 h-3 text-blue-600" />
                <span>Nguồn: Thông tin chính thức DPCO</span>
              </>
            )}
            {message.groundingType === 'google_maps' && (
              <>
                <MapPin className="w-3 h-3 text-red-500" />
                <span>Định vị: Google Maps Grounding</span>
              </>
            )}
            {message.groundingType === 'google_search' && (
              <>
                <Globe className="w-3 h-3 text-amber-600" />
                <span>Tra cứu: Google Search Grounding</span>
              </>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className="space-y-0.5">{renderFormattedText(message.content)}</div>

        {/* Citations / Links */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-1.5">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Nguồn trích dẫn & Bản đồ:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.citations.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-medium px-2 py-1 rounded border border-zinc-200 transition-colors"
                >
                  {c.sourceType === 'maps' ? (
                    <MapPin className="w-3 h-3 text-red-500" />
                  ) : (
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  )}
                  <span className="truncate max-w-[200px]">{c.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Inline Lead Capture Form */}
        {message.leadFormPrompt && (
          <ChatLeadForm
            initialProduct={message.leadFormPrompt.productName}
            initialQuantity={message.leadFormPrompt.quantity}
          />
        )}

        {/* Product Cards Row */}
        {message.productCards && message.productCards.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-zinc-100">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Sản phẩm đề xuất ({message.productCards.length}):
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {message.productCards.map((prod) => (
                <ChatProductCard
                  key={prod.id}
                  product={prod}
                  onOpenQuote={() => onOpenQuoteModal && onOpenQuoteModal(prod.name)}
                  onCompare={onCompareProduct}
                  isInCompare={compareList.some((cp) => cp.id === prod.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
            {message.actions.map((act, aIdx) => (
              <button
                key={aIdx}
                onClick={() => handleActionClick(act)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs ${
                  act.type === 'open_quote_modal'
                    ? 'bg-brand-green text-white hover:bg-brand-green-dark'
                    : act.type === 'call_phone'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : act.type === 'open_compare'
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {act.type === 'open_quote_modal' && <FileText className="w-3 h-3" />}
                {act.type === 'call_phone' && <Phone className="w-3 h-3" />}
                {act.type === 'open_compare' && <ArrowLeftRight className="w-3 h-3" />}
                {act.type === 'navigate' && <ExternalLink className="w-3 h-3" />}
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;
