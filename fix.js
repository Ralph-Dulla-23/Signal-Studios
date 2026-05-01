const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replaceAll(
  'className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-body-md transition-colors min-h-[48px]"',
  'className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md transition-colors min-h-[48px]"'
);

// also let's add body scroll lock to isMobileMenuOpen effect
if (!content.includes('document.body.style.overflow = "hidden"')) {
    content = content.replace(
        '  useEffect(() => {',
        `  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {`
    )
}

fs.writeFileSync('src/App.tsx', content);
console.log('done');
