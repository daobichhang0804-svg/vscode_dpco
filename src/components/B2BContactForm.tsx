import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function B2BContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    website: '',
    jobPosition: '',
    email: '',
    countryCode: 'Vietnam (+84)',
    phone: '',
    contactTime: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or Firebase
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        company: '',
        website: '',
        jobPosition: '',
        email: '',
        countryCode: 'Vietnam (+84)',
        phone: '',
        contactTime: ''
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="bg-white py-16 border-t border-zinc-200">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">
            {t('b2b.title') || 'Nhận báo giá'}
          </h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-2xl mx-auto">
            {t('b2b.desc') || 'Nhận báo giá'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-brand-green/10 border border-brand-green text-brand-green-dark p-6 rounded-lg text-center shadow-sm">
            <h3 className="font-bold text-lg mb-2">Đăng ký thành công!</h3>
            <p>Chúng tôi sẽ liên hệ với bạn trong vòng 2-3 giờ tới hoặc theo thời gian bạn đã yêu cầu.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-50 p-8 rounded-xl border border-zinc-100 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company" 
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Company's Website <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  type="url" 
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com" 
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Job Position <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="text" 
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                placeholder="Job Position" 
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Country Code <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none bg-white"
                >
                  <option value="Vietnam (+84)">Vietnam (+84)</option>
                  <option value="Indonesia (+62)">Indonesia (+62)</option>
                  <option value="Thailand (+66)">Thailand (+66)</option>
                  <option value="Malaysia (+60)">Malaysia (+60)</option>
                  <option value="Singapore (+65)">Singapore (+65)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Mobile Phone <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Example: 0912345678" 
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Thời gian mong muốn liên hệ (Tùy chọn)
              </label>
              <input 
                type="text" 
                name="contactTime"
                value={formData.contactTime}
                onChange={handleChange}
                placeholder="VD: Buổi sáng, sau 14h, hoặc một khung giờ cụ thể..." 
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" 
              />
            </div>

            <div className="pt-4 flex justify-center">
              <button 
                type="submit"
                className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-10 rounded-md uppercase tracking-widest text-sm transition-colors shadow-sm"
              >
                Gửi Thông Tin
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
