import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ChatLeadFormProps {
  initialProduct?: string;
  initialQuantity?: string;
  onSubmitSuccess?: () => void;
}

export default function ChatLeadForm({
  initialProduct = '',
  initialQuantity = '',
  onSubmitSuccess
}: ChatLeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại hoặc Zalo để nhận báo giá');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const requirements = `Yêu cầu báo giá từ Trợ lý AI:\nSản phẩm: ${initialProduct || 'Theo tư vấn trong chat'}\nSố lượng: ${quantity || 'Chưa rõ số lượng'}\nCông ty: ${company || 'Cá nhân/Chưa cập nhật'}`;

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name || 'Khách hàng B2B',
          company_name: company || 'Chưa cập nhật',
          phone,
          requirements
        })
      });

      if (!res.ok) {
        throw new Error('Không thể gửi thông tin');
      }

      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err: any) {
      console.error('Lead submit error:', err);
      setErrorMsg('Đã có lỗi khi lưu yêu cầu. Quý khách vui lòng gọi trực tiếp hotline 094 828 1881.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs flex items-center gap-2.5 my-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <p className="font-bold">Đã tiếp nhận yêu cầu báo giá thành công!</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            Đội ngũ kinh doanh DPCO sẽ liên hệ lại qua số <strong>{phone}</strong> trong vòng 15-30 phút làm việc.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 my-2 text-left space-y-2">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-2">
        <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider">
          Tiếp nhận báo giá nhanh
        </span>
        {initialProduct && (
          <span className="text-[10px] text-brand-green font-semibold bg-brand-green/10 px-1.5 py-0.5 rounded truncate max-w-[150px]">
            {initialProduct}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Họ và tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded outline-none focus:border-brand-green"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">
            Số điện thoại / Zalo <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xx xxx xxx"
            className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded outline-none focus:border-brand-green"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Công ty / Nhà máy</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Tên công ty"
            className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded outline-none focus:border-brand-green"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Số lượng dự kiến</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ví dụ: 500 hộp"
            className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded outline-none focus:border-brand-green"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-[11px] text-red-600 font-medium">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-2"
      >
        <Send className="w-3 h-3" />
        <span>{submitting ? 'Đang gửi...' : 'Gửi yêu cầu báo giá ngay'}</span>
      </button>
    </form>
  );
}
