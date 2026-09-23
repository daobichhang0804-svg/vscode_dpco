-- ==============================================================================
-- DỰ ÁN ĐỨC PHONG CO., LTD (DPCO) - SUPABASE SQL SCHEMA CHO 2 SẢN PHẨM:
-- 1. GĂNG TAY NITRILE PHÒNG SẠCH (RIVERSTONE)
-- 2. TRỤC ĐỘNG CƠ / TRỤC CƠ KHÍ CHÍNH XÁC (ĐỨC PHONG)
--
-- FORMAT CHUẨN ĐỒNG NHẤT NHƯ BẢNG SẢN PHẨM BAO NGÓN TAY CAO SU TRƯỚC ĐÓ.
-- Bạn có thể chạy trực tiếp trong: Supabase Dashboard > SQL Editor > New query
-- ==============================================================================

-- ==============================================================================
-- CÁCH 1 (KHUYẾN NGHỊ CHO WEBSITE): CHÈN TRỰC TIẾP VÀO BẢNG CHÍNH `public.products`
-- Giúp website hiển thị đồng bộ cả 3 danh mục (Bao ngón tay, Găng tay, Trục)
-- ==============================================================================

INSERT INTO public.products (
    name, category, brand, color, material, size, type, powder, sulphur, chlorine,
    silicone_oil, static, length, thickness, surface, packaging, sku, image_url
) VALUES
    -- 10 Sản phẩm Găng tay Nitrile phòng sạch (Riverstone)
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

    -- 4 Sản phẩm Trục cơ khí chính xác / Trục động cơ (Đức Phong)
    ('Trục 150', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ12', 'Trục dẫn hướng chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '150 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-150-D12', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục 200', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ12', 'Trục truyền động chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '200 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-200-D12', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
    ('Trục 250', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ15', 'Trục động cơ bước / servo', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '250 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-250-D15', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục mini 100A', 'Trục động cơ chính xác', 'Đức Phong', 'Bạc kim loại', 'Thép không gỉ', 'Φ14', 'Trục micro chính xác', NULL, NULL, NULL, NULL, 'Chống nhiễm từ', '100 mm', NULL, 'Mài bóng chính xác cao', 'Đóng gói chống sốc công nghiệp', 'DP-TRUC-MINI-100A-D14', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80')
ON CONFLICT DO NOTHING;


-- ==============================================================================
-- CÁCH 2: TẠO 2 BẢNG ĐỘC LẬP CHUYÊN BIỆT CHO GĂNG TAY NITRILE & TRỤC
-- (Nếu bạn muốn quản lý dữ liệu tách biệt thành 2 bảng riêng trên Supabase)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BẢNG GĂNG TAY NITRILE PHÒNG SẠCH (`products_nitrile_gloves`)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.products_nitrile_gloves CASCADE;

CREATE TABLE public.products_nitrile_gloves (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,                                     -- Tên sản phẩm
    category TEXT DEFAULT 'Găng tay nitrile phòng sạch',    -- Danh mục
    brand TEXT DEFAULT 'Riverstone',                        -- Hãng sản xuất
    color TEXT DEFAULT 'Trắng',                             -- Màu sắc (Trắng, Xanh)
    material TEXT DEFAULT 'Cao su tổng hợp',                -- Chất liệu
    cleanroom_class TEXT,                                   -- Cấp độ phòng sạch (Class 100, Class 1000)
    length TEXT,                                            -- Chiều dài (240 mm, 300 mm)
    surface TEXT,                                           -- Bề mặt (nhám ngón, nhám bàn)
    powder TEXT DEFAULT 'không bột',                        -- Độ bột
    sulphur TEXT DEFAULT 'không',                           -- Sulphur
    chlorine TEXT DEFAULT 'có',                             -- Chlorine
    silicone_oil TEXT DEFAULT 'không',                      -- Silicone Oil
    static TEXT DEFAULT 'Phòng sạch ESD Safe',               -- Độ tĩnh điện
    packaging TEXT DEFAULT '1000 cái / thùng',              -- Quy cách đóng gói
    unit TEXT DEFAULT 'gói',                                -- Đơn vị tính
    sku TEXT,                                               -- Mã phân loại
    image_url TEXT,                                         -- Link hình ảnh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thêm chú thích cột
COMMENT ON TABLE public.products_nitrile_gloves IS 'Bảng dữ liệu găng tay Nitrile phòng sạch Riverstone';
COMMENT ON COLUMN public.products_nitrile_gloves.name IS 'Tên sản phẩm';
COMMENT ON COLUMN public.products_nitrile_gloves.cleanroom_class IS 'Cấp độ sạch (Class 100, Class 1000)';
COMMENT ON COLUMN public.products_nitrile_gloves.length IS 'Chiều dài găng tay';
COMMENT ON COLUMN public.products_nitrile_gloves.surface IS 'Bề mặt (nhám ngón, nhám bàn)';

-- Bật RLS và cấp quyền đọc công khai
ALTER TABLE public.products_nitrile_gloves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read nitrile gloves" ON public.products_nitrile_gloves FOR SELECT USING (true);
CREATE POLICY "Full access to nitrile gloves" ON public.products_nitrile_gloves FOR ALL USING (true) WITH CHECK (true);

-- Chèn 10 dòng sản phẩm găng tay nitrile từ file PDF
INSERT INTO public.products_nitrile_gloves (
    name, category, brand, color, material, cleanroom_class, length, surface, 
    powder, sulphur, chlorine, silicone_oil, static, packaging, unit, sku, image_url
) VALUES
    ('Standard Cleanroom Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-STD-100-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Standard Cleanroom Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-STD-1000-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Standard Cleanroom Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', '300 mm', 'nhám bàn', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-STD-1000-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-100-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-1000-W240', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 100', '300 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-100-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', '300 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-1000-W300', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Xanh', 'Cao su tổng hợp', 'Class 100', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-100-B240', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Xanh', 'Cao su tổng hợp', 'Class 1000', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-1000-B240', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'),
    ('Cleanroom SF1 Nitrile Gloves', 'Găng tay nitrile phòng sạch', 'Riverstone', 'Trắng', 'Cao su tổng hợp', 'Class 1000', '240 mm', 'nhám ngón', 'không bột', 'không', 'có', 'không', 'Phòng sạch ESD Safe', '1000 cái / thùng', 'gói', 'RS-SF1-1000-W240-STD', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80');


-- ------------------------------------------------------------------------------
-- 2. BẢNG TRỤC ĐỘNG CƠ / TRỤC CƠ KHÍ CHÍNH XÁC (`products_shafts`)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.products_shafts CASCADE;

CREATE TABLE public.products_shafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,                                     -- Tên sản phẩm
    category TEXT DEFAULT 'Trục động cơ chính xác',         -- Danh mục
    brand TEXT DEFAULT 'Đức Phong',                         -- Hãng
    material TEXT DEFAULT 'Thép không gỉ',                  -- Chất liệu (Thép không gỉ)
    diameter TEXT NOT NULL,                                 -- Đường kính (Φ12, Φ14, Φ15)
    length TEXT NOT NULL,                                   -- Chiều dài (100 mm, 150 mm, 200 mm, 250 mm)
    surface TEXT DEFAULT 'Mài bóng chính xác cao',          -- Bề mặt gia công
    packaging TEXT DEFAULT 'Hộp chống sốc công nghiệp',     -- Quy cách đóng gói
    unit TEXT DEFAULT 'cây',                                -- Đơn vị tính
    sku TEXT,                                               -- Mã SKU sản phẩm
    image_url TEXT,                                         -- Link hình ảnh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thêm chú thích cột
COMMENT ON TABLE public.products_shafts IS 'Bảng dữ liệu trục động cơ cơ khí chính xác Đức Phong (DPCO)';
COMMENT ON COLUMN public.products_shafts.name IS 'Tên sản phẩm (Trục 150, Trục 200, Trục 250, Trục mini 100A)';
COMMENT ON COLUMN public.products_shafts.diameter IS 'Đường kính trục (Φ12, Φ14, Φ15)';
COMMENT ON COLUMN public.products_shafts.length IS 'Chiều dài trục';
COMMENT ON COLUMN public.products_shafts.material IS 'Chất liệu (Thép không gỉ)';

-- Bật RLS và cấp quyền đọc công khai
ALTER TABLE public.products_shafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shafts" ON public.products_shafts FOR SELECT USING (true);
CREATE POLICY "Full access to shafts" ON public.products_shafts FOR ALL USING (true) WITH CHECK (true);

-- Chèn 4 dòng sản phẩm trục cơ khí chính xác từ file PDF
INSERT INTO public.products_shafts (
    name, category, brand, material, diameter, length, surface, packaging, unit, sku, image_url
) VALUES
    ('Trục 150', 'Trục động cơ chính xác', 'Đức Phong', 'Thép không gỉ', 'Φ12', '150 mm', 'Mài bóng chính xác cao', 'Hộp chống sốc công nghiệp', 'cây', 'DP-TRUC-150-D12', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục 200', 'Trục động cơ chính xác', 'Đức Phong', 'Thép không gỉ', 'Φ12', '200 mm', 'Mài bóng chính xác cao', 'Hộp chống sốc công nghiệp', 'cây', 'DP-TRUC-200-D12', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
    ('Trục 250', 'Trục động cơ chính xác', 'Đức Phong', 'Thép không gỉ', 'Φ15', '250 mm', 'Mài bóng chính xác cao', 'Hộp chống sốc công nghiệp', 'cây', 'DP-TRUC-250-D15', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
    ('Trục mini 100A', 'Trục động cơ chính xác', 'Đức Phong', 'Thép không gỉ', 'Φ14', '100 mm', 'Mài bóng chính xác cao', 'Hộp chống sốc công nghiệp', 'cây', 'DP-TRUC-MINI-100A-D14', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80');
