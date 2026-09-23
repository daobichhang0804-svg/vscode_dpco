import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import QuoteModal from './QuoteModal';
import CartSidebar from './CartSidebar';
import ZaloButton from './ZaloButton';
import B2BContactForm from './B2BContactForm';
import ChatbotWidget from './chat/ChatbotWidget';
import { ArrowLeftRight } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialDetails, setQuoteInitialDetails] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Shared State (Normally in Context/Redux, but lifted here for simplicity)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [compareAnimate, setCompareAnimate] = useState(false);
  const [showCompareTooltip, setShowCompareTooltip] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) {
        alert('Chỉ có thể so sánh tối đa 4 sản phẩm.');
        return prev;
      }
      
      // Trigger animation
      setCompareAnimate(true);
      setShowCompareTooltip(true);
      setTimeout(() => setCompareAnimate(false), 500);
      setTimeout(() => setShowCompareTooltip(false), 2500);
      
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setQuoteInitialDetails(`Yêu cầu báo giá chi tiết cho sản phẩm: ${productName}`);
    } else {
      setQuoteInitialDetails('');
    }
    setIsQuoteModalOpen(true);
  };

  const contextValue = {
    handleAddToCart,
    handleCompare,
    handleRemoveFromCompare,
    compareList,
    openQuote: handleOpenQuoteModal
  };

  return (
    <div className="min-h-screen relative selection:bg-brand-green/20 selection:text-zinc-900 flex flex-col mesh-gradient-bg">
      <Header 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuote={() => handleOpenQuoteModal()}
      />
      
      <main className="flex-1">
        <Outlet context={contextValue} />
      </main>

      <B2BContactForm />
      <Footer />

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => {
          setIsQuoteModalOpen(false);
          setQuoteInitialDetails('');
        }}
        initialDetails={quoteInitialDetails}
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        removeFromCart={handleRemoveFromCart}
      />

      {compareList.length > 0 && (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
          <AnimatePresence>
            {showCompareTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-3 bg-zinc-900 text-white text-xs font-medium px-4 py-2.5 rounded shadow-[0_10px_30px_rgba(0,0,0,0.2)] whitespace-nowrap border border-zinc-800 flex items-center gap-2"
              >
                <span>Đã thêm vào danh sách so sánh</span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <Link
            to="/compare"
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow text-zinc-900 shadow-lg hover:scale-105 transition-all duration-300 border border-zinc-200 ${compareAnimate ? 'animate-[bounce_0.5s_ease-in-out]' : ''}`}
            title="So sánh sản phẩm"
          >
            <ArrowLeftRight className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm border-2 border-white">
              {compareList.length}
            </span>
          </Link>
        </div>
      )}
      
      <ChatbotWidget
        onOpenQuoteModal={handleOpenQuoteModal}
        onCompareProduct={handleCompare}
        compareList={compareList}
      />

      <ZaloButton />
    </div>
  );
}
