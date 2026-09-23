const fs = require('fs');

let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const replacements = [
  ["'footer.hanoi': 'Văn Phòng Hà Nội'", "'footer.hanoi': 'Văn phòng Hà Nội'"],
  ["'footer.dongnai': 'Văn Phòng Đồng Nai'", "'footer.dongnai': 'Văn phòng Đồng Nai'"],
  ["'home.explore': 'Khám Phá Thêm'", "'home.explore': 'Khám phá thêm'"],
  ["'home.growth': 'Sự Phát Triển Công Nghiệp'", "'home.growth': 'Sự phát triển công nghiệp'"],
  ["'home.start': 'Bắt Đầu Ngay'", "'home.start': 'Bắt đầu ngay'"],
];

for (const [search, replace] of replacements) {
  content = content.replace(search, replace);
}

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
