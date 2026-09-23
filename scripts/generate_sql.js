import fs from 'fs';

const raw = `,Tên,,Hãng,Màu sắc,,Chất liệu,Kích thước (đường kính,Loại,Độ bột,Sulphur,Chlorine,Silicone Oil,Độ tĩnh điện,Chiều dài bao ngón,Độ dày bao ngón,Bề mặt,Quy cách,,,,,,,,,,,,,,,,,,,,,,
,Spore Ordinary,Bao ngón cao su ,Suzuki Latex,Vàng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Shortcut | Roll | Unroll,có bột,có,không,không,không,63 ± 2 mm (Shortcut 45 ± 2 mm),0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,Yes,,SP028-1,http://hstatic.net/770/1000108770/1/2016/8-8/pr_234b308d-69a7-41f0-76be-fca0b83b4e48.jpg,Mô tả hình ảnh,Áo dài cách tân Sara,Áo dài cách tân Sara thêu hoa,Sản phẩm nổi bật,hot-products,http://hstatic.net/770/1000108770/1/2016/8-8/pr_234b308d-69a7-41f0-76be-fca0b83b4e48.jpg,
,Spore Clean,Bao ngón cao su ,Suzuki Latex,Vàng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Roll | Unroll,ít bột,có,không,không,không,63 ± 2 mm,0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,,Mô tả hình ảnh,,,,,,
,Spore Chlorinated,Bao ngón cao su ,Suzuki Latex,Vàng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Shortcut | Roll | Unroll,không bột,có,có,không,không,63 ± 2 mm (Shortcut 45 ± 2 mm),0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,lấy ảnh NSX,Mô tả hình ảnh,,,,,,
,Spore Lite II Ordinary,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Shortcut |  Roll,có bột,có,không,không,10¹⁰ ~ 10¹² Ohm/square,63 ± 2 mm (Shortcut 45 ± 2 mm),0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,,Mô tả hình ảnh,,,,,,
,Spore Lite II Clean,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut |  Roll,ít bột,có,không,không,10¹⁰ ~ 10¹² Ohm/square,63 ± 2 mm,0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,Yes,,SP022-5,,Mô tả hình ảnh,,,Sản phẩm nổi bật,hot-products,http://hstatic.net/770/1000108770/1/2016/8-8/pr106.jpg,No
,Spore Lite II Chlorinated,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Roll,không bột,có,có,không,10¹⁰ ~ 10¹² Ohm/square,63 ± 2 mm,0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,No,,SP022-4,,Mô tả hình ảnh,,,,,http://hstatic.net/770/1000108770/1/2016/8-8/ao-dai-cachtan-02_948c953c-7598-49d3-5a9f-c0577efdce96.jpg,
,Spore Black Clean,Bao ngón cao su ,Suzuki Latex,Đen,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Roll | Unroll,ít bột,có,không,không,10⁶ ~ 10⁸ Ohm/square,63 ± 2 mm,0.10 ± 0.02 mm,Nhám,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,No,,,lấy ảnh NSX,Mô tả hình ảnh,,,,,http://hstatic.net/770/1000108770/1/2016/8-8/ao-dai-cachtan-04_7912a04b-b282-4121-6db6-58f2108d4ee2.jpg,
,Spore Black Chlorinated,Bao ngón cao su ,Suzuki Latex,Đen,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut | Shortcut | Roll | Unroll,không bột,có,có,không,10⁶ ~ 10⁸ Ohm/square,63 ± 2 mm (Shortcut 45 ± 2 mm),0.10 ± 0.02 mm,Nhám - Nhẵn,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,Yes,,SP025-1,,Mô tả hình ảnh,,,Sản phẩm nổi bật,hot-products,http://hstatic.net/770/1000108770/1/2016/8-8/pr1.jpg,No
,Spore Black E9 Chlorinated,Bao ngón cao su ,Suzuki Latex,Đen,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Roll | Unroll,không bột,có,có,không,10⁹ Ohm/square,63 ± 2 mm,0.10 ± 0.02 mm,Nhẵn,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,lấy ảnh NSX,,,,,,,
,Spore Sulphur Free ,Bao ngón cao su ,Suzuki Latex,Vàng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Cut,có bột,không,không,không,không,63 ± 2 mm,0.10 ± 0.02 mm,Nhẵn,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,,,,,Sản phẩm khuyến mãi,onsale,,
,Spore Pink AS Chlorinated,Bao ngón cao su ,Suzuki Latex,Hồng,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 21mm,Roll,không bột,có,có,không,10¹⁰ ~ 10¹² Ohm/square,63 ± 2 mm,0.13 ± 0.02 mm,Nhẵn,"1,440 cái x 20 gói / thùng",,,,,,,,,,,,,,,,,,,Trang chủ,frontpage,,
,Mask Orange,Bao ngón cao su ,Suzuki Latex,Cam,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 20mm,Unroll,có bột,có,không,không,không,41 ± 2 | 47 ± 2 | 50 ± 2,0.37 mm | 0.39 mm | 0.41 mm,Nhám,300 cái x 36 gói / thùng (S) | 300 cái x 30 gói / thùng (M) | 300 cái x 24 gói / thùng (L),,,,,,,,,,,,Yes,,SP015-1,,Mô tả hình ảnh,,,Sản phẩm nổi bật,hot-products,http://hstatic.net/770/1000108770/1/2016/8-8/pr82.jpg,No
,Mask Black,Bao ngón cao su ,Suzuki Latex,Đen,Chất liệu,Cao su tự nhiên,S 15mm - M 18mm - L 20mm,Unroll,không bột,có,không,không,10⁶ ~ 10⁸ Ohm/square,41 ± 2 | 47 ± 2 | 50 ± 2,0.37 mm | 0.39 mm | 0.41 mm,Nhám,100 cái x 50 hộp / thùng,,,,,,,,,,,,,,,lấy ảnh NSX,,,,,,,
,Shield,Bao ngón cao su ,Suzuki Latex,Vàng,Chất liệu,Cao su tự nhiên,M 15mm - L 19mm,Unroll,có bột,có,không,không,không,56 ± 2 | 61 ± 2 ,0.34 mm,Nhám,300 cái x 30 gói / thùng,,,,,,,,,,,,,,,,,,,,,,
,EDEL EX,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tổng hợp,XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21 mm,Cut,không bột,không,không,không,10¹⁰ ~ 10¹¹ Ohm/square,50 ± 3 | 63 ± 3,0.13 ± 0.03 mm,-,"1,000 cái x 20 gói / thùng",,,,,,,,,,,,No,,SP015-2,,Mô tả hình ảnh,,,Sản phẩm khuyến mãi,onsale,http://hstatic.net/770/1000108770/1/2016/8-8/ao_kieu_nu_orgamie02.jpg,
,EDEL II,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tổng hợp,S 15mm - SM 16.5mm - M 18mm - L 21 mm,Roll,không bột,không,không,không,10¹⁰ ~ 10¹¹ Ohm/square,60 ± 3,0.11 ± 0.03 mm,-,"1,000 cái x 20 gói / thùng",,,,,,,,,,,,No,,SP015-3,,Mô tả hình ảnh,,,Trang chủ,frontpage,http://hstatic.net/770/1000108770/1/2016/8-8/pr75.jpg,
,EDEL,Bao ngón cao su ,Suzuki Latex,Trắng,Chất liệu,Cao su tổng hợp,XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21 mm,Cut,không bột,không,không,không,10¹⁰ ~ 10¹¹ Ohm/square,50 ± 3,0.16 ± 0.03 mm,-,"1,000 cái x 20 gói / thùng",,,,,,,,,,,,,,,lấy ảnh NSX,,,,,,,
`;

