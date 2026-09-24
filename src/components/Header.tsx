import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, Phone, Mail, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SearchDropdown from './SearchDropdown';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenQuote: () => void;
}

export default function Header({ cartItemCount, onOpenCart, onOpenQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-lg border-b border-zinc-200">
      {/* Top Bar */}
      <div className="text-zinc-500 text-[11px] uppercase tracking-wider py-2 px-6 lg:px-8 hidden md:block border-b border-zinc-200/50">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><Phone className="h-3 w-3 mr-1.5 text-brand-green" /> 094 828 1881 / 039 667 5987</span>
            <span className="flex items-center lowercase"><Mail className="h-3 w-3 mr-1.5 text-brand-green" /> bm-m@dpco.com.vn</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-3 w-3 text-brand-green" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
              className="bg-transparent border-none outline-none cursor-pointer font-semibold text-zinc-700"
            >
              <option value="vi">VIETNAM</option>
              <option value="en">ENGLISH</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 mr-8">
          <img src="https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/brand-assets/logo_image_bg%20removed.png" alt="Đức Phong brand logo: an abstract green leaf-like emblem surrounded by a bright yellow rounded shape on a transparent background; no text appears in the emblem" className="h-[40px] w-auto object-contain" onError={(e) => {
            // Fallback if image not uploaded yet
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }} />
          <div className="hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand-green flex items-center justify-center shadow-inner">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Đức Phong
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
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
        <nav className="hidden xl:flex items-center gap-6 mr-6">
          <Link to="/" className="text-sm font-semibold text-zinc-900 hover:text-brand-green transition-colors">{t('header.home')}</Link>
          <div className="relative group">
            <Link to="/products" className="text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors py-2">{t('header.products')}</Link>
            {/* Mega Menu Placeholder */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white rounded-lg shadow-xl border border-zinc-100 p-4 flex flex-col gap-2">
                <Link to={`/products?category=${encodeURIComponent('Bao ngón tay cao su')}`} className="text-sm text-zinc-600 hover:text-brand-green hover:bg-zinc-50 px-3 py-2 rounded">{t('header.finger_cots')}</Link>
                <Link to={`/products?category=${encodeURIComponent('Găng tay nitrile phòng sạch')}`} className="text-sm text-zinc-600 hover:text-brand-green hover:bg-zinc-50 px-3 py-2 rounded">{t('header.nitrile_gloves')}</Link>
                <Link to={`/products?category=${encodeURIComponent('Trục cơ khí chính xác')}`} className="text-sm text-zinc-600 hover:text-brand-green hover:bg-zinc-50 px-3 py-2 rounded">{t('header.mechanical_shaft')}</Link>
              </div>
            </div>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors">{t('header.news')}</Link>
          <Link to="/contact" className="text-sm font-semibold text-zinc-700 hover:text-brand-green transition-colors">{t('header.contact')}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-yellow text-[10px] font-bold text-zinc-900 shadow-sm border border-white">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button
            onClick={onOpenQuote}
            className="hidden md:inline-flex items-center justify-center rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-all active:scale-95"
          >
            {t('header.quote')}
          </button>

          <button 
            className="xl:hidden p-2 text-zinc-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
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
