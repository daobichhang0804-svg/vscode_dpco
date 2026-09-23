import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Certificate } from '../types';
import { 
  ZoomIn, 
  X, 
  Download, 
  ExternalLink,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificateViewerProps {
  className?: string;
  showAdminLink?: boolean;
}

interface DisplayCertificateItem {
  id: string;
  partnerName: string;
  publicUrl: string;
  fileName: string;
}

export default function CertificateViewer({
  className = '',
  showAdminLink = false,
}: CertificateViewerProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Lightbox modal state
  const [lightboxCert, setLightboxCert] = useState<DisplayCertificateItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Fetch certificates from Supabase
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setCertificates(data || []);
    } catch (err: any) {
      console.warn('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();

    // Realtime sync when certificates table changes
    const channel = supabase
      .channel('realtime_certificates_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'certificates' },
        () => {
          fetchCertificates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Keyboard handler for closing Lightbox on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxCert(null);
        setIsFullscreen(false);
      }
    };

    if (lightboxCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxCert]);

  // Handle direct file download
  const handleDownload = useCallback(async (url: string, fileName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'certificate.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'certificate.jpg';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Find Riverstone document from Supabase records or fallback
  const riverstoneCertFromDb = certificates.find((c) => {
    const name = (c.file_name || '').toLowerCase();
    const title = (c.title || '').toLowerCase();
    const path = (c.file_path || '').toLowerCase();
    return (
      name.includes('riverstone') ||
      name.includes('duc phong co., ltd authorized distribution letter') ||
      title.includes('riverstone') ||
      (path.includes('duc phong co., ltd authorized distribution letter') && !name.includes('suzuki'))
    );
  }) || certificates[0];

  // Find Suzuki Latex document from Supabase records or fallback
  const suzukiCertFromDb = certificates.find((c) => {
    const name = (c.file_name || '').toLowerCase();
    const title = (c.title || '').toLowerCase();
    const path = (c.file_path || '').toLowerCase();
    return (
      name.includes('suzuki') ||
      title.includes('suzuki') ||
      path.includes('suzuki')
    );
  }) || (certificates.length > 1 ? certificates[1] : undefined);

  // Strictly only 2 items with their respective names
  const items: DisplayCertificateItem[] = [
    {
      id: riverstoneCertFromDb?.id || 'riverstone-default',
      partnerName: 'Riverstone Resources Sdn. Bhd.',
      publicUrl: riverstoneCertFromDb?.public_url || 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/certificates/Duc%20Phong%20Co.,%20Ltd%20Authorized%20Distribution%20Letter%202025.jpg',
      fileName: riverstoneCertFromDb?.file_name || 'Riverstone Resources Sdn. Bhd. - Certificate.jpg',
    },
    {
      id: suzukiCertFromDb?.id || 'suzuki-default',
      partnerName: 'Suzuki Latex Industry Malaysia Sdn. Bhd.',
      publicUrl: suzukiCertFromDb?.public_url || 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/certificates/Suzuki%20Latex%20-%20Authorized%20Distributor%20DUC%20PHONG%20Y2026.jpg',
      fileName: suzukiCertFromDb?.file_name || 'Suzuki Latex Industry Malaysia Sdn. Bhd. - Certificate.jpg',
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Optional discrete admin link */}
      {showAdminLink && (
        <div className="flex justify-end mb-4">
          <Link
            to="/admin/certificates"
            className="text-xs text-zinc-400 hover:text-brand-green transition-colors"
          >
            Quản trị tài liệu
          </Link>
        </div>
      )}

      {/* Two-Column Side-by-Side Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxCert(item)}
            className="group cursor-pointer bg-white rounded-2xl border border-zinc-200/90 hover:border-brand-green/60 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Exactly only the partner title */}
            <div className="px-6 py-5 border-b border-zinc-100 bg-white group-hover:bg-zinc-50/70 transition-colors">
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-brand-green transition-colors leading-snug">
                {item.partnerName}
              </h3>
            </div>

            {/* Document Image Stage with interactive hover effect */}
            <div className="relative p-4 sm:p-6 bg-zinc-50/40 flex-1 flex items-center justify-center min-h-[460px] sm:min-h-[520px] md:min-h-[580px] overflow-hidden">
              <img
                src={item.publicUrl}
                alt={item.partnerName}
                className="w-full h-auto max-h-[620px] object-contain rounded-lg shadow-xs transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                loading="lazy"
              />

              {/* Elegant floating overlay with zoom effect */}
              <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white/95 text-zinc-900 text-xs sm:text-sm font-semibold rounded-full shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-brand-green animate-pulse" />
                  <span>Bấm để xem toàn bộ ảnh</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => {
            setLightboxCert(null);
            setIsFullscreen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header Bar */}
          <div 
            className="flex items-center justify-between text-white pb-3 sm:pb-4 border-b border-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm sm:text-lg font-bold text-zinc-100 truncate pr-4">
              {lightboxCert.partnerName}
            </h4>

            {/* Header Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleFullscreen}
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors hidden sm:inline-flex"
                title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
                aria-label="Toàn màn hình"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={(e) => handleDownload(lightboxCert.publicUrl, lightboxCert.fileName, e)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
                title="Tải ảnh về máy"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải về</span>
              </button>

              <a
                href={lightboxCert.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                title="Mở ảnh gốc trong tab mới"
                aria-label="Mở ảnh gốc"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setLightboxCert(null);
                  setIsFullscreen(false);
                }}
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/15 rounded-xl transition-colors"
                title="Đóng (ESC)"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image Canvas */}
          <div 
            className="flex-1 flex items-center justify-center p-1 sm:p-4 overflow-hidden"
            onClick={() => {
              setLightboxCert(null);
              setIsFullscreen(false);
            }}
          >
            <div 
              className="relative max-h-full max-w-full flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxCert.publicUrl}
                alt={lightboxCert.partnerName}
                className="max-h-[82vh] max-w-[96vw] md:max-w-[88vw] object-contain rounded-lg shadow-2xl bg-white"
              />
            </div>
          </div>

          {/* Footer Bar */}
          <div 
            className="text-center text-[11px] text-zinc-400 pt-2 border-t border-white/10 flex items-center justify-between cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-zinc-500">
              {lightboxCert.partnerName}
            </span>
            <span className="text-zinc-500">
              Nhấn <strong className="text-zinc-400">ESC</strong> hoặc bấm ra ngoài để đóng
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