function parseCSV(text) {
  const lines = text.trim().split("\n");
  return lines.map(line => {
    const row = [];
    let insideQuote = false;
    let entry = "";
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"' && (i === 0 || line[i-1] !== '\\')) {
        insideQuote = !insideQuote;
      } else if (c === ',' && !insideQuote) {
        row.push(entry.trim());
        entry = "";
      } else {
        entry += c;
      }
    }
    row.push(entry.trim());
    return row;
  });
}

const parsed = parseCSV(raw);
const rows = parsed.slice(1);

const records = rows.map(r => {
  const name = (r[1] || '').trim();
  const category = (r[2] || 'Bao ngón cao su').trim();
  const brand = (r[3] || 'Suzuki Latex').trim();
  const color = (r[4] || '').trim();
  const material = (r[6] || '').trim();
  const size = (r[7] || '').trim();
  const type = (r[8] || '').trim();
  const powder = (r[9] || '').trim();
  const sulphur = (r[10] || '').trim();
  const chlorine = (r[11] || '').trim();
  const silicone_oil = (r[12] || '').trim();
  const esd_static = (r[13] || '').trim();
  const length = (r[14] || '').trim();
  const thickness = (r[15] || '').trim();
  const surface = (r[16] || '').trim();
  const packaging = (r[17] || '').trim();
  const sku = (r[31] || '').trim();
  let image_url = '';
  if (r[38] && r[38].startsWith('http')) image_url = r[38].trim();
  else if (r[32] && r[32].startsWith('http')) image_url = r[32].trim();

  return {
    name, category, brand, color, material, size, type, powder, sulphur, chlorine,
    silicone_oil, static: esd_static, length, thickness, surface, packaging, sku, image_url
  };
});

