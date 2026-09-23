const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Fix About Section double div
homeCode = homeCode.replace(
  /<section className="py-20 relative"><ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">\s*<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">([\s\S]*?)<\/div>\s*<\/ScrollReveal><\/section>/,
  '<section className="py-20 relative"><ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">$1</ScrollReveal></section>'
);

// Fix Certificates syntax errors
homeCode = homeCode.replace(
  /<ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">[\s\S]*?<\/ScrollReveal>/,
  `<ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <RevealItem className="bg-white p-4 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="https://placehold.co/800x1000/f4f5f7/007a3d?text=Riverstone+Certificate" alt="Chứng nhận Riverstone" className="w-full h-auto object-contain" />
              <div className="text-center mt-6 mb-2">
                <h3 className="font-bold text-lg text-zinc-900 uppercase">Riverstone Resources</h3>
                <p className="text-sm text-zinc-500">{t('home.cert.riverstone')}</p>
              </div>
            </RevealItem>
            <RevealItem className="bg-white p-4 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="https://placehold.co/800x1000/f4f5f7/007a3d?text=Suzuki+Latex+Certificate" alt="Chứng nhận Suzuki Latex" className="w-full h-auto object-contain" />
              <div className="text-center mt-6 mb-2">
                <h3 className="font-bold text-lg text-zinc-900 uppercase">Suzuki Latex Industry</h3>
                <p className="text-sm text-zinc-500">{t('home.cert.suzuki')}</p>
              </div>
            </RevealItem>
          </ScrollReveal>`
);

fs.writeFileSync('src/pages/Home.tsx', homeCode);
console.log('Fixed Home.');
