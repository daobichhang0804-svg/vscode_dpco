import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    'b2b.title': 'Nhận báo giá',
    'b2b.desc': 'Nhận báo giá',
    // Header
    'header.search': 'Tìm kiếm thiết bị phòng sạch, vật tư công nghiệp...',
    'header.home': 'Trang chủ',
    'header.products': 'Sản phẩm',
    'header.finger_cots': 'Bao ngón tay cao su',
    'header.nitrile_gloves': 'Găng tay Nitrile phòng sạch',
    'header.mechanical_shaft': 'Trục cơ khí chính xác',
    'header.cleanroom': 'Thiết bị phòng sạch',
    'header.consumables': 'Vật tư tiêu hao phòng sạch',
    'header.mechanical': 'Thiết bị cơ khí',
    'header.news': 'Tin tức & Blog',
    'header.about': 'Giới thiệu',
    'header.contact': 'Liên hệ',
    'header.quote': 'Yêu cầu báo giá nhanh',
    
    // Footer
    'footer.company': 'Công ty TNHH Thương Mại Đức Phong',
    'footer.hanoi': 'Văn phòng Hà Nội',
    'footer.hanoi.address': 'Số nhà 24, Ngõ 25 Phố Bùi Huy Bích, Phường Hoàng Mai, Hà Nội',
    'footer.dongnai': 'Văn phòng Đồng Nai',
    'footer.dongnai.address': 'Khu phố 1, Phường Long Hưng, Thành phố Biên Hòa, Đồng Nai',
    'footer.copyright': '© 2026 Công ty TNHH Thương Mại Đức Phong.',

    // Home
    'home.value': 'Giá trị của chúng tôi',
    'home.value.title': 'Xây dựng cho sự xuất sắc công nghiệp với',
    'home.value.highlight': 'các giải pháp phòng sạch tiên tiến',
    'home.value.desc': 'Kết hợp sự đổi mới, độ tin cậy và độ chính xác để chuyển đổi các hoạt động sản xuất hiện đại với hiệu quả và khả năng mở rộng cao hơn.',
    'home.explore': 'Khám phá thêm',
    'home.explore.desc': 'Tất cả những gì bạn cần biết trước khi bắt đầu tìm nguồn cung ứng.',
    'home.discover': 'Khám phá',
    'home.growth': 'Sự phát triển công nghiệp',
    'home.growth.desc': 'Khám phá cách các sản phẩm của chúng tôi chuyển đổi hiệu quả.',
    'home.start': 'Bắt đầu ngay',
    'home.customers': 'MẠNG LƯỚI KHÁCH HÀNG',
    'home.customers.desc': 'Khách hàng thường xuyên trên khắp toàn quốc',
    'home.supply': 'QUY MÔ CUNG ỨNG',
    'home.supply.desc': 'Đơn vị cung ứng mỗi năm',
    'home.experience': 'KINH NGHIỆM PHÂN PHỐI',
    'home.experience.desc': 'Năm làm đối tác phân phối',
    'home.stat.million': ' triệu +',
    'home.stat.plus': '+',
    'home.cert': 'Chứng nhận phân phối',
    'home.cert.desc': 'Đức Phong tự hào là nhà phân phối chính thức được ủy quyền từ các thương hiệu hàng đầu thế giới trong lĩnh vực phòng sạch.',
    'home.cert.riverstone': 'Nhà phân phối ủy quyền tại Việt Nam',
    'home.cert.suzuki': 'Đại lý Bán hàng và Tiếp thị được chỉ định',
    'home.partners': 'Đối tác chiến lược',
    'home.partners.title': 'Các nhà phân phối hàng đầu',
    'home.updates': 'Cập nhật mới nhất',
    'home.updates.desc': 'Thúc đẩy hoạt động thông minh hơn thông qua các giải pháp tiên tiến.',
    
    // Product
    'product.quickview': 'Xem nhanh',
    'product.addquote': 'Thêm báo giá',
    'product.details': 'Xem chi tiết',
    'product.contact': 'Liên hệ báo giá',
    'product.specs': 'Thông số kỹ thuật',
    'product.availability': 'Tình trạng',
    'product.inStock': 'Còn hàng',
    'product.outOfStock': 'Hết hàng',
    'product.compare': 'So sánh',
    'product.description': 'Mô tả sản phẩm',
    'product.specifications': 'Thông số',
    'product.related': 'Sản phẩm tương tự',

    // Cart
    'cart.title': 'Danh sách báo giá',
    'cart.empty': 'Chưa có sản phẩm nào.',
    'cart.submit': 'Gửi yêu cầu báo giá',

    // Compare
    'compare.title': 'So sánh sản phẩm',
    'compare.empty': 'Chưa có sản phẩm nào để so sánh.',
    'compare.limit': 'Chỉ có thể so sánh tối đa 4 sản phẩm.',
    'compare.search': 'Nhập tên sản phẩm...',
    'compare.list': 'Danh sách:',
    'compare.products': 'sản phẩm',
    'compare.add': 'Thêm sản phẩm khác',
    'compare.add_nth': 'Thêm sản phẩm thứ',
    'compare.submit': 'Gửi danh sách này để yêu cầu báo giá hàng loạt',

    // Contact
    'contact.title': 'Liên hệ',
    'contact.desc': 'Vui lòng điền thông tin để nhận báo giá hoặc tư vấn kỹ thuật.',
    'contact.success': 'Gửi yêu cầu thành công',
    'contact.submit.another': 'Gửi yêu cầu khác',
    'contact.form.title': 'Biểu mẫu B2B',
    'contact.form.name': 'Họ và tên',
    'contact.form.position': 'Chức vụ',
    'contact.form.company': 'Công ty / Nhà máy',
    'contact.form.tax': 'Mã số thuế',
    'contact.form.phone': 'Số điện thoại / Zalo',
    'contact.form.email': 'Email',
    'contact.form.requirements': 'Yêu cầu chi tiết',
    'contact.form.attachments': 'Tài liệu đính kèm (BOM/Specs)',
    'contact.form.submit': 'Gửi yêu cầu',
    'contact.office': 'Thông tin văn phòng',
    'contact.hq': 'Trụ sở chính',
    'contact.hq.addr': 'Số 123 Đường Công Nghiệp, Khu Công Nghệ Cao, Hà Nội, Việt Nam',
    'contact.direct': 'Đường dây nóng',
    'contact.sales': 'Kinh doanh',
    'contact.tech': 'Hỗ trợ kỹ thuật',
    'contact.hours': 'Giờ làm việc',

    // Blog
    'blog.title': 'Tin tức & Cập nhật',
    'blog.desc': 'Những xu hướng mới nhất về công nghệ phòng sạch',
    'blog.read': 'Đọc tiếp',

    // Catalog
    'catalog.title': 'Thiết bị phòng sạch & vật tư',
    'catalog.desc': 'Toàn bộ danh mục sản phẩm công nghiệp',
    'catalog.filter': 'Loại',
    'catalog.search': 'Tìm sản phẩm...',
  },
  en: {
    'b2b.title': 'Nhận báo giá',
    'b2b.desc': 'Nhận báo giá',
    // Header
    'header.search': 'Search cleanroom equipment, industrial supplies...',
    'header.home': 'Home',
    'header.products': 'Products',
    'header.finger_cots': 'Rubber Finger Cots',
    'header.nitrile_gloves': 'Cleanroom Nitrile Gloves',
    'header.mechanical_shaft': 'Precision Mechanical Shaft',
    'header.cleanroom': 'Cleanroom Equipment',
    'header.consumables': 'Cleanroom Consumables',
    'header.mechanical': 'Mechanical Equipment',
    'header.news': 'News & Blog',
    'header.about': 'About Us',
    'header.contact': 'Contact',
    'header.quote': 'Request Quick Quote',
    
    // Footer
    'footer.company': 'Duc Phong Trading Co., Ltd',
    'footer.hanoi': 'Hanoi Office',
    'footer.hanoi.address': 'No. 24, Alley 25 Bui Huy Bich Street, Hoang Mai District, Hanoi',
    'footer.dongnai': 'Dong Nai Office',
    'footer.dongnai.address': 'Quarter 1, Long Hung Ward, Bien Hoa City, Dong Nai',
    'footer.copyright': '© 2026 Duc Phong Trading Co., Ltd.',

    // Home
    'home.value': 'Our Value',
    'home.value.title': 'Built for industrial excellence with',
    'home.value.highlight': 'advanced cleanroom solutions',
    'home.value.desc': 'Combining innovation, reliability, and precision to transform modern manufacturing operations with greater efficiency and scalability.',
    'home.explore': 'Explore More Categories',
    'home.explore.desc': 'All you need to know before you begin sourcing.',
    'home.discover': 'Discover',
    'home.growth': 'Industrial Growth',
    'home.growth.desc': 'Discover how our products transform efficiency.',
    'home.start': 'Start Now',
    'home.customers': 'CLIENT NETWORK',
    'home.customers.desc': 'Regular customers nationwide',
    'home.supply': 'SUPPLY SCALE',
    'home.supply.desc': 'Supply units per year',
    'home.experience': 'DISTRIBUTION EXPERIENCE',
    'home.experience.desc': 'Years as distribution partner',
    'home.stat.million': 'M+',
    'home.stat.plus': '+',
    'home.cert': 'Distribution Certificates',
    'home.cert.desc': 'Duc Phong is proud to be the authorized official distributor from world-leading brands in the cleanroom sector.',
    'home.cert.riverstone': 'Authorized Distributor in Vietnam',
    'home.cert.suzuki': 'Appointed Sales and Marketing Agent',
    'home.partners': 'Strategic Partners',
    'home.partners.title': 'Top Distributors',
    'home.updates': 'Recent Updates',
    'home.updates.desc': 'Driving smarter operations through advanced solutions.',
    
    // Product
    'product.quickview': 'Quick View',
    'product.addquote': 'Add to Quote',
    'product.details': 'View Details',
    'product.contact': 'Contact for Quote',
    'product.specs': 'Specifications',
    'product.availability': 'Availability',
    'product.inStock': 'In stock',
    'product.outOfStock': 'Out of stock',
    'product.compare': 'Compare',
    'product.description': 'Product Description',
    'product.specifications': 'Specifications',
    'product.related': 'Related Products',

    // Cart
    'cart.title': 'Quote List',
    'cart.empty': 'No items yet.',
    'cart.submit': 'Submit Quote Request',

    // Compare
    'compare.title': 'Product Comparison',
    'compare.empty': 'No products to compare.',
    'compare.limit': 'You can only compare up to 4 products.',
    'compare.search': 'Enter product name...',
    'compare.list': 'List:',
    'compare.products': 'products',
    'compare.add': 'Add another product',
    'compare.add_nth': 'Add product #',
    'compare.submit': 'Submit this list for a bulk quote request',

    // Contact
    'contact.title': 'Contact Us',
    'contact.desc': 'Please fill in the information to receive a quote or technical advice.',
    'contact.success': 'Request Submitted',
    'contact.submit.another': 'Submit Another Request',
    'contact.form.title': 'B2B Inquiry Form',
    'contact.form.name': 'Full Name',
    'contact.form.position': 'Position',
    'contact.form.company': 'Company / Factory',
    'contact.form.tax': 'Tax Code',
    'contact.form.phone': 'Phone / Zalo',
    'contact.form.email': 'Email',
    'contact.form.requirements': 'Requirements',
    'contact.form.attachments': 'Attachments (BOM/Specs)',
    'contact.form.submit': 'Send Request',
    'contact.office': 'Office Info',
    'contact.hq': 'Headquarters',
    'contact.hq.addr': 'No. 123 Industrial St, High Tech Park, Hanoi, Vietnam',
    'contact.direct': 'Direct Lines',
    'contact.sales': 'Sales',
    'contact.tech': 'Tech Support',
    'contact.hours': 'Operating Hours',

    // Blog
    'blog.title': 'News & Updates',
    'blog.desc': 'Latest trends in cleanroom technology',
    'blog.read': 'Read More',

    // Catalog
    'catalog.title': 'Cleanroom Equipment & Supplies',
    'catalog.desc': 'Full industrial product catalog',
    'catalog.filter': 'Filter',
    'catalog.search': 'Search products...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
