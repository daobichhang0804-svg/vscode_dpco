const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!homeCode.includes('import { ScrollReveal, RevealItem }')) {
  homeCode = homeCode.replace(
    "import Hero from '../components/Hero';",
    "import Hero from '../components/Hero';\nimport { ScrollReveal, RevealItem } from '../components/ScrollReveal';\nimport InteractiveDistributionMap from '../components/map/InteractiveDistributionMap';"
  );
}

fs.writeFileSync('src/pages/Home.tsx', homeCode);
console.log('Fixed Home imports.');
