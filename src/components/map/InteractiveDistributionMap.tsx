import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISTRIBUTION_LOCATIONS, DistributionLocation } from '../../data/locations';
import { MapPin, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InteractiveDistributionMap() {
  const [selectedLocation, setSelectedLocation] = useState<DistributionLocation | null>(null);

  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-4">Mạng lưới phân phối toàn quốc</h2>
          <p className="text-lg text-zinc-600">Đức Phong tự hào với hệ thống chi nhánh và kho bãi rộng khắp, đảm bảo cung ứng nhanh chóng và liên tục cho các nhà máy, khu công nghiệp trên toàn quốc.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start h-auto lg:h-[700px]">
          
          {/* Map Area */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-full relative bg-white rounded-3xl shadow-sm border border-zinc-200/50 p-4">
            
            {/* Vietnam Map Background */}
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-6 pointer-events-none select-none opacity-10">
              <img
                src="/vietnam-distribution-map.png"
                alt="Bản đồ mạng lưới phân phối Việt Nam"
                className="h-full w-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/images/vietnam-distribution-map.png';
                  }
                }}
              />
            </div>

            {/* Markers */}
            {DISTRIBUTION_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              
              return (
                <div 
                  key={loc.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <div className="relative group cursor-pointer" onClick={() => setSelectedLocation(loc)}>
                    
                    {/* Ripple Effect for selected */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeRing"
                        className="absolute inset-0 -m-4 border-2 border-brand-green/30 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Marker Pin */}
                    <div className={`
                      flex items-center justify-center rounded-full transition-all duration-300
                      ${isSelected ? 'bg-brand-green text-white w-10 h-10 shadow-lg shadow-brand-green/30' : 'bg-white text-brand-green w-8 h-8 shadow-md hover:scale-110 hover:bg-brand-green hover:text-white'}
                    `}>
                      <MapPin className={isSelected ? "w-5 h-5" : "w-4 h-4"} />
                    </div>

                    {/* Label - visible on desktop hover or always if selected */}
                    <div className={`
                      absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-300
                      ${isSelected ? 'bg-zinc-900 text-white opacity-100 translate-x-0' : 'bg-white text-zinc-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
                      hidden md:block
                    `}>
                      {loc.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Location Card Info Area */}
          <div className="w-full lg:w-1/2 relative h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedLocation ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100 relative"
                >
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="mb-6 rounded-2xl overflow-hidden bg-zinc-100 aspect-video relative">
                    <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{selectedLocation.name}</h3>
                    </div>
                  </div>

                  <p className="text-zinc-600 mb-6 leading-relaxed">
                    {selectedLocation.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Khu vực phục vụ</h4>
                      <p className="text-sm font-medium text-zinc-900">{selectedLocation.serviceArea}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Sản phẩm cung cấp chính</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.productCategories.map(cat => (
                          <span key={cat} className="inline-flex items-center rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link to={selectedLocation.link} className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-brand-green transition-colors group">
                    Liên hệ chi nhánh
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="hidden lg:flex h-full items-center justify-center text-center p-12 bg-white/50 backdrop-blur-sm rounded-3xl border border-zinc-200/50 border-dashed"
                >
                  <div>
                    <MapPin className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-700 mb-2">Chọn một chi nhánh</h3>
                    <p className="text-zinc-500">Bấm vào một điểm trên bản đồ để xem thông tin chi tiết về các chi nhánh và kho bãi của Đức Phong.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
