const fs = require('fs');

let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const replacements = [
  ["'home.updates': 'Cập Nhật Mới Nhất'", "'home.updates': 'Cập nhật mới nhất'"],
  ["'home.cert': 'Chứng Nhận Phân Phối'", "'home.cert': 'Chứng nhận phân phối'"],
  ["'home.partners': 'Đối Tác Chiến Lược'", "'home.partners': 'Đối tác chiến lược'"],
  ["'product.quickview': 'Xem Nhanh'", "'product.quickview': 'Xem nhanh'"],
  ["'product.addquote': 'Thêm Báo Giá'", "'product.addquote': 'Thêm báo giá'"],
  ["'product.details': 'Xem Chi Tiết'", "'product.details': 'Xem chi tiết'"],
  ["'product.description': 'Mô Tả Sản Phẩm'", "'product.description': 'Mô tả sản phẩm'"],
  ["'product.specifications': 'Thông Số'", "'product.specifications': 'Thông số'"],
  ["'product.related': 'Sản Phẩm Tương Tự'", "'product.related': 'Sản phẩm tương tự'"],
  ["'cart.title': 'Danh Sách Báo Giá'", "'cart.title': 'Danh sách báo giá'"],
  ["'cart.submit': 'Gửi Yêu Cầu Báo Giá'", "'cart.submit': 'Gửi yêu cầu báo giá'"],
  ["'contact.title': 'Liên Hệ'", "'contact.title': 'Liên hệ'"],
  ["'contact.success': 'Gửi Yêu Cầu Thành Công'", "'contact.success': 'Gửi yêu cầu thành công'"],
  ["'contact.submit.another': 'Gửi Yêu Cầu Khác'", "'contact.submit.another': 'Gửi yêu cầu khác'"],
  ["'contact.form.title': 'Biểu Mẫu B2B'", "'contact.form.title': 'Biểu mẫu B2B'"],
  ["'contact.form.submit': 'Gửi Yêu Cầu'", "'contact.form.submit': 'Gửi yêu cầu'"],
  ["'contact.office': 'Thông Tin Văn Phòng'", "'contact.office': 'Thông tin văn phòng'"],
  ["'contact.hq': 'Trụ Sở Chính'", "'contact.hq': 'Trụ sở chính'"],
  ["'contact.direct': 'Đường Dây Nóng'", "'contact.direct': 'Đường dây nóng'"],
  ["'contact.hours': 'Giờ Làm Việc'", "'contact.hours': 'Giờ làm việc'"],
  ["'blog.title': 'Tin Tức & Cập Nhật'", "'blog.title': 'Tin tức & cập nhật'"],
  ["'blog.read': 'Đọc Tiếp'", "'blog.read': 'Đọc tiếp'"],
  ["'catalog.title': 'Thiết Bị Phòng Sạch & Vật Tư'", "'catalog.title': 'Thiết bị phòng sạch & vật tư'"],
  ["'catalog.filter': 'Bộ Lọc'", "'catalog.filter': 'Bộ lọc'"],
];

for (const [search, replace] of replacements) {
  content = content.replace(search, replace);
}

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
