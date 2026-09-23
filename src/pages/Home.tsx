import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import Hero from '../components/Hero';
import { ScrollReveal, RevealItem } from '../components/ScrollReveal';
import InteractiveDistributionMap from '../components/map/InteractiveDistributionMap';
import CertificateViewer from '../components/CertificateViewer';
import { useLanguage } from '../contexts/LanguageContext';

function AnimatedStat({ 
  endValue, 
  suffix, 
  title, 
  desc, 
  bgImage,
  linkTo
}: { 
  endValue: number, 
  suffix: string, 
  title: string, 
  desc: string, 
  bgImage: string,
  linkTo: string
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const startTime = performance.now();
      
      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * endValue));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      requestAnimationFrame(updateCount);
    }
  }, [isInView, endValue]);

  return (
    <Link 
      to={linkTo}
      ref={ref}
      className="group relative h-[400px] flex flex-col justify-end p-8 overflow-hidden cursor-pointer border-r border-white/10 last:border-r-0"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* Default Overlay (Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-0"></div>
      
      {/* Hover Mesh Gradient Overlay */}
      <div className="absolute inset-0 mesh-gradient-green opacity-0 transition-opacity duration-500 group-hover:opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-start w-full transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="font-bold text-[13px] tracking-widest uppercase mb-4 opacity-90">{title}</h3>
        <div className="w-full border-t border-dashed border-white/30 mb-4"></div>
        <div className="text-6xl font-bold mb-2 tracking-tight">
          {count}{suffix}
        </div>
        <p className="text-sm opacity-90 leading-relaxed max-w-[250px]">{desc}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const { openQuote } = useOutletContext<any>();
  const { t } = useLanguage();

  return (
    <>
      {/* Banner Hero Carousel Placeholder */}
      <Hero onOpenQuote={openQuote} />
      
      {/* About Section */}
      <section className="py-20 relative"><ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4">{t('home.value')}</p>
          <h2 className="text-3xl lg:text-4xl font-light text-zinc-900 mb-6 max-w-3xl mx-auto leading-tight">
            {t('home.value.title')} <br/><span className="font-bold">{t('home.value.highlight')}</span>
          </h2>
          <div className="w-12 h-[2px] bg-zinc-300 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-zinc-500 text-sm leading-relaxed">
            {t('home.value.desc')}
          </p>
        </ScrollReveal></section>



      {/* Stats Section with Images and Animations */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <AnimatedStat 
            title={t('home.customers')}
            endValue={100}
            suffix={t('home.stat.plus')}
            desc={t('home.customers.desc')}
            bgImage="https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?auto=format&fit=crop&w=1200&q=80"
            linkTo="/blog?category=market"
          />
          <AnimatedStat 
            title={t('home.supply')}
            endValue={70}
            suffix={t('home.stat.million')}
            desc={t('home.supply.desc')}
            bgImage="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
            linkTo="/blog?category=supply-chain"
          />
          <AnimatedStat 
            title={t('home.experience')}
            endValue={25}
            suffix={t('home.stat.plus')}
            desc={t('home.experience.desc')}
            bgImage="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
            linkTo="/#certificates"
          />
        </div>
      </section>

      {/* Distribution Map */}
      <InteractiveDistributionMap />

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-zinc-50 border-t border-zinc-200">
        <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">{t('home.cert')}</h2>
            <div className="w-12 h-[2px] bg-brand-green mx-auto mt-4 mb-4"></div>
            <p className="text-sm text-zinc-500 max-w-2xl mx-auto">{t('home.cert.desc')}</p>
          </div>
          
          <CertificateViewer />
        </ScrollReveal>
      </section>

      {/* Partners Section (Đối tác chiến lược - Các nhà phân phối hàng đầu) */}
      <section className="py-12 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-1">{t('home.partners')}</p>
            <h3 className="text-lg font-bold text-zinc-900">{t('home.partners.title')}</h3>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-12">
            <a href="https://www.suzukilatex.com.my/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="h-12 w-auto flex items-center justify-center text-zinc-900 font-black text-2xl tracking-tighter">
                SUZUKI<span className="font-light">LATEX</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 group-hover:text-brand-green transition-colors">suzukilatex.com.my</span>
            </a>
            
            <a href="https://www.riverstone.com.my/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="h-12 w-auto flex items-center justify-center text-zinc-900 font-black text-2xl tracking-tight">
                RIVERSTONE
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 group-hover:text-brand-green transition-colors">riverstone.com.my</span>
            </a>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 border-t border-zinc-200">
        <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">{t('home.updates')}</h2>
            <div className="flex items-center gap-4 mt-2">
               <p className="text-sm text-zinc-500">{t('home.updates.desc')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="bg-white border border-zinc-200 p-6 flex flex-col hover:border-brand-green/40 transition-colors">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Quarter {item} - 2026</div>
                <Link to="/blog" className="text-sm font-medium text-zinc-900 mb-4 hover:text-brand-green transition-colors leading-relaxed">
                  Tiêu chuẩn ISO 14644-1: Phân loại độ sạch không khí trong phòng sạch và ứng dụng thực tế.
                </Link>
                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-200 rounded-full"></div>
                    <span className="text-[10px] text-zinc-500 uppercase">Admin</span>
                  </div>
                  <Link to="/blog" className="w-6 h-6 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-brand-green">→</Link>
                </div>
              </article>
            ))}
          </div>
        
        </ScrollReveal>
      </section>
    </>
  );
}
