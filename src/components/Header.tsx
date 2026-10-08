import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, Phone, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SearchDropdown from './SearchDropdown';
import { toSlug } from '../utils';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenQuote: () => void;
}

const PRODUCT_MENU = [
  'Bao ngón tay cao su',
  'Găng tay nitrile phòng sạch',
  'Trục cơ khí chính xác',
];

export default function Header({ cartItemCount, onOpenCart, onOpenQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalog');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-lg border-b border-zinc-200">
      {/* Một thanh duy nhất */}
      <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-5 px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/brand-assets/logo_image_bg%20removed.png"
            alt="Đức Phong brand logo"
            className="h-[40px] w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand-green flex items-center justify-center shadow-inner">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">Đức Phong</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm min-w-[180px] relative">
          <form onSubmit={handleSearch} className="w-full relative z-50">
            <input
              type="text"
              placeholder={t('header.search')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm text-zinc-700"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-green">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <SearchDropdown
            query={searchQuery}
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onQueryChange={setSearchQuery}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          <Link to="/" className="text-sm font-semibold text-zinc-900 hover:text-brand-green transition-colors whitespace-nowrap">
            {t('header.home')}
          </Link>

          <div className="relative group">
            <Link to="/products" className="text-sm font-semibold text-zinc-700 group-hover:text-brand-green transition-colors py-2 whitespace-nowrap">
              {t('header.products')}
            </Link>

            {/* Dropdown Sản phẩm */}
            <div className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-out">
              <div className="rounded-lg border border-zinc-100 bg-white py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {PRODUCT_MENU.map((name) => (
                  <Link
                    key={name}
                    to={`/collections/${toSlug(name)}`}
                    className="block px-8 py-3.5 text-[15px] text-zinc-600 transition-colors hover:bg-emerald-50/60 hover:text-brand-green"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/blog" className="text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors whitespace-nowrap">
            {t('header.news')}
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors whitespace-nowrap">
            {t('header.contact')}
          </Link>
        </nav>

        {/* Utility cluster: căn phải */}
        <div className="flex items-center gap-4 ml-auto">

          {/* Hotline */}
          <a
            href="tel:0948281881"
            className="hidden xl:flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors"
          >
            <Phone className="h-4 w-4 text-brand-green" />
            094 828 1881
          </a>

          <span className="hidden xl:block h-6 w-px bg-zinc-200" />

          {/* Gọi nhanh trên mobile */}
          <a href="tel:0948281881" className="md:hidden p-2 text-brand-green" aria-label="Gọi hotline">
            <Phone className="h-5 w-5" />
          </a>

          {/* Ngôn ngữ */}
          <div className="hidden md:flex items-center gap-1.5 text-[12px]">
            <Globe className="h-3.5 w-3.5 text-brand-green" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
              className="bg-transparent border-none outline-none cursor-pointer font-semibold text-zinc-700 uppercase"
            >
              <option value="vi">VN</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Giỏ hàng */}
          <button onClick={onOpenCart} className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-yellow text-[10px] font-bold text-zinc-900 shadow-sm border border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* CTA chính */}
          <button
            onClick={onOpenQuote}
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-all active:scale-95"
          >
            {t('header.quote')}
          </button>

          {/* Hamburger */}
          <button className="xl:hidden p-2 text-zinc-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="xl:hidden border-t border-zinc-100 bg-white px-6 py-4"
        >
          <div className="flex flex-col space-y-4">
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                placeholder={t('header.search')}
                className="w-full pl-4 pr-10 py-2 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-brand-green"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-900">{t('header.home')}</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-700">{t('header.products')}</Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-700">{t('header.news')}</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-700">{t('header.contact')}</Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm w-full"
            >
              {t('header.quote')}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}