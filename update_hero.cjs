const fs = require('fs');

let heroCode = fs.readFileSync('src/components/Hero.tsx', 'utf8');

if (!heroCode.includes('import { ScrollReveal, RevealItem }')) {
  heroCode = heroCode.replace(
    "import { motion } from 'motion/react';",
    "import { motion } from 'motion/react';\nimport { ScrollReveal, RevealItem } from './ScrollReveal';"
  );
}

// Wrap internal contents
heroCode = heroCode.replace(
  /<div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">\s*<div className="text-left max-w-2xl">([\s\S]*?)<\/div>\s*<div className="hidden md:grid grid-cols-2 gap-4 w-full max-w-md">([\s\S]*?)<\/div>\s*<\/div>/,
  (match, left, right) => {
    return `<ScrollReveal className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 lg:py-56 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <ScrollReveal staggerChildren className="text-left max-w-2xl">
          ${left.replace(/<div/g, '<RevealItem').replace(/<h1/g, '<RevealItem><h1').replace(/<\/h1>/g, '</h1></RevealItem>').replace(/<p/g, '<RevealItem><p').replace(/<\/p>/g, '</p></RevealItem>').replace(/<div className="flex/g, '<RevealItem className="flex').replace(/<\/div>\s*$/g, '</RevealItem>')}
        </ScrollReveal>
        
        <ScrollReveal staggerChildren delay={0.3} className="hidden md:grid grid-cols-2 gap-4 w-full max-w-md">
          ${right.replace(/<div key/g, '<RevealItem key').replace(/<\/div>\s*$/g, '</RevealItem>').replace(/<\/div>\s*<\/div>/g, '</div></RevealItem>')}
        </ScrollReveal>
      </ScrollReveal>`;
  }
);

fs.writeFileSync('src/components/Hero.tsx', heroCode);
console.log('Hero updated.');
