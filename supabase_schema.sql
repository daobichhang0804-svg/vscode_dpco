-- ==============================================================================
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
    ('Spore Ordinary', 'Bao ngón cao su', 'Suzuki Latex', 'Vàng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Shortcut | Roll | Unroll', 'có bột', 'có', 'không', 'không', 'không', '63 ± 2 mm (Shortcut 45 ± 2 mm)', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', 'SP028-1', 'http://hstatic.net/770/1000108770/1/2016/8-8/pr_234b308d-69a7-41f0-76be-fca0b83b4e48.jpg'),
    ('Spore Clean', 'Bao ngón cao su', 'Suzuki Latex', 'Vàng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Roll | Unroll', 'ít bột', 'có', 'không', 'không', 'không', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Spore Chlorinated', 'Bao ngón cao su', 'Suzuki Latex', 'Vàng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Shortcut | Roll | Unroll', 'không bột', 'có', 'có', 'không', 'không', '63 ± 2 mm (Shortcut 45 ± 2 mm)', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Spore Lite II Ordinary', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Shortcut |  Roll', 'có bột', 'có', 'không', 'không', '10¹⁰ ~ 10¹² Ohm/square', '63 ± 2 mm (Shortcut 45 ± 2 mm)', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Spore Lite II Clean', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut |  Roll', 'ít bột', 'có', 'không', 'không', '10¹⁰ ~ 10¹² Ohm/square', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', 'SP022-5', 'http://hstatic.net/770/1000108770/1/2016/8-8/pr106.jpg'),
    ('Spore Lite II Chlorinated', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Roll', 'không bột', 'có', 'có', 'không', '10¹⁰ ~ 10¹² Ohm/square', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', 'SP022-4', 'http://hstatic.net/770/1000108770/1/2016/8-8/ao-dai-cachtan-02_948c953c-7598-49d3-5a9f-c0577efdce96.jpg'),
    ('Spore Black Clean', 'Bao ngón cao su', 'Suzuki Latex', 'Đen', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Roll | Unroll', 'ít bột', 'có', 'không', 'không', '10⁶ ~ 10⁸ Ohm/square', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhám', '1,440 cái x 20 gói / thùng', NULL, 'http://hstatic.net/770/1000108770/1/2016/8-8/ao-dai-cachtan-04_7912a04b-b282-4121-6db6-58f2108d4ee2.jpg'),
    ('Spore Black Chlorinated', 'Bao ngón cao su', 'Suzuki Latex', 'Đen', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut | Shortcut | Roll | Unroll', 'không bột', 'có', 'có', 'không', '10⁶ ~ 10⁸ Ohm/square', '63 ± 2 mm (Shortcut 45 ± 2 mm)', '0.10 ± 0.02 mm', 'Nhám - Nhẵn', '1,440 cái x 20 gói / thùng', 'SP025-1', 'http://hstatic.net/770/1000108770/1/2016/8-8/pr1.jpg'),
    ('Spore Black E9 Chlorinated', 'Bao ngón cao su', 'Suzuki Latex', 'Đen', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Roll | Unroll', 'không bột', 'có', 'có', 'không', '10⁹ Ohm/square', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhẵn', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Spore Sulphur Free', 'Bao ngón cao su', 'Suzuki Latex', 'Vàng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Cut', 'có bột', 'không', 'không', 'không', 'không', '63 ± 2 mm', '0.10 ± 0.02 mm', 'Nhẵn', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Spore Pink AS Chlorinated', 'Bao ngón cao su', 'Suzuki Latex', 'Hồng', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 21mm', 'Roll', 'không bột', 'có', 'có', 'không', '10¹⁰ ~ 10¹² Ohm/square', '63 ± 2 mm', '0.13 ± 0.02 mm', 'Nhẵn', '1,440 cái x 20 gói / thùng', NULL, NULL),
    ('Mask Orange', 'Bao ngón cao su', 'Suzuki Latex', 'Cam', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 20mm', 'Unroll', 'có bột', 'có', 'không', 'không', 'không', '41 ± 2 | 47 ± 2 | 50 ± 2', '0.37 mm | 0.39 mm | 0.41 mm', 'Nhám', '300 cái x 36 gói / thùng (S) | 300 cái x 30 gói / thùng (M) | 300 cái x 24 gói / thùng (L)', 'SP015-1', 'http://hstatic.net/770/1000108770/1/2016/8-8/pr82.jpg'),
    ('Mask Black', 'Bao ngón cao su', 'Suzuki Latex', 'Đen', 'Cao su tự nhiên', 'S 15mm - M 18mm - L 20mm', 'Unroll', 'không bột', 'có', 'không', 'không', '10⁶ ~ 10⁸ Ohm/square', '41 ± 2 | 47 ± 2 | 50 ± 2', '0.37 mm | 0.39 mm | 0.41 mm', 'Nhám', '100 cái x 50 hộp / thùng', NULL, NULL),
    ('Shield', 'Bao ngón cao su', 'Suzuki Latex', 'Vàng', 'Cao su tự nhiên', 'M 15mm - L 19mm', 'Unroll', 'có bột', 'có', 'không', 'không', 'không', '56 ± 2 | 61 ± 2', '0.34 mm', 'Nhám', '300 cái x 30 gói / thùng', NULL, NULL),
    ('EDEL EX', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tổng hợp', 'XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21 mm', 'Cut', 'không bột', 'không', 'không', 'không', '10¹⁰ ~ 10¹¹ Ohm/square', '50 ± 3 | 63 ± 3', '0.13 ± 0.03 mm', NULL, '1,000 cái x 20 gói / thùng', 'SP015-2', 'http://hstatic.net/770/1000108770/1/2016/8-8/ao_kieu_nu_orgamie02.jpg'),
    ('EDEL II', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tổng hợp', 'S 15mm - SM 16.5mm - M 18mm - L 21 mm', 'Roll', 'không bột', 'không', 'không', 'không', '10¹⁰ ~ 10¹¹ Ohm/square', '60 ± 3', '0.11 ± 0.03 mm', NULL, '1,000 cái x 20 gói / thùng', 'SP015-3', 'http://hstatic.net/770/1000108770/1/2016/8-8/pr75.jpg'),
    ('EDEL', 'Bao ngón cao su', 'Suzuki Latex', 'Trắng', 'Cao su tổng hợp', 'XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21 mm', 'Cut', 'không bột', 'không', 'không', 'không', '10¹⁰ ~ 10¹¹ Ohm/square', '50 ± 3', '0.16 ± 0.03 mm', NULL, '1,000 cái x 20 gói / thùng', NULL, NULL),

    -- GĂNG TAY NITRILE PHÒNG SẠCH (RIVERSTONE)
    ('Standard Cleanroom Nitrile Gloves (Class 100 - 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.10 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-STD-100-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Standard Cleanroom Nitrile Gloves (Class 1000 - 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.10 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-STD-1000-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Standard Cleanroom Nitrile Gloves (Class 1000 - 300mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', 'Unroll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '300 mm', '0.12 ± 0.02 mm', 'nhám bàn', '1000 cái / thùng', 'RS-STD-1000-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 100 - Trắng 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.09 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-100-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 1000 - Trắng 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.09 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-1000-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 100 - Trắng 300mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', 'Unroll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '300 mm', '0.11 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-100-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 1000 - Trắng 300mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', 'Unroll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '300 mm', '0.11 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-1000-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 100 - Xanh 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Xanh', 'Cao su tổng hợp', 'Class 100', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.09 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-100-B240', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 1000 - Xanh 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Xanh', 'Cao su tổng hợp', 'Class 1000', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.09 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-1000-B240', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves (Class 1000 - Trắng Standard 240mm)', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', 'Roll', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '240 mm', '0.09 ± 0.02 mm', 'nhám ngón', '1000 cái / thùng', 'RS-SF1-1000-W240-STD', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),

    -- TRỤC CƠ KHÍ CHÍNH XÁC / TRỤC ĐỘNG CƠ (ĐỨC PHONG)
    ('Trục 150', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ12', 'Trục dẫn hướng chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '150 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-150-D12', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục 200', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ12', 'Trục truyền động chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '200 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-200-D12', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
    ('Trục 250', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ15', 'Trục động cơ bước / servo', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '250 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-250-D15', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục mini 100A', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ14', 'Trục micro chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '100 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-MINI-100A-D14', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80');


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


-- ==============================================================================
-- 5. BẢNG CHỨNG NHẬN VÀ GIẤY ỦY QUYỀN PHÂN PHỐI (CERTIFICATES) & STORAGE BUCKET
-- ==============================================================================

-- 5.1 Tạo bucket 'certificates' trong Supabase Storage cho file PDF, JPG, PNG, WEBP
INSERT INTO storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
VALUES (
    'certificates',
    'certificates',
    true,
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
    52428800 -- 50MB tối đa
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

-- 5.2 Tạo bảng lưu trữ thông tin chứng chỉ và văn bản ủy quyền
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,                         -- Tiêu đề văn bản/chứng chỉ hiển thị
    file_name TEXT NOT NULL,                     -- Tên file gốc (vd: Duc Phong Co., Ltd Authorized Distribution Letter 2025.pdf)
    file_path TEXT NOT NULL,                     -- Đường dẫn file trong bucket certificates
    file_type TEXT NOT NULL,                     -- Loại file (vd: application/pdf, image/jpeg, image/png)
    file_size BIGINT NOT NULL,                   -- Dung lượng file theo bytes
    public_url TEXT NOT NULL,                    -- URL công khai trực tiếp từ Supabase Storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thêm chú thích cho các cột
COMMENT ON TABLE public.certificates IS 'Bảng lưu trữ thông tin chứng chỉ và thư ủy quyền phân phối';
COMMENT ON COLUMN public.certificates.title IS 'Tiêu đề hiển thị chứng chỉ';
COMMENT ON COLUMN public.certificates.file_name IS 'Tên file gốc';
COMMENT ON COLUMN public.certificates.file_path IS 'Đường dẫn file trong storage bucket';
COMMENT ON COLUMN public.certificates.file_type IS 'MIME type của file';
COMMENT ON COLUMN public.certificates.file_size IS 'Kích thước file (bytes)';
COMMENT ON COLUMN public.certificates.public_url IS 'Đường dẫn URL công khai từ Supabase';
COMMENT ON COLUMN public.certificates.created_at IS 'Thời gian tải lên';

-- 5.3 Kích hoạt Row Level Security (RLS) cho bảng certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người (công khai trên website) xem danh sách chứng chỉ
DROP POLICY IF EXISTS "Public read certificates" ON public.certificates;
CREATE POLICY "Public read certificates" ON public.certificates
    FOR SELECT USING (true);

-- Cho phép người dùng đã xác thực (Admin đăng nhập) thêm chứng chỉ mới
DROP POLICY IF EXISTS "Authenticated users can insert certificates" ON public.certificates;
CREATE POLICY "Authenticated users can insert certificates" ON public.certificates
    FOR INSERT TO authenticated WITH CHECK (true);

-- Cho phép người dùng đã xác thực (Admin đăng nhập) cập nhật chứng chỉ
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON public.certificates;
CREATE POLICY "Authenticated users can update certificates" ON public.certificates
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Cho phép người dùng đã xác thực (Admin đăng nhập) xóa chứng chỉ
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON public.certificates;
CREATE POLICY "Authenticated users can delete certificates" ON public.certificates
    FOR DELETE TO authenticated USING (true);

-- (TÙY CHỌN DÀNH CHO MÔI TRƯỜNG TEST/DEV):
-- Nếu bạn muốn test upload trực tiếp mà chưa tạo tài khoản Admin trong Supabase Auth,
-- bạn có thể mở dòng chính sách sau:
-- DROP POLICY IF EXISTS "Allow anon upload during dev test" ON public.certificates;
-- CREATE POLICY "Allow anon upload during dev test" ON public.certificates FOR INSERT TO anon WITH CHECK (true);


-- 5.4 Thiết lập chính sách bảo mật cho Storage bucket 'certificates'
-- Cho phép công chúng tải/xem file chứng chỉ
DROP POLICY IF EXISTS "Public read certificates storage" ON storage.objects;
CREATE POLICY "Public read certificates storage" ON storage.objects
    FOR SELECT USING (bucket_id = 'certificates');

-- Cho phép Admin đã đăng thực upload file vào bucket 'certificates'
DROP POLICY IF EXISTS "Authenticated upload certificates storage" ON storage.objects;
CREATE POLICY "Authenticated upload certificates storage" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'certificates');

-- Cho phép Admin cập nhật file trong bucket 'certificates'
DROP POLICY IF EXISTS "Authenticated update certificates storage" ON storage.objects;
CREATE POLICY "Authenticated update certificates storage" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');

-- Cho phép Admin xóa file trong bucket 'certificates'
DROP POLICY IF EXISTS "Authenticated delete certificates storage" ON storage.objects;
CREATE POLICY "Authenticated delete certificates storage" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'certificates');

-- (TÙY CHỌN DÀNH CHO MÔI TRƯỜNG TEST/DEV CHO STORAGE):
-- DROP POLICY IF EXISTS "Allow anon upload storage during dev test" ON storage.objects;
-- CREATE POLICY "Allow anon upload storage during dev test" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'certificates');
