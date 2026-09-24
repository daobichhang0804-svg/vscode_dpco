export function convertDriveUrl(driveUrl: string): string {
  if (!driveUrl) return 'https://placehold.co/400x500/f4f5f7/007a3d?text=No+Image';
  
  // Tìm FILE_ID từ chuỗi link
  const regExp = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
  const match = driveUrl.match(regExp);
  
  if (match) {
      const fileId = match[1] || match[2];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  // Nếu dữ liệu trong Sheet đã là ID sẵn
  if (driveUrl.length > 20 && !driveUrl.includes('/')) {
      return `https://lh3.googleusercontent.com/d/${driveUrl}`;
  }

  return driveUrl;
}

export function toSlug(str: string): string {
  return str
    .normalize('NFD')                    // tách chữ và dấu
    .replace(/[\u0300-\u036f]/g, '')     // bỏ dấu
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')        // bỏ ký tự lạ
    .replace(/\s+/g, '-')                // khoảng trắng → gạch ngang
    .replace(/-+/g, '-');                // gộp gạch ngang liên tiếp
}