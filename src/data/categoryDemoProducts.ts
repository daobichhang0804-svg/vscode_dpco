import { Product } from '../types';

/**
 * High-precision product data for categories not yet populated in Supabase,
 * specifically to satisfy the dynamic category filter test scenarios:
 * 1. Găng tay nitrile phòng sạch (Size + Color + Type)
 * 2. Trục động cơ chính xác (Đường kính + Vật liệu + Chiều dài + Dung sai)
 */

export const CATEGORY_DEMO_PRODUCTS: Product[] = [
  // --- GĂNG TAY NITRILE PHÒNG SẠCH ---
  {
    id: 'glove-nitrile-cleanroom-roll-white',
    sku: 'GLV-NIT-WHT-R',
    name: 'Găng tay Nitrile Cleanroom Class 100 Roll Trắng',
    description: 'Găng tay nitrile tinh khiết không bột, viền cuộn (Roll) tiêu chuẩn phòng sạch Class 100.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'S - M - L',
      color: 'Trắng',
      type: 'Roll',
      material: 'Nitrile tổng hợp 100%',
      powder: 'Không bột',
      chlorine: 'Có'
    }
  },
  {
    id: 'glove-nitrile-esd-black-roll',
    sku: 'GLV-NIT-BLK-R',
    name: 'Găng tay Nitrile Chống Tĩnh Điện ESD Đen Roll',
    description: 'Găng tay nitrile chống tĩnh điện chuyên dụng bề mặt bán dẫn, viền cuộn linh hoạt.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'M - L - XL',
      color: 'Đen',
      type: 'Roll',
      material: 'Nitrile ESD Carbon',
      static: '10e6 - 10e8 ohm'
    }
  },
  {
    id: 'glove-nitrile-chemical-orange-unroll',
    sku: 'GLV-NIT-ORG-U',
    name: 'Găng tay Nitrile Kháng Hóa Chất Cam Unroll',
    description: 'Độ dày vượt trội chống ăn mòn axit nhẹ và dung môi, viền thẳng phẳng (Unroll).',
    price: 0,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'S - M - L',
      color: 'Cam',
      type: 'Unroll',
      material: 'Nitrile chịu hóa chất'
    }
  },
  {
    id: 'glove-nitrile-clean-yellow-cut',
    sku: 'GLV-NIT-YEL-C',
    name: 'Găng tay Nitrile Siêu Mỏng Vàng Cắt (Cut)',
    description: 'Độ nhạy xúc giác cực cao cho thao tác vi cơ điện tử tinh vi, viền cắt thẳng (Cut).',
    price: 0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'XS - S - M',
      color: 'Vàng',
      type: 'Cut',
      material: 'Nitrile siêu mịn'
    }
  },
  {
    id: 'glove-nitrile-medical-pink-shortcut',
    sku: 'GLV-NIT-PNK-S',
    name: 'Găng tay Nitrile Y Tế & Phòng Thí Nghiệm Hồng Shortcut',
    description: 'Thân thiện với da tay nhạy cảm, chiều dài rút gọn công thái học (Shortcut).',
    price: 0,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'S - M - L',
      color: 'Hồng',
      type: 'Shortcut',
      material: 'Nitrile y sinh'
    }
  },
  {
    id: 'glove-nitrile-cleanroom-unroll-white',
    sku: 'GLV-NIT-WHT-U',
    name: 'Găng tay Nitrile Dài Phòng Sạch Unroll Trắng',
    description: 'Găng tay nitrile chiều dài 300mm bảo vệ cổ tay, viền phẳng không cuộn (Unroll).',
    price: 0,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Latex',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      size: 'M - L - XL',
      color: 'Trắng',
      type: 'Unroll',
      material: 'Nitrile Class 10'
    }
  },

  // --- TRỤC ĐỘNG CƠ CHÍNH XÁC ---
  {
    id: 'shaft-stepper-5mm-sus304',
    sku: 'SHF-STP-05-304',
    name: 'Trục Động Cơ Bước Precision Stepper Shaft Ø5mm',
    description: 'Trục động cơ bước bằng thép không gỉ SUS304 gia công mài phẳng chính xác cao.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø5mm',
      material: 'Thép không gỉ SUS304',
      length: '100mm',
      tolerance: '±0.002mm'
    }
  },
  {
    id: 'shaft-servo-8mm-scm440',
    sku: 'SHF-SRV-08-440',
    name: 'Trục Truyền Động Servo Motor Shaft Ø8mm',
    description: 'Trục hợp kim SCM440 tôi cao tần chịu xoắn cực đại cho động cơ servo công nghiệp.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø8mm',
      material: 'Thép SCM440',
      length: '150mm',
      tolerance: 'h6 (0/-0.008)'
    }
  },
  {
    id: 'shaft-spindle-12mm-scm440',
    sku: 'SHF-SPD-12-440',
    name: 'Trục Trục Chính Cao Tần High-Speed Spindle Shaft Ø12mm',
    description: 'Độ cân bằng động cấp G0.4 cho tốc độ quay đến 30.000 RPM không rung lắc.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø12mm',
      material: 'Thép SCM440',
      length: '200mm',
      tolerance: '±0.002mm'
    }
  },
  {
    id: 'shaft-linear-10mm-sus304',
    sku: 'SHF-LIN-10-304',
    name: 'Trục Tuyến Tính Linear Precision Shaft Ø10mm',
    description: 'Trục dẫn hướng tuyến tính tôi cứng bề mặt mạ crom cứng chống mài mòn.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø10mm',
      material: 'Thép không gỉ SUS304',
      length: '300mm',
      tolerance: 'g6 (-0.004/-0.012)'
    }
  },
  {
    id: 'shaft-aero-8mm-al7075',
    sku: 'SHF-AER-08-AL',
    name: 'Trục Siêu Nhẹ Hợp Kim Hàng Không Nhôm 7075-T6 Ø8mm',
    description: 'Trục giảm trọng lượng quán tính cho robot cộng tác và cánh tay bay drone.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø8mm',
      material: 'Nhôm 7075-T6',
      length: '100mm',
      tolerance: '±0.005mm'
    }
  },
  {
    id: 'shaft-micro-3mm-s45c',
    sku: 'SHF-MIC-03-45C',
    name: 'Trục Động Cơ Siêu Nhỏ Micro Coreless Motor Shaft Ø3mm',
    description: 'Trục micro chính xác gia công cho động cơ không lõi và thiết bị vi phẫu thuật.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    brand: 'Suzuki Precision',
    category: 'Trục động cơ chính xác',
    specs: {
      diameter: 'Ø3mm',
      material: 'Thép carbon S45C',
      length: '50mm',
      tolerance: '±0.002mm'
    }
  }
];
