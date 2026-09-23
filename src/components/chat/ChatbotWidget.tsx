import React, { useState } from 'react';
import { Bot, MessageSquare, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import ChatWindow from './ChatWindow';
import { Product } from '../../types';

interface ChatbotWidgetProps {
  onOpenQuoteModal: (productName?: string) => void;
  onCompareProduct: (product: Product) => void;
  compareList: Product[];
}

export default function ChatbotWidget({
  onOpenQuoteModal,
  onCompareProduct,
  compareList
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadBubble, setHasUnreadBubble] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadBubble(false);
    }
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!isOpen && hasUnreadBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleToggle}
              className="cursor-pointer bg-white text-zinc-900 text-xs font-medium px-3.5 py-2 rounded-xl shadow-lg border border-zinc-200 flex items-center gap-2 max-w-[240px] hover:border-brand-green transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shrink-0"></div>
              <span className="truncate">Cần tư vấn vật tư hoặc báo giá nhanh?</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadBubble(false);
                }}
                className="text-zinc-400 hover:text-zinc-600 p-0.5 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleToggle}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 border-2 ${
            isOpen
              ? 'bg-zinc-900 border-zinc-700 text-white rotate-90 scale-95'
              : 'bg-brand-green hover:bg-brand-green-dark border-white text-white hover:scale-105'
          }`}
          title="Trợ lý AI Bán hàng DPCO"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-300 ring-2 ring-white">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window modal */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpenQuoteModal={onOpenQuoteModal}
            onCompareProduct={onCompareProduct}
            compareList={compareList}
          />
        )}
      </AnimatePresence>
    </>
  );
}
