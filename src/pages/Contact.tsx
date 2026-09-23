import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Paperclip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [requirements, setRequirements] = useState('');
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.bulkQuote) {
      const products = location.state.bulkQuote as Product[];
      const names = products.map(p => `- ${p.name} (SKU: ${p.id})`).join('\n');
      setRequirements(`Yêu cầu báo giá hàng loạt cho các sản phẩm sau:\n${names}\n\nYêu cầu chi tiết: `);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-24">
      {/* Header Banner */}
      <div className="py-16 px-6 lg:px-8 border-b border-zinc-200 mb-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Connect / B2B</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight">{t('contact.title')}</h1>
          </div>
          <div className="text-sm text-zinc-500 max-w-md">
            {t('contact.desc')}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* B2B Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-zinc-200 p-12 text-center h-full flex flex-col items-center justify-center shadow-sm">
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 rounded-full">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">{t('contact.success')}</h2>
                <p className="text-zinc-500 text-sm max-w-md">Your industrial quote request has been routed to our technical sales team. We will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-green hover:text-brand-green-dark border-b border-brand-green pb-1 transition-colors">{t('contact.submit.another')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 p-8 md:p-10 shadow-sm">
                <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-widest mb-8 border-b border-zinc-100 pb-4">{t('contact.form.title')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.name')} <span className="text-brand-green">*</span></label>
                    <input required type="text" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.position')}</label>
                    <input type="text" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.company')} <span className="text-brand-green">*</span></label>
                    <input required type="text" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.tax')}</label>
                    <input type="text" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.phone')} <span className="text-brand-green">*</span></label>
                    <input required type="tel" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.email')} <span className="text-brand-green">*</span></label>
                    <input required type="email" className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.requirements')} <span className="text-brand-green">*</span></label>
                  <textarea required rows={5} placeholder="Product SKU, quantity, or specific technical requirements..." className="w-full px-4 py-3 border border-zinc-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-zinc-50 focus:bg-white transition-colors resize-none" value={requirements} onChange={(e) => setRequirements(e.target.value)}></textarea>
                </div>

                <div className="space-y-2 mb-10">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.form.attachments')}</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border border-zinc-300 border-dashed cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Paperclip className="w-6 h-6 mb-3 text-zinc-400" />
                        <p className="mb-1 text-[13px] text-zinc-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-[11px] text-zinc-400 uppercase tracking-widest">PDF, XLSX, DOCX (Max 10MB)</p>
                      </div>
                      <input type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-zinc-900 hover:bg-brand-green text-white font-bold py-4 px-8 transition-colors flex justify-center items-center gap-2 text-[13px] uppercase tracking-widest border border-zinc-900 hover:border-brand-green">
                  {t('contact.form.submit')} <span className="text-[16px]">→</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white border border-zinc-200 p-8 shadow-sm relative overflow-hidden">
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-widest mb-8 border-b border-zinc-100 pb-4">{t('contact.office')}</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-brand-green/10 flex items-center justify-center mr-4 text-brand-green shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5">{t('contact.hq')}</h4>
                    <p className="text-zinc-900 text-[13px] leading-relaxed">{t('footer.address.text')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-brand-green/10 flex items-center justify-center mr-4 text-brand-green shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5">Direct Lines</h4>
                    <p className="text-zinc-900 text-[13px] leading-relaxed font-medium">094 828 1881 <span className="text-zinc-400 font-normal ml-2">Sales</span><br/>039 667 5987 <span className="text-zinc-400 font-normal ml-2">Support</span></p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-brand-green/10 flex items-center justify-center mr-4 text-brand-green shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5">Email Inquiries</h4>
                    <p className="text-zinc-900 text-[13px] leading-relaxed font-medium">bm-m@dpco.com.vn</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-zinc-100">
                <h4 className="font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-2">Operating Hours</h4>
                <p className="text-zinc-900 text-[13px] flex justify-between"><span className="font-medium">Mon - Sat</span> <span>08:00 - 17:30</span></p>
              </div>
            </div>

            {/* Embed Map */}
            <div className="h-[250px] bg-white border border-zinc-200 overflow-hidden shadow-sm p-1">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2685959080766!2d105.8445887!3d20.9672588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac4c265250dd%3A0x681cb7c09e43bd7!2s!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Duc Phong Office Map"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
