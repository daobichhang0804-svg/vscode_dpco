import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import { getRohsFileBySku } from '../data/rohsMapping';
import { useState, useEffect } from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { convertDriveUrl } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { handleAddToCart, openQuote } = useOutletContext<any>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { products, getProductById } = useProducts();

  const product = getProductById(id) || products[0];
  const rohsFile = getRohsFileBySku(product?.sku, product?.name);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const mainImage = selectedImage || product?.image;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizeOptions = product.specs.size
    ? product.specs.size.split('-').map(s => s.trim()).filter(Boolean)
    : ['S 15mm'];
  const activeSize = selectedSize || sizeOptions[0];

  useEffect(() => {
    setSelectedImage(null);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="text-zinc-500">Đang tải sản phẩm...</p>
      </div>
    );
  }

  const thumbnails = [
    product.image,
    '/images/product-thumb-1.jpg',
    '/images/product-thumb-2.jpg',
    '/images/product-thumb-3.jpg'
  ];

  const labelMap: Record<string, string> = {
    color: 'Màu sắc',
    material: 'Chất liệu',
    size: 'Kích thước / Cấp độ sạch',
    diameter: 'Đường kính',
    cleanroomClass: 'Cấp độ phòng sạch',
    type: 'Loại viền / Kiểu',
    powder: 'Độ bột (powder)',
    sulphur: 'Sulphur',
    chlorine: 'Chlorine',
    siliconeOil: 'Silicone Oil',
    static: 'Độ tĩnh điện',
    length: 'Chiều dài',
    thickness: 'Độ dày',
    surface: 'Bề mặt',
    packaging: 'Quy cách đóng gói'
  };

  return (
    <div className="pb-20">
      {/* BREADCRUMB */}
      <div className="py-6 border-b border-zinc-200 text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-12 flex items-center gap-3 container">
        <Link to="/" className="hover:text-brand-green transition-colors">{t('header.home')}</Link> <span className="text-zinc-300">/</span>
        <Link to="/collections/all" className="hover:text-brand-green transition-colors">{product.category}</Link> <span className="text-zinc-300">/</span>
        <span className="text-zinc-900">{product.name}</span>
      </div>

      <div className="container">
        
        {/* 1. KHỐI GIỚI THIỆU SẢN PHẨM */}
        <section className="product-layout mb-20 flex flex-col lg:grid">
          {/* Gallery Ảnh sản phẩm */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] border border-zinc-200 bg-white flex items-center justify-center p-8 relative overflow-hidden group">
               {/* Technical decorative elements */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-300"></div>
               <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-300"></div>
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-zinc-300"></div>
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-300"></div>
              
              <img 
                src={convertDriveUrl(mainImage)} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/f4f5f7/007a3d?text=Product+Image' }}
              />
            </div>
            <div className="flex gap-4">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`flex-1 aspect-square border bg-white p-2 transition-all ${mainImage === thumb ? 'border-brand-green shadow-sm' : 'border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100'}`}
                >
                  <img src={convertDriveUrl(thumb)} className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { e.currentTarget.src = 'https://placehold.co/70x70/f4f5f7/007a3d?text=Thumb' }}/>
                </button>
              ))}
            </div>
          </div>

          {/* Thông tin chi tiết & Báo giá */}
          <div className="flex flex-col">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Model No. DP-{product.id.split('-')[0].toUpperCase()}</div>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[12px] uppercase tracking-wider text-zinc-500 mb-8 pb-8 border-b border-zinc-200">
              <div>Brand <br/><b className="text-zinc-900 text-sm">{product.brand}</b></div>
              <div>Category <br/><b className="text-zinc-900 text-sm">{product.category}</b></div>
              <div>Status <br/><b className="text-brand-green text-sm">Available for Quote</b></div>
            </div>

            <div className="text-3xl font-light text-zinc-900 mb-8">
              <span className="text-brand-green font-medium">{t('product.contact')}</span>
            </div>

            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-300"></div> Option Type
              </div>
              <div className="flex gap-3">
                <button className="border border-brand-green bg-brand-green text-white font-medium px-6 py-2 text-[13px] shadow-sm">Cut</button>
                <button className="border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 font-medium px-6 py-2 text-[13px] transition-colors">Roll</button>
              </div>
            </div>

                        <div className="mb-8">
              <div className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-300"></div> Dimensions: {activeSize}
              </div>
              <div className="flex flex-wrap gap-3">
                {sizeOptions.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(size)}
                    className={`border font-medium px-6 py-2 text-[13px] transition-colors ${
                      activeSize === size
                        ? 'border-brand-green bg-brand-green text-white shadow-sm'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={openQuote}
              className="w-full bg-zinc-900 text-white border border-zinc-900 py-4 text-[13px] uppercase tracking-widest font-bold cursor-pointer mt-auto text-center hover:bg-brand-green hover:border-brand-green transition-all"
              >
              {t('product.addquote')}
            </button>
          </div>

          {/* Sidebar chính sách */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-zinc-200 p-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">Compliance
                </div>
                <div className="text-[13px] text-zinc-600 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5">■</span> <div>Quality system MS ISO 9001: 2015</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5">■</span> <div>Environmental system MS ISO 14001: 2015</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-zinc-200 mt-6 pt-6">
                 <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Value Prop</div>
                 <div className="text-[12px] text-zinc-600 space-y-2">
                    <p>• Flexible MOQ discounts</p>
                    <p>• Strict lot-by-lot control</p>
                    <p>• OEM support available</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 & 3. KHỐI MÔ TẢ & THÔNG SỐ KỸ THUẬT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 border-t border-zinc-200 pt-16">
          {/* Mô tả sản phẩm */}
          <div>
            <h2 className="text-xl font-light text-zinc-900 mb-6">{t('product.description')}</h2>
            <div className="text-[14px] leading-relaxed text-zinc-600 space-y-5">
              <p><b>{product.name}</b></p>
              <p><b>Nhà sản xuất:</b> {product.brand} | <b>Danh mục:</b> {product.category}</p>
              {product.category?.includes('Găng tay') ? (
                <p>Là sản phẩm găng tay nitrile phòng sạch cao cấp thương hiệu {product.brand}, được thiết kế chuyên dụng cho môi trường phòng sạch Class 100 và Class 1000. Sản phẩm không bột (powder-free), hàm lượng ion và hạt bụi cực thấp, chống tĩnh điện ESD an toàn, bề mặt tạo độ bám tối ưu giúp thao tác chính xác với các linh kiện bán dẫn và thiết bị điện tử siêu nhạy cảm.</p>
              ) : product.category?.includes('Trục') ? (
                <p>Là chi tiết cơ khí siêu chính xác được chế tạo bởi {product.brand} bằng thép không gỉ chất lượng cao. Sản phẩm đáp ứng yêu cầu khắt khe về độ đồng tâm, độ nhẵn bóng bề mặt và khả năng chịu tải quay tốc độ cao, phù hợp cho các cụm truyền động servo, robot công nghiệp và động cơ bước.</p>
              ) : (
                <>
                  <p>Là vật tư tiêu hao đạt chuẩn chuyên dùng trong các dây chuyền sản xuất như linh kiện điện, điện tử, thiết bị y tế... Sản phẩm được làm từ cao su tự nhiên (Latex), ôm sát ngón tay giúp công nhân thao tác linh hoạt, chính xác. Thiết kế sản phẩm đa dạng từ dạng cut, dạng cuộn (roll) tiện lợi, dễ đeo/tháo, đạt độ sạch tiêu chuẩn giúp ngăn ngừa việc để lại dấu vân tay, hay mồ hôi lên bề mặt sản phẩm.</p>
                  {product.name.includes('Lite') && (
                    <p><b>Điểm khác biệt so với Spore Ordinary:</b><br/>
                    - Spore Ordinary: màu vàng nhạt, không tĩnh điện<br/>
                    - Spore Lite II Ordinary: màu trắng, độ tĩnh điện E10 - E12 Ohm/square</p>
                  )}
                </>
              )}
              
              <div className="mt-8 border-t border-zinc-200 pt-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">ROHS Test / Certificate</h3>
                <p className="text-sm text-zinc-500 mb-4">Official compliance documentation for this product.</p>
                {rohsFile ? (
                  <div className="border border-zinc-200 bg-zinc-50 rounded p-1">
                    <div className="w-full aspect-[1/1.414] bg-white max-h-[500px]">
                      <iframe src={rohsFile} className="w-full h-full border-0" title={`ROHS Test for ${product.name}`} />
                    </div>
                    <div className="p-4 flex gap-3 justify-end border-t border-zinc-200 mt-1">
                      <a href={rohsFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-zinc-600 hover:text-brand-green uppercase transition-colors px-3 py-2 border border-transparent hover:border-brand-green/20 rounded">
                        Open in New Tab
                      </a>
                      <a href={rohsFile} download className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-white bg-brand-green hover:bg-brand-green/90 uppercase transition-colors px-4 py-2 rounded shadow-sm">
                        <Download className="w-4 h-4" /> Download Certificate
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded text-sm text-zinc-500 italic">
                    ROHS Certificate is currently unavailable.
                  </div>
                )}
              </div>

              <img src="/images/product-detail-bg.jpg" alt="Overview" className="w-full border border-zinc-200 mt-6" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>

          {/* Thông số kỹ thuật */}
          <div>
            <h2 className="text-xl font-light text-zinc-900 mb-6">{t('product.specifications')}</h2>
            <div className="border border-zinc-200 bg-white">
              <table className="w-full border-collapse text-[12px]">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => {
                    if (!value) return null;
                    return (
                      <tr key={key} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-5 font-bold text-zinc-900 uppercase tracking-wider w-[40%]">
                          {labelMap[key] || key}
                        </td>
                        <td className="py-3 px-5 text-zinc-600">
                          {value}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. KHỐI SẢN PHẨM LIÊN QUAN */}
        <section className="border-t border-zinc-200 pt-16">
          <div className="flex items-end justify-between mb-8">
             <div>
               <h2 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">{t('product.related')}</h2>
               <p className="text-sm text-zinc-500 mt-1">Explore similar industrial solutions.</p>
             </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.filter(p => p.id !== product.id).slice(0, 5).map(p => (
              <div key={p.id} className="border border-zinc-200 p-4 bg-white hover:border-brand-green/40 transition-all flex flex-col group cursor-pointer" onClick={() => {
                navigate(`/product/${p.id}`);
                window.scrollTo(0, 0);
              }}>
                <div className="aspect-square p-2 mb-4">
                  <img src={convertDriveUrl(p.image)} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/f4f5f7/007a3d?text=Product' }} />
                </div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{p.brand}</div>
                <h4 className="text-[13px] font-medium text-zinc-900 mb-2 truncate group-hover:text-brand-green transition-colors">{p.name}</h4>
                <div className="mt-auto pt-3 border-t border-zinc-100 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-brand-green">Contact</span>
                   <span className="text-zinc-400 group-hover:text-brand-green text-sm">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
