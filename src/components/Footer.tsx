import { useLanguage } from '../contexts/LanguageContext';

const LOGO_URL =
  'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/brand-assets/logo_image_bg%20removed.png';

export default function Footer() {
  const { t } = useLanguage();

  const offices = [
    {
      key: 'hanoi',
      title: t('footer.hanoi'),
      address: t('footer.hanoi.address'),
      hotlines: ['094 828 1881', '039 667 5987'],
      email: 'bm-m@dpco.com.vn',
    },
    {
      key: 'dongnai',
      title: t('footer.dongnai'),
      address: t('footer.dongnai.address'),
      hotlines: ['038 250 2425'],
      email: 'buz-south-01@dpco.com.vn',
    },
  ];

  return (
    <footer className="relative mesh-gradient-green text-white pt-32 md:pt-36 pb-8 mt-28">

      {/* Họa tiết đường chéo mảnh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-12deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 14px)',
        }}
      />

      {/* Logo tròn lớn đè lên mép trên */}
      <div className="absolute left-1/2 -top-24 md:-top-28 -translate-x-1/2 w-44 h-44 md:w-52 md:h-52 bg-brand-green rounded-full flex items-center justify-center p-[12%] z-10">
        <img
          src={LOGO_URL}
          alt="Logo"
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">

        {/* Tên công ty */}
        <div className="text-center mb-10">
          <h2 className="text-[22px] md:text-[30px] font-extrabold tracking-tight mb-1 text-white uppercase">
            CÔNG TY TNHH THƯƠNG MẠI ĐỨC PHONG
          </h2>
          <p className="text-[18px] md:text-[26px] font-bold text-emerald-100/60 uppercase tracking-tight">
            DUC PHONG TRADING COMPANY LIMITED
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-[1.5px] border-dashed border-white/40 my-8"></div>

        {/* Mỗi văn phòng một hàng: địa chỉ trái, hotline + email phải */}
        <div className="flex flex-col gap-8">
          {offices.map((o) => (
            <div
              key={o.key}
              className="grid grid-cols-1 lg:grid-cols-[1fr_9rem_16rem] gap-6 lg:gap-12"
            >
              <div>
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">
                  {o.title}
                </div>
                <div className="max-w-2xl text-[12.5px] font-semibold leading-relaxed uppercase tracking-wide">
                  {o.address}
                </div>
              </div>

              <div>
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">
                  HOTLINE
                </div>
                <div className="flex flex-col gap-1">
                  {o.hotlines.map((h) => (
                    <a
                      key={h}
                      href={`tel:${h.replace(/\s/g, '')}`}
                      className="text-[13px] font-semibold tracking-wide hover:text-brand-yellow transition-colors"
                    >
                      {h}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-[10px] text-white/60 mb-2 uppercase tracking-widest">
                  EMAIL
                </div>
                <a
                  href={`mailto:${o.email}`}
                  className="text-[13px] font-semibold lowercase tracking-wide break-all hover:text-brand-yellow transition-colors"
                >
                  {o.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t-[1.5px] border-dashed border-white/40 mt-10 mb-6"></div>

        {/* Copyright và liên kết nhanh */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60 font-medium tracking-wide">
          <div>{t('footer.copyright')}</div>
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