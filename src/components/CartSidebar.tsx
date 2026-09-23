import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { convertDriveUrl } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
}

export default function CartSidebar({ isOpen, onClose, cart, removeFromCart }: CartSidebarProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-zinc-900" />
                <h2 className="text-lg font-bold text-zinc-900">{t('cart.title')} ({cart.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-zinc-300" />
                  <p className="text-zinc-500">{t('cart.empty')}</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
                        <img src={convertDriveUrl(item.image)} alt={item.name} className="h-full w-full object-cover object-center" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/f4f5f7/007a3d?text=Product' }} />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-zinc-900">{item.name}</h3>
                          <p className="ml-4 text-sm font-medium text-zinc-900">
                            {t('product.contact')}
                          </p>
                        </div>
                        <div className="flex items-end justify-between text-sm">
                          <p className="text-zinc-500">SL: {item.quantity}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-100 bg-zinc-50 p-6">
                <button
                  className="w-full flex items-center justify-center rounded-lg bg-brand-green px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-brand-green-dark transition-colors"
                >
                  {t('cart.submit')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
