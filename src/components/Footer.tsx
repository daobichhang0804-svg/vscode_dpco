import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mesh-gradient-green text-white pt-24 pb-8 mt-20">
      
      {/* Circle Logo overlapping top */}
      <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-32 h-32 bg-brand-green rounded-full flex items-center justify-center p-[15%] shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.1)] z-10">
        <img src="https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/brand-assets/logo_image_bg%20removed.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-md" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        
        {/* Center Company Name */}
        <div className="text-center mb-10">
          <h2 className="text-[18px] md:text-[22px] font-bold tracking-wide mb-1 text-white uppercase">
            CÔNG TY TNHH THƯƠNG MẠI ĐỨC PHONG
          </h2>
          <p className="text-[13px] md:text-[15px] font-medium text-white/70 uppercase">
            DUC PHONG TRADING COMPANY LIMITED
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-[1.5px] border-dashed border-white/30 my-8"></div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24">
          
          {/* Left Column: Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">{t('footer.hanoi')}</div>
              <div className="text-[12.5px] font-medium leading-relaxed uppercase tracking-wide">
                {t('footer.hanoi.address')}
              </div>
            </div>
            <div>
              <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">{t('footer.dongnai')}</div>
              <div className="text-[12.5px] font-medium leading-relaxed uppercase tracking-wide">
                {t('footer.dongnai.address')}
              </div>
            </div>
          </div>

          {/* Right Column: Contacts */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-8 sm:gap-16">
              <div className="w-28 sm:w-32">
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">HOTLINE</div>
                <div className="text-[13px] font-medium mb-1 tracking-wide">094 828 1881</div>
                <div className="text-[13px] font-medium tracking-wide">039 667 5987</div>
              </div>
              <div>
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">EMAIL</div>
                <div className="text-[13px] font-medium lowercase tracking-wide">bm-m@dpco.com.vn</div>
              </div>
            </div>
            
            <div className="flex gap-8 sm:gap-16">
              <div className="w-28 sm:w-32">
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">HOTLINE</div>
                <div className="text-[13px] font-medium tracking-wide">038 250 2425</div>
              </div>
              <div>
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">EMAIL</div>
                <div className="text-[13px] font-medium lowercase tracking-wide">buz-south-01@dpco.com.vn</div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t-[1.5px] border-dashed border-white/30 mt-12 mb-6"></div>

        {/* Copyright and Quick Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60 font-medium tracking-wide">
          <div>
            {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/certificates" className="hover:text-white transition-colors">
              Quản trị chứng chỉ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
