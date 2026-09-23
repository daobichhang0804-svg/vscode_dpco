import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ScrollReveal, RevealItem } from './ScrollReveal';

export default function Hero({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 mesh-gradient-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-green"></span>
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Giải pháp công nghiệp
              </p>
            </div>
            
            <h1 className="text-5xl font-medium tracking-tight text-zinc-900 sm:text-7xl mb-8 leading-[1.1]">
              <span className="text-zinc-400 block mb-2">Kỷ Nguyên Mới</span>
              Cho Phòng Sạch
            </h1>
            
            <p className="text-lg leading-relaxed text-zinc-600 mb-10 max-w-lg">
              Cung cấp vật tư và thiết bị phòng sạch cao cấp. Kết hợp công nghệ tiên tiến, mang lại độ chính xác, an toàn và hiệu suất tối đa cho môi trường công nghiệp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center rounded-lg bg-brand-green px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-brand-green-dark hover:-translate-y-0.5 transition-all"
              >
                Nhận Báo Giá Ngay
              </button>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white/50 px-8 py-4 text-sm font-semibold text-zinc-900 backdrop-blur-sm hover:bg-white hover:border-zinc-300 transition-all"
              >
                Khám Phá Sản Phẩm
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-zinc-200/60 pt-10 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-light text-zinc-900">99.9%</p>
                <p className="mt-2 text-sm font-medium text-zinc-500">Độ Sạch Tiêu Chuẩn</p>
              </div>
              <div>
                <p className="text-3xl font-light text-zinc-900">50%</p>
                <p className="mt-2 text-sm font-medium text-zinc-500">Giảm Chi Phí</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-3xl font-light text-zinc-900">3x</p>
                <p className="mt-2 text-sm font-medium text-zinc-500">Hiệu Suất</p>
              </div>
            </div>
          </motion.div>
          
          {/* Abstract / Product Image Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-full lg:min-h-[600px] flex items-center justify-center"
          >
            {/* Minimalist Tech Visual */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-zinc-200 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-8 rounded-full border border-zinc-200"></div>
              
              {/* Core shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-64 bg-gradient-to-br from-zinc-100 to-zinc-300 rounded-2xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-xl">
                  {/* Tech details */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 h-1 bg-zinc-400/30 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-brand-green"></div>
                  </div>
                  
                  {/* Diagonal lines */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -right-4 w-24 p-3 bg-white rounded-xl shadow-lg border border-zinc-100 backdrop-blur-md"
              >
                <p className="text-xs font-semibold text-zinc-900">Vật Liệu Cấp 1</p>
                <p className="text-[10px] text-zinc-500 mt-1">Kháng khuẩn 100%</p>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -left-8 w-32 p-3 bg-white rounded-xl shadow-lg border border-zinc-100 backdrop-blur-md"
              >
                <p className="text-xs font-semibold text-brand-green">Đạt Chuẩn ISO</p>
                <div className="mt-2 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-brand-green"></div>
                </div>
              </motion.div>
            </div>
            
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-green/10 blur-[100px] rounded-full pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
