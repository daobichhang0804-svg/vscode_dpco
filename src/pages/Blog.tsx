import { useLanguage } from '../contexts/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();
  return (
    <div className="pb-24">
      <div className="py-16 px-6 lg:px-8 border-b border-zinc-200 mb-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Knowledge / News</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight">{t('blog.title')}</h1>
          </div>
          <div className="text-sm text-zinc-500 max-w-md">
            {t('blog.desc')}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Featured Post */}
            <article className="bg-white border border-zinc-200 group cursor-pointer flex flex-col shadow-sm">
              <div className="aspect-[21/9] bg-zinc-100 overflow-hidden relative">
                 <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Featured</div>
                <img src="/images/blog-featured.jpg" alt="Featured Post" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.style.display='none' }} />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-green font-bold text-[11px] tracking-widest uppercase">Cleanroom Standards</span>
                  <span className="text-[11px] text-zinc-400 uppercase tracking-widest">Aug 12, 2026</span>
                </div>
                <h2 className="text-2xl font-light text-zinc-900 mb-4 group-hover:text-brand-green transition-colors leading-tight">ISO 14644-1: Classification of Air Cleanliness in Cleanrooms</h2>
                <p className="text-zinc-500 mb-6 text-sm leading-relaxed">Understanding the international standard ISO 14644-1 for cleanrooms, how cleanliness classes are categorized from Class 1 to Class 9, and key considerations for HVAC system design in manufacturing environments...</p>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-6">
                  <div className="flex items-center text-[11px] text-zinc-500 uppercase tracking-widest">
                    By <span className="font-bold text-zinc-900 ml-1">Admin</span>
                  </div>
                  <span className="text-brand-green font-bold text-[11px] uppercase tracking-widest group-hover:underline">{t('blog.read')} →</span>
                </div>
              </div>
            </article>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <article key={item} className="bg-white border border-zinc-200 group cursor-pointer flex flex-col shadow-sm">
                  <div className="aspect-[16/9] bg-zinc-100 overflow-hidden">
                    <img src={`/images/blog-${item}.jpg`} alt="Post" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display='none' }} />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Industrial Mechanics</span>
                    <h3 className="text-[15px] font-medium text-zinc-900 mb-3 group-hover:text-brand-green transition-colors leading-snug">Selecting the Right Nitrile Gloves for Electronic Assembly Lines</h3>
                    <p className="text-[13px] text-zinc-500 mb-6 line-clamp-2">Analyzing the pros and cons of industrial gloves and selection criteria for anti-static environments...</p>
                    <div className="mt-auto border-t border-zinc-100 pt-4 flex justify-between items-center">
                       <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Sep 05, 2026</span>
                       <span className="text-zinc-400 group-hover:text-brand-green">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="bg-white p-6 border border-zinc-200 shadow-sm">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Search Library</h3>
              <input type="text" placeholder="Enter keywords..." className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-green focus:bg-white text-sm transition-colors" />
            </div>

            {/* Categories */}
            <div className="bg-white p-6 border border-zinc-200 shadow-sm">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-100 pb-3">Topics</h3>
              <ul className="space-y-4 text-[13px]">
                <li><a href="#" className="text-zinc-600 hover:text-brand-green flex justify-between items-center group"><span className="group-hover:translate-x-1 transition-transform">Cleanroom Standards</span> <span className="text-[10px] font-bold text-zinc-400">12</span></a></li>
                <li><a href="#" className="text-zinc-600 hover:text-brand-green flex justify-between items-center group"><span className="group-hover:translate-x-1 transition-transform">Industrial Mechanics</span> <span className="text-[10px] font-bold text-zinc-400">08</span></a></li>
                <li><a href="#" className="text-zinc-600 hover:text-brand-green flex justify-between items-center group"><span className="group-hover:translate-x-1 transition-transform">Company News</span> <span className="text-[10px] font-bold text-zinc-400">05</span></a></li>
              </ul>
            </div>

            {/* Banner Ad */}
            <div className="bg-brand-green p-8 text-center text-white border border-brand-green relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-light text-xl mb-3 relative z-10">Need Cleanroom Solutions?</h3>
              <p className="text-brand-green-100 text-[13px] mb-6 relative z-10 leading-relaxed">Our experts are ready to support your facility setup.</p>
              <button className="bg-white text-zinc-900 font-bold py-3 px-6 w-full text-[12px] uppercase tracking-widest hover:bg-zinc-100 transition-colors relative z-10 shadow-sm">
                Contact Us
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