function esc(val) {
  if (!val || val === '-') return 'NULL';
  return "'" + val.replace(/'/g, "''") + "'";
}

const insertRows = records.map(r => {
  return "    (" + [
    esc(r.name), esc(r.category), esc(r.brand), esc(r.color), esc(r.material),
    esc(r.size), esc(r.type), esc(r.powder), esc(r.sulphur), esc(r.chlorine),
    esc(r.silicone_oil), esc(r.static), esc(r.length), esc(r.thickness),
    esc(r.surface), esc(r.packaging), esc(r.sku), esc(r.image_url)
  ].join(", ") + ")";
}).join(",\n");

const schemaSql = `-- ==============================================================================
-- CHẠY TOÀN BỘ ĐOẠN MÃ NÀY TRONG SUPABASE SQL EDITOR (Dashboard > SQL Editor)
-- BẢNG PRODUCTS ĐẦY ĐỦ CÁC CỘT VÀ TỰ ĐỘNG CÓ SẴN 17 DÒNG DỮ LIỆU TỪ FILE CSV
-- ==============================================================================

-- 1. XÓA BẢNG CŨ VÀ TẠO LẠI BẢNG PRODUCTS VỚI ĐẦY ĐỦ CỘT THEO FILE CSV
DROP TABLE IF EXISTS public.products CASCADE;

CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,                         -- Tên sản phẩm
    category TEXT DEFAULT 'Bao ngón cao su',    -- Danh mục sản phẩm
    brand TEXT DEFAULT 'Suzuki Latex',          -- Hãng
    color TEXT,                                 -- Màu sắc
    material TEXT,                              -- Chất liệu
    size TEXT,                                  -- Kích thước (đường kính)
    type TEXT,                                  -- Loại
    powder TEXT,                                -- Độ bột
    sulphur TEXT,                               -- Sulphur
    chlorine TEXT,                              -- Chlorine
    silicone_oil TEXT,                          -- Silicone Oil
    static TEXT,                                -- Độ tĩnh điện
    length TEXT,                                -- Chiều dài bao ngón
    thickness TEXT,                             -- Độ dày bao ngón
    surface TEXT,                               -- Bề mặt
    packaging TEXT,                             -- Quy cách
    sku TEXT,                                   -- Mã sản phẩm
    image_url TEXT,                             -- Hình ảnh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thêm chú thích cho các cột để hiển thị trực quan trong Supabase Table Editor
COMMENT ON COLUMN public.products.name IS 'Tên';
COMMENT ON COLUMN public.products.category IS 'Danh mục (Bao ngón cao su)';
COMMENT ON COLUMN public.products.brand IS 'Hãng (Suzuki Latex)';
COMMENT ON COLUMN public.products.color IS 'Màu sắc';
COMMENT ON COLUMN public.products.material IS 'Chất liệu';
COMMENT ON COLUMN public.products.size IS 'Kích thước (đường kính)';
COMMENT ON COLUMN public.products.type IS 'Loại';
COMMENT ON COLUMN public.products.powder IS 'Độ bột';
COMMENT ON COLUMN public.products.sulphur IS 'Sulphur';
COMMENT ON COLUMN public.products.chlorine IS 'Chlorine';
COMMENT ON COLUMN public.products.silicone_oil IS 'Silicone Oil';
COMMENT ON COLUMN public.products.static IS 'Độ tĩnh điện';
COMMENT ON COLUMN public.products.length IS 'Chiều dài bao ngón';
COMMENT ON COLUMN public.products.thickness IS 'Độ dày bao ngón';
COMMENT ON COLUMN public.products.surface IS 'Bề mặt';
COMMENT ON COLUMN public.products.packaging IS 'Quy cách';
COMMENT ON COLUMN public.products.sku IS 'Mã sản phẩm';
COMMENT ON COLUMN public.products.image_url IS 'Hình ảnh';

-- Bật bảo mật Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc dữ liệu công khai trên website
CREATE POLICY "Public read products" ON public.products
    FOR SELECT USING (true);

-- Cho phép thêm, sửa, xóa
CREATE POLICY "Full access to products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);


-- 2. TỰ ĐỘNG CHÈN ĐỦ 17 DÒNG SẢN PHẨM TRỰC TIẾP TỪ FILE CSV CỦA BẠN
INSERT INTO public.products (
    name, category, brand, color, material, size, type, powder, sulphur, chlorine,
    silicone_oil, static, length, thickness, surface, packaging, sku, image_url
) VALUES
${insertRows};


-- 3. BẢNG KHÁCH HÀNG / LIÊN HỆ (CUSTOMERS)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    tax_code TEXT,
    position TEXT,
    requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert customer inquiries." ON public.customers;
CREATE POLICY "Anyone can insert customer inquiries." ON public.customers
    FOR INSERT WITH CHECK (true);


-- 4. STORAGE BUCKET CHO HÌNH ẢNH (IMAGES)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public access to images" ON storage.objects;
CREATE POLICY "Public access to images" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
CREATE POLICY "Anyone can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images');
`;

fs.writeFileSync('supabase_schema.sql', schemaSql);

// Tạo file CSV sạch để người dùng có thể import trực tiếp vào Supabase nếu muốn
const csvHeaders = ['name','category','brand','color','material','size','type','powder','sulphur','chlorine','silicone_oil','static','length','thickness','surface','packaging','sku','image_url'];
const cleanCsvLines = [csvHeaders.join(',')];
for (const r of records) {
  const line = [
    r.name, r.category, r.brand, r.color, r.material, r.size, r.type, r.powder,
    r.sulphur, r.chlorine, r.silicone_oil, r.static, r.length, r.thickness, r.surface,
    r.packaging, r.sku, r.image_url
  ].map(v => {
    if (!v) return '';
    if (v.includes(',') || v.includes('"') || v.includes('\n')) {
      return '"' + v.replace(/"/g, '""') + '"';
    }
    return v;
  }).join(',');
  cleanCsvLines.push(line);
}
fs.writeFileSync('products_import.csv', cleanCsvLines.join('\n'));
console.log('Successfully generated supabase_schema.sql and products_import.csv with 17 rows!');
