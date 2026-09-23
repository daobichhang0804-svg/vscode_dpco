import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ZaloButton() {
  return (
    <motion.a
      href="https://zalo.me/0900000000" // Replace with real Zalo link/number
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-105 transition-all duration-300"
    >
      {/* Zalo Icon approximation using Lucide MessageCircle or a custom SVG */}
      <span className="font-bold text-lg tracking-tighter">Zalo</span>
    </motion.a>
  );
}
