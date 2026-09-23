const fs = require('fs');

let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const replacements = [
  ["'header.cleanroom': 'Thiết Bị Phòng Sạch'", "'header.cleanroom': 'Thiết bị phòng sạch'"],
  ["'header.consumables': 'Vật Tư Tiêu Hao Phòng Sạch'", "'header.consumables': 'Vật tư tiêu hao phòng sạch'"],
  ["'header.mechanical': 'Thiết Bị Cơ Khí'", "'header.mechanical': 'Thiết bị cơ khí'"],
  ["'product.specifications': 'Thông Số'", "'product.specifications': 'Thông số kỹ thuật'"],
];

for (const [search, replace] of replacements) {
  content = content.replace(search, replace);
}

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
