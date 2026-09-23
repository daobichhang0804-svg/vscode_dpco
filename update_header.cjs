const fs = require('fs');

let headerCode = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Add import
if (!headerCode.includes('import SearchDropdown')) {
  headerCode = headerCode.replace(
    "import { useLanguage } from '../contexts/LanguageContext';",
    "import { useLanguage } from '../contexts/LanguageContext';\nimport SearchDropdown from './SearchDropdown';"
  );
}

// Add state
if (!headerCode.includes('const [searchQuery, setSearchQuery]')) {
  headerCode = headerCode.replace(
    "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);",
    "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [searchQuery, setSearchQuery] = useState('');\n  const [isSearchOpen, setIsSearchOpen] = useState(false);"
  );
}

// Replace search bar JSX (desktop)
const desktopSearchRegex = /<form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8 relative">[\s\S]*?<\/form>/;
const newDesktopSearch = `<div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
          <form onSubmit={handleSearch} className="w-full relative z-50">
            <input 
              type="text" 
              placeholder={t('header.search')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm text-zinc-700"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-green">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <SearchDropdown 
            query={searchQuery}
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onQueryChange={setSearchQuery}
          />
        </div>`;

headerCode = headerCode.replace(desktopSearchRegex, newDesktopSearch);

fs.writeFileSync('src/components/Header.tsx', headerCode);
console.log('Header updated.');
