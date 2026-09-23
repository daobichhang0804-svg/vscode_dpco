import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Certificate } from '../types';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock, 
  Unlock, 
  RefreshCw,
  FileCheck,
  HardDrive,
  Info
} from 'lucide-react';

const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];

export default function AdminCertificateUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; details?: string } | null>(null);
  
  // Existing certificates list
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Supabase Auth state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showAuthCard, setShowAuthCard] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check current session
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setCurrentUser(data?.session?.user || null);
      } catch (err) {
        console.warn('Auth check error:', err);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch certificates list
  const fetchCertificates = async () => {
    try {
      setLoadingList(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (err: any) {
      console.warn('Error loading certificates:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    const lowerName = file.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    const hasValidMime = ALLOWED_TYPES.includes(file.type) || hasValidExt;

    if (!hasValidMime) {
      setStatusMessage({
        type: 'error',
        text: 'Định dạng file không được hỗ trợ',
        details: 'Hệ thống chỉ chấp nhận file PDF, JPG, JPEG, PNG hoặc WEBP.'
      });
      return false;
    }

    if (file.size > 50 * 1024 * 1024) {
      setStatusMessage({
        type: 'error',
        text: 'Dung lượng file quá lớn',
        details: 'Vui lòng chọn file dưới 50MB.'
      });
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    setStatusMessage(null);
    if (!validateFile(file)) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    // Auto-generate a clean, professional title from file name
    const rawName = file.name.replace(/\.[^/.]+$/, '');
    setTitle(rawName);
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Upload to Supabase Storage & Insert to certificates table
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng chọn file tài liệu trước khi bấm tải lên.'
      });
      return;
    }

    const documentTitle = title.trim() || selectedFile.name;

    try {
      setUploading(true);
      setUploadProgress(15);
      setStatusMessage(null);

      // Create unique sanitized storage path
      const timestamp = Date.now();
      const sanitizedName = selectedFile.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove Vietnamese accents for safe URL
        .replace(/[^a-zA-Z0-9._-]/g, '_');
      const storageFilePath = `${timestamp}_${sanitizedName}`;

      setUploadProgress(40);

      // 1. Upload to Supabase bucket 'certificates'
      const { data: storageData, error: storageError } = await supabase.storage
        .from('certificates')
        .upload(storageFilePath, selectedFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: selectedFile.type || 'application/octet-stream'
        });

      if (storageError) {
        throw new Error(`Lỗi tải lên Supabase Storage: ${storageError.message}`);
      }

      setUploadProgress(75);

      // 2. Retrieve public URL
      const { data: urlData } = supabase.storage
        .from('certificates')
        .getPublicUrl(storageData?.path || storageFilePath);

      const publicUrl = urlData.publicUrl;

      setUploadProgress(90);

      // 3. Save metadata into 'certificates' table
      const { data: insertData, error: insertError } = await supabase
        .from('certificates')
        .insert([
          {
            title: documentTitle,
            file_name: selectedFile.name,
            file_path: storageData?.path || storageFilePath,
            file_type: selectedFile.type || 'application/octet-stream',
            file_size: selectedFile.size,
            public_url: publicUrl,
          }
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(`Lỗi lưu thông tin vào bảng 'certificates': ${insertError.message}`);
      }

      setUploadProgress(100);
      setStatusMessage({
        type: 'success',
        text: `Tải lên thành công: "${documentTitle}"`,
        details: `Đã lưu vào bucket 'certificates' và ghi nhận vào bảng cơ sở dữ liệu.`
      });

      // Reset file input
      setSelectedFile(null);
      setTitle('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Refresh list
      fetchCertificates();

    } catch (err: any) {
      console.error('Upload failed:', err);
      setStatusMessage({
        type: 'error',
        text: 'Tải lên không thành công',
        details: err?.message || 'Vui lòng kiểm tra lại quyền truy cập hoặc cấu hình Supabase RLS.'
      });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Delete certificate
  const handleDelete = async (cert: Certificate) => {
    if (!window.confirm(`Bạn có chắc muốn xóa chứng nhận "${cert.title || cert.file_name}"?`)) {
      return;
    }

    try {
      setDeletingId(cert.id);

      // Delete storage file
      if (cert.file_path) {
        await supabase.storage.from('certificates').remove([cert.file_path]);
      }

      // Delete table row
      const { error: dbError } = await supabase
        .from('certificates')
        .delete()
        .eq('id', cert.id);

      if (dbError) throw dbError;

      setCertificates((prev) => prev.filter((c) => c.id !== cert.id));
      setStatusMessage({
        type: 'success',
        text: `Đã xóa chứng nhận "${cert.title || cert.file_name}".`
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Lỗi khi xóa chứng nhận',
        details: err?.message
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = (cert: Certificate) => {
    navigator.clipboard.writeText(cert.public_url);
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Admin login via Supabase Auth
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAuthLoading(true);
      setAuthError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) throw error;
      setCurrentUser(data.user);
      setShowAuthCard(false);
      setAdminPassword('');
    } catch (err: any) {
      setAuthError(err?.message || 'Đăng nhập không thành công');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Top Banner / Auth Status Bar */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
              Khu vực Quản trị & Chứng chỉ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Quản lý Thư ủy quyền & Chứng nhận
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Tải lên tài liệu PDF, chứng nhận Riverstone, Suzuki Latex hoặc giấy tờ phân phối chính thức vào Supabase Storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-zinc-50 px-4 py-2 rounded-2xl border border-zinc-200">
              <div className="w-8 h-8 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-xs">
                <Unlock className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-zinc-800">Admin đã đăng nhập</div>
                <div className="text-zinc-500 truncate max-w-[150px]">{currentUser.email}</div>
              </div>
              <button
                onClick={handleAdminLogout}
                className="ml-2 text-xs text-zinc-400 hover:text-red-600 transition-colors"
                title="Đăng xuất"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthCard(!showAuthCard)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              {showAuthCard ? 'Ẩn đăng nhập Admin' : 'Đăng nhập tài khoản Admin'}
            </button>
          )}
        </div>
      </div>

      {/* Supabase Auth Modal/Card if needed */}
      {showAuthCard && !currentUser && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Đăng nhập tài khoản quản trị Supabase</h3>
            <p className="text-xs text-zinc-500 mb-6">
              Sử dụng tài khoản quản trị viên trong bảng <code>auth.users</code> của Supabase để có quyền ghi dữ liệu bảo mật RLS.
            </p>

            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Email quản trị</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@dpco.com.vn"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="flex-1 py-2.5 rounded-xl bg-brand-green text-white text-xs font-semibold hover:bg-brand-green-dark transition-colors disabled:opacity-50"
                >
                  {authLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthCard(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 text-xs font-semibold hover:bg-zinc-50"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <form onSubmit={handleUpload} className="space-y-6">
          
          {/* File Picker & Drag-and-drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-brand-green bg-brand-green/5 scale-[1.01]' 
                : 'border-zinc-300 hover:border-brand-green/50 hover:bg-zinc-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-base font-bold text-zinc-900 mb-1">
              Kéo & thả file chứng nhận vào đây, hoặc <span className="text-brand-green hover:underline">chọn từ máy tính</span>
            </h4>
            
            <p className="text-xs text-zinc-500 max-w-md mx-auto mb-4">
              Hỗ trợ: <strong>PDF</strong>, <strong>JPG</strong>, <strong>PNG</strong>, <strong>WEBP</strong> (tối đa 50MB).
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-medium">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              Ví dụ: Duc Phong Co., Ltd Authorized Distribution Letter 2025.pdf
            </div>
          </div>

          {/* Selected File Details Box */}
          {selectedFile && (
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-brand-green shadow-xs">
                    {selectedFile.type.includes('pdf') || selectedFile.name.endsWith('.pdf') ? (
                      <FileText className="w-5 h-5 text-red-500" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-brand-green" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900 truncate max-w-sm sm:max-w-md">
                      {selectedFile.name}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                      <span>Loại: <strong className="font-mono text-zinc-700">{selectedFile.type || 'PDF/Document'}</strong></span>
                      <span>•</span>
                      <span>Dung lượng: <strong className="font-mono text-zinc-700">{formatFileSize(selectedFile.size)}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setTitle('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-200/50"
                  title="Hủy chọn file"
                >
                  ✕
                </button>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Tiêu đề hiển thị trên website
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Thư ủy quyền phân phối chính thức Suzuki Latex 2025"
                  className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                />
                <p className="text-[11px] text-zinc-400 mt-1">
                  Tiêu đề này sẽ hiển thị làm đề mục chính cho khách hàng khi xem chứng nhận.
                </p>
              </div>
            </div>
          )}

          {/* Upload Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-zinc-600">
                <span>Đang tải lên Supabase Storage...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-green transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className={`p-4 rounded-2xl border text-xs ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-start gap-2.5">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">{statusMessage.text}</div>
                  {statusMessage.details && (
                    <div className="mt-1 text-zinc-600 font-mono text-[11px]">{statusMessage.details}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upload Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-sm ${
                !selectedFile || uploading
                  ? 'bg-zinc-300 cursor-not-allowed'
                  : 'bg-brand-green hover:bg-brand-green-dark active:scale-95'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              {uploading ? 'Đang tiến hành tải lên...' : 'Bắt đầu tải lên Supabase'}
            </button>
          </div>

        </form>
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              Danh sách tài liệu đã lưu trên Supabase ({certificates.length})
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Các tài liệu này sẽ hiển thị trực tiếp trong bộ xem chứng chỉ trên website.
            </p>
          </div>

          <button
            onClick={fetchCertificates}
            disabled={loadingList}
            className="p-2 text-zinc-500 hover:text-zinc-800 rounded-xl hover:bg-zinc-100 transition-colors"
            title="Tải lại danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin text-brand-green' : ''}`} />
          </button>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-200 rounded-2xl">
            <FileCheck className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm text-zinc-500 font-medium">Chưa có chứng nhận nào trong cơ sở dữ liệu.</p>
            <p className="text-xs text-zinc-400 mt-1">Hãy sử dụng khung tải lên ở trên để thêm tài liệu mới.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-semibold border-y border-zinc-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Tài liệu / Tiêu đề</th>
                  <th className="py-3 px-4">Tên file</th>
                  <th className="py-3 px-4">Dung lượng</th>
                  <th className="py-3 px-4">Ngày tạo</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {certificates.map((cert) => {
                  const isPdf = cert.file_type?.includes('pdf') || cert.file_name?.endsWith('.pdf');
                  return (
                    <tr key={cert.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          {isPdf ? (
                            <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-brand-green flex-shrink-0" />
                          )}
                          <div className="font-bold text-zinc-900 max-w-xs truncate">
                            {cert.title || cert.file_name}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-zinc-500 max-w-[180px] truncate">
                        {cert.file_name}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-zinc-600">
                        {formatFileSize(cert.file_size)}
                      </td>

                      <td className="py-3.5 px-4 text-zinc-500">
                        {new Date(cert.created_at).toLocaleDateString('vi-VN')}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleCopyUrl(cert)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
                            title="Sao chép Public URL"
                          >
                            {copiedId === cert.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <a
                            href={cert.public_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-zinc-400 hover:text-brand-green rounded-lg hover:bg-zinc-100 transition-colors"
                            title="Mở tài liệu"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDelete(cert)}
                            disabled={deletingId === cert.id}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 transition-colors"
                            title="Xóa tài liệu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
