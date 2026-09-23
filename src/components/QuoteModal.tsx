import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: string;
}

export default function QuoteModal({ isOpen, onClose, initialDetails = '' }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');

  React.useEffect(() => {
    if (initialDetails) {
      setDetails(initialDetails);
    }
  }, [initialDetails, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          company_name: company,
          phone,
          requirements: details
        })
      });
    } catch (err) {
      console.warn('Could not post lead to server:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Send className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">Đã Gửi Yêu Cầu!</h3>
                  <p className="text-zinc-500 mt-2">Chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Yêu Cầu Báo Giá</h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Vui lòng điền thông tin bên dưới để nhận báo giá chi tiết cho dự án của bạn.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-zinc-700">Họ và tên</label>
                      <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-zinc-700">Số điện thoại</label>
                      <input required type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="0901 234 567" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-zinc-700">Công ty</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="Tên công ty của bạn" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="details" className="text-sm font-medium text-zinc-700">Chi tiết yêu cầu</label>
                    <textarea required id="details" rows={4} value={details} onChange={(e) => setDetails(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green resize-none" placeholder="Mô tả nhu cầu vật tư, số lượng dự kiến..."></textarea>
                  </div>

                  <button type="submit" className="w-full rounded-lg bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-colors">
                    Gửi Yêu Cầu Ngay
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
