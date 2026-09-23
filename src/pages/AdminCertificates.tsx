import React from 'react';
import AdminCertificateUpload from '../components/AdminCertificateUpload';
import CertificateViewer from '../components/CertificateViewer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminCertificates() {
  return (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Quay lại trang chủ
          </Link>

          <Link
            to="/#certificates"
            className="text-xs font-semibold text-zinc-500 hover:text-brand-green transition-colors"
          >
            Xem khu vực chứng chỉ trên trang chủ
          </Link>
        </div>

        {/* Upload & Management Component */}
        <AdminCertificateUpload />

        {/* Live Preview of CertificateViewer Component */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Xem trước trực tiếp (Live Preview)
            </span>
            <h3 className="text-2xl font-bold text-zinc-900 mt-1">
              Giao diện hiển thị CertificateViewer trên website
            </h3>
            <p className="text-xs text-zinc-500 mt-2">
              Đây chính là thành phần React hiển thị tài liệu chứng chỉ cho khách hàng và đối tác trên website công khai.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm">
            <CertificateViewer showAdminLink={false} />
          </div>
        </div>

      </div>
    </div>
  );
}
