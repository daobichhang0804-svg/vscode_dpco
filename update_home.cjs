const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add imports
if (!homeCode.includes('import { ScrollReveal, RevealItem }')) {
  homeCode = homeCode.replace(
    "import { Link, useOutletContext } from 'react-router-dom';",
    "import { Link, useOutletContext } from 'react-router-dom';\nimport { ScrollReveal, RevealItem } from '../components/ScrollReveal';\nimport InteractiveDistributionMap from '../components/map/InteractiveDistributionMap';"
  );
}

// Replace sections with ScrollReveal

// About section
homeCode = homeCode.replace(
  /<section className="py-20 relative">([\s\S]*?)<\/section>/,
  '<section className="py-20 relative"><ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">$1</ScrollReveal></section>'
);

// Certificates section
homeCode = homeCode.replace(
  /<section id="certificates" className="py-20 bg-zinc-50 border-t border-zinc-200">[\s\S]*?<div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">([\s\S]*?)<\/div>[\s\S]*?<\/section>/,
  (match, content) => {
    return `<section id="certificates" className="py-20 bg-zinc-50 border-t border-zinc-200">
        <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">{t('home.cert')}</h2>
            <div className="w-12 h-[2px] bg-brand-green mx-auto mt-4 mb-4"></div>
            <p className="text-sm text-zinc-500 max-w-2xl mx-auto">{t('home.cert.desc')}</p>
          </div>
          <ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            ${content.replace(/<div className="bg-white p-4/g, '<RevealItem className="bg-white p-4').replace(/<\/div>\s*<\/div>\s*<div className="bg-white p-4/g, '</div></RevealItem><RevealItem className="bg-white p-4').replace(/<\/div>\s*<\/div>$/g, '</div></RevealItem>')}
          </ScrollReveal>
        </ScrollReveal>
      </section>`;
  }
);

// We'll need a regex approach or manual approach to avoid breaking the file.
// Since we have the map, let's just insert it after the Stats section.
homeCode = homeCode.replace(
  /<\/section>\s*{?\/\*\s*Certificates Section\s*\*\/}?/,
  `</section>

      {/* Distribution Map */}
      <InteractiveDistributionMap />

      {/* Certificates Section */}`
);


// News section reveal
homeCode = homeCode.replace(
  /<section className="py-20 border-t border-zinc-200">[\s\S]*?<div className="mx-auto max-w-7xl px-6 lg:px-8">([\s\S]*?)<\/div>\s*<\/section>/,
  `<section className="py-20 border-t border-zinc-200">
        <ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8">
          $1
        </ScrollReveal>
      </section>`
);


fs.writeFileSync('src/pages/Home.tsx', homeCode);
console.log('Home updated.');
