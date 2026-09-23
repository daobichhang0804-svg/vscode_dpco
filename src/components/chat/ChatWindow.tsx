import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, X, RotateCcw, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage, ChatResponsePayload } from '../../types/chat';
import { Product } from '../../types';
import ChatMessageItem from './ChatMessageItem';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (productName?: string) => void;
  onCompareProduct: (product: Product) => void;
  compareList: Product[];
}

const INITIAL_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: `Kính chào Quý khách! Tôi là **Trợ lý Bán hàng & Kỹ thuật DPCO** (Công ty TNHH Thương Mại Đức Phong).

Tôi có thể hỗ trợ Quý khách:
- **Tra cứu sản phẩm & thông số kỹ thuật:** Bao ngón cao su Suzuki Latex, găng tay nitrile phòng sạch, trục động cơ.
- **Tiếp nhận yêu cầu báo giá B2B:** Hỗ trợ tính số lượng, báo giá sỉ cho nhà máy, khu công nghiệp.
- **So sánh vật tư:** Phân biệt các cấp độ sạch, độ bột, khả năng chống tĩnh điện ESD.
- **Vị trí & Liên hệ:** Địa chỉ trụ sở Hà Nội, Đồng Nai và thông tin giao hàng toàn quốc.

Quý khách đang quan tâm đến sản phẩm hoặc cần hỗ trợ gì hôm nay?`,
  timestamp: Date.now(),
  suggestedReplies: [
    'Bao ngón cao su không bột',
    'Găng tay nitrile phòng sạch Class 100',
    'Yêu cầu báo giá số lượng lớn',
    'Địa chỉ văn phòng DPCO Hà Nội'
  ]
};

export default function ChatWindow({
  isOpen,
  onClose,
  onOpenQuoteModal,
  onCompareProduct,
  compareList
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Try to silently obtain geolocation for Google Maps grounding if permitted
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        () => {
          // Geolocation not granted or denied - ignore silently
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, loading]);

  const handleReset = () => {
    setMessages([{ ...INITIAL_GREETING, timestamp: Date.now() }]);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          userLocation
        })
      });

      if (!res.ok) {
        throw new Error('Lỗi kết nối API máy chủ');
      }

      const data: ChatResponsePayload = await res.json();

      const assistantMessage: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now(),
        intents: data.intents,
        productCards: data.productCards,
        actions: data.actions,
        citations: data.citations,
        groundingType: data.groundingType,
        leadFormPrompt: data.leadFormPrompt,
        suggestedReplies: data.suggestedReplies
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: 'Rất tiếc, đã có sự cố kết nối với hệ thống AI. Quý khách vui lòng thử lại hoặc gọi trực tiếp Hotline Kinh doanh: **094 828 1881** để được tư vấn lập tức.',
        timestamp: Date.now(),
        actions: [
          { type: 'call_phone', label: 'Gọi Hotline 094 828 1881', url: 'tel:0948281881' }
        ]
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Find latest suggested replies
  const lastMessage = messages[messages.length - 1];
  const activeSuggestions = !loading && lastMessage?.suggestedReplies ? lastMessage.suggestedReplies : [];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-zinc-200/90 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-zinc-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-900"></span>
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              DPCO AI Assistant
              <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                Online
              </span>
            </h3>
            <p className="text-[10px] text-zinc-400">Tư vấn kỹ thuật & Báo giá B2B</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Bắt đầu hội thoại mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 bg-zinc-50/50 space-y-3">
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            onOpenQuoteModal={onOpenQuoteModal}
            onCompareProduct={onCompareProduct}
            compareList={compareList}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 text-xs py-2 px-3 bg-white rounded-xl border border-zinc-200/80 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-brand-green animate-spin" />
            <span>Đang tra cứu dữ liệu & xử lý...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Replies */}
      {activeSuggestions.length > 0 && (
        <div className="px-3 py-2 bg-white border-t border-zinc-100 flex gap-1.5 overflow-x-auto scrollbar-none">
          {activeSuggestions.map((sug, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSend(sug)}
              className="text-[11px] bg-zinc-100 hover:bg-brand-green/10 hover:text-brand-green text-zinc-700 font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border border-zinc-200/80 shrink-0"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Nhập câu hỏi, tên sản phẩm hoặc yêu cầu báo giá..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl outline-none focus:border-brand-green focus:bg-white transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || loading}
            className="bg-brand-green hover:bg-brand-green-dark disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
            title="Gửi tin nhắn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[9px] text-zinc-400 px-1">
          <span>Ưu tiên dữ liệu Supabase & Thông tin chính thức DPCO</span>
          <span>Bảo mật B2B</span>
        </div>
      </div>
    </motion.div>
  );
}
