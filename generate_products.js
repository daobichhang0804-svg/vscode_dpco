const fs = require('fs');

const products = [
  { name: 'Spore Ordinary', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Vàng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Shortcut | Roll | Unroll', powder: 'Có bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '63 ± 2 mm (Shortcut 45 ± 2 mm)', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Clean', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Vàng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Roll | Unroll', powder: 'Ít bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Chlorinated', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Vàng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Shortcut | Roll | Unroll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Có', siliconeOil: 'Không', static: 'Không', length: '63 ± 2 mm (Shortcut 45 ± 2 mm)', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Lite II Ordinary', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Shortcut | Roll', powder: 'Có bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: '10^10 ~ 10^12 Ohm/square', length: '63 ± 2 mm (Shortcut 45 ± 2 mm)', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Lite II Clean', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Roll', powder: 'Ít bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: '10^10 ~ 10^12 Ohm/square', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Lite II Chlorinated', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Roll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Có', siliconeOil: 'Không', static: '10^10 ~ 10^12 Ohm/square', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Black Clean', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Đen', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Roll | Unroll', powder: 'Ít bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: '10^6 ~ 10^8 Ohm/square', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhám', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Black Chlorinated', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Đen', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut | Shortcut | Roll | Unroll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Có', siliconeOil: 'Không', static: '10^6 ~ 10^8 Ohm/square', length: '63 ± 2 mm (Shortcut 45 ± 2 mm)', thickness: '0.10 ± 0.02 mm', surface: 'Nhám - Nhẵn', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Black E9 Chlorinated', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Đen', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Roll | Unroll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Có', siliconeOil: 'Không', static: '10^9 Ohm/square', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhẵn', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Sulphur Free', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Vàng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Cut', powder: 'Có bột', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '63 ± 2 mm', thickness: '0.10 ± 0.02 mm', surface: 'Nhẵn', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Spore Pink AS Chlorinated', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Hồng', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 21mm', type: 'Roll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Có', siliconeOil: 'Không', static: '10^10 ~ 10^12 Ohm/square', length: '63 ± 2 mm', thickness: '0.13 ± 0.02 mm', surface: 'Nhẵn', spec: '1,440 cái x 20 gói / thùng' },
  { name: 'Mask Orange', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Cam', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 20mm', type: 'Unroll', powder: 'Có bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '41 ± 2 | 47 ± 2 | 50 ± 2', thickness: '0.37 mm | 0.39 mm | 0.41 mm', surface: 'Nhám', spec: '300 cái x 36 gói / thùng' },
  { name: 'Mask Black', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Đen', material: 'Cao su tự nhiên', size: 'S 15mm | M 18mm | L 20mm', type: 'Unroll', powder: 'Không bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: '10^6 ~ 10^8 Ohm/square', length: '41 ± 2 | 47 ± 2 | 50 ± 2', thickness: '0.37 mm | 0.39 mm | 0.41 mm', surface: 'Nhám', spec: '100 cái x 50 hộp / thùng' },
  { name: 'Shield', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Vàng', material: 'Cao su tự nhiên', size: 'M 15mm | L 19mm', type: 'Unroll', powder: 'Có bột', sulphur: 'Có', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '56 ± 2 | 61 ± 2', thickness: '0.34 mm', surface: 'Nhám', spec: '300 cái x 30 gói / thùng' },
  { name: 'EDEL EX', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tổng hợp', size: 'XS 13.5mm | S 15mm | SM 16.5mm | M 18mm | L 21mm', type: 'Cut', powder: 'Không bột', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: '10^10 ~ 10^11 Ohm/square', length: '50 ± 3 | 63 ± 3', thickness: '0.13 ± 0.03 mm', surface: 'Trơn', spec: '1,000 cái x 20 gói / thùng' },
  { name: 'EDEL II', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tổng hợp', size: 'S 15mm | SM 16.5mm | M 18mm | L 21mm', type: 'Roll', powder: 'Không bột', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: '10^10 ~ 10^11 Ohm/square', length: '60 ± 3', thickness: '0.11 ± 0.03 mm', surface: 'Trơn', spec: '1,000 cái x 20 gói / thùng' },
  { name: 'EDEL', brand: 'Suzuki Latex', category: 'Bao ngón tay cao su', color: 'Trắng', material: 'Cao su tổng hợp', size: 'XS 13.5mm | S 15mm | SM 16.5mm | M 18mm | L 21mm', type: 'Cut', powder: 'Không bột', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: '10^10 ~ 10^11 Ohm/square', length: '50 ± 3', thickness: '0.16 ± 0.03 mm', surface: 'Trơn', spec: '1,000 cái x 20 gói / thùng' },
  { name: 'Standard Cleanroom Nitrile Gloves', brand: 'Riverstone', category: 'Găng tay nitrile phòng sạch', color: 'Trắng', material: 'Cao su tổng hợp', size: 'Class 100 / 1000', type: 'Găng tay', powder: 'Không bột', sulphur: 'Không', chlorine: 'Có', siliconeOil: 'Không', static: 'Chống tĩnh điện', length: '240 mm / 300 mm', thickness: 'Tiêu chuẩn', surface: 'Nhám ngón / Nhám bàn', spec: '1000 cái / thùng' },
  { name: 'Cleanroom SF1 Nitrile Gloves', brand: 'Riverstone', category: 'Găng tay nitrile phòng sạch', color: 'Trắng / Xanh', material: 'Cao su tổng hợp', size: 'Class 100 / 1000', type: 'Găng tay', powder: 'Không bột', sulphur: 'Không', chlorine: 'Có', siliconeOil: 'Không', static: 'Chống tĩnh điện', length: '240 mm / 300 mm', thickness: 'Tiêu chuẩn', surface: 'Nhám ngón', spec: '1000 cái / thùng' },
  { name: 'Trục 150', brand: 'Khác', category: 'Trục cuốn bụi', color: 'Trắng', material: 'Thép không gỉ', size: 'Φ12', type: 'Trục', powder: 'Không', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '150 mm', thickness: '-', surface: 'Trơn', spec: 'Cái' },
  { name: 'Trục 200', brand: 'Khác', category: 'Trục cuốn bụi', color: 'Trắng', material: 'Thép không gỉ', size: 'Φ12', type: 'Trục', powder: 'Không', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '200 mm', thickness: '-', surface: 'Trơn', spec: 'Cái' },
  { name: 'Trục 250', brand: 'Khác', category: 'Trục cuốn bụi', color: 'Trắng', material: 'Thép không gỉ', size: 'Φ15', type: 'Trục', powder: 'Không', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '250 mm', thickness: '-', surface: 'Trơn', spec: 'Cái' },
  { name: 'Trục mini 100A', brand: 'Khác', category: 'Trục cuốn bụi', color: 'Trắng', material: 'Thép không gỉ', size: 'Φ14', type: 'Trục', powder: 'Không', sulphur: 'Không', chlorine: 'Không', siliconeOil: 'Không', static: 'Không', length: '100 mm', thickness: '-', surface: 'Trơn', spec: 'Cái' }
];

const output = `import { Product } from '../types';

const generateImage = (name: string) => {
  return \`https://placehold.co/400x500/f4f5f7/007a3d?text=\${encodeURIComponent(name)}\`;
};

export const PRODUCTS: Product[] = [
${products.map(p => `  {
    id: '${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}',
    sku: '${p.name.toUpperCase().replace(/[^A-Z0-9]+/g, '-').substring(0, 10)}',
    name: '${p.name}',
    description: '${p.name} - ${p.category} chất lượng cao.',
    price: 0,
    image: generateImage('${p.name}'),
    brand: '${p.brand}',
    category: '${p.category}',
    specs: {
      color: '${p.color}',
      material: '${p.material}',
      size: '${p.size}',
      type: '${p.type}',
      powder: '${p.powder}',
      sulphur: '${p.sulphur}',
      chlorine: '${p.chlorine}',
      siliconeOil: '${p.siliconeOil}',
      static: '${p.static}',
      length: '${p.length}',
      thickness: '${p.thickness}'
    },
  }`).join(',\n')}
];
`;

fs.writeFileSync('src/data/products.ts', output);
console.log('Products updated.');
