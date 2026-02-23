const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');

    // Tailwind Config
    content = content.replace(/'accent-orange': '#f97316'/g, "'accent-primary': '#2dd4bf'");
    content = content.replace(/'accent-glow': '#fb923c'/g, "'accent-secondary': '#34d399'");

    // Tailwind Classes
    content = content.replace(/accent-orange/g, 'accent-primary');
    content = content.replace(/hover:bg-orange-600/g, 'hover:bg-teal-600');
    content = content.replace(/to-red-500/g, 'to-green-500');

    // Navbar Brand Replace
    const brandRegex = /<span class="text-2xl font-bold text-white tracking-tight">\s*Breaking\s*<span\s*class="text-accent-primary">\s*Free\s*<\/span>\s*4\.0\s*<\/span>/g;

    const newBrand = `<img src="assets/logo.png" alt="Breaking Free 4.0 Logo" class="h-[60px] w-auto object-contain">
                        <span class="text-2xl font-bold text-white tracking-tight hidden sm:block">Breaking<span
                                class="text-accent-primary">Free</span> 4.0</span>`;

    content = content.replace(brandRegex, newBrand);

    // Footer Brand Replace
    const footerBrandRegex = /<span class="text-3xl font-bold text-white tracking-tight">\s*Breaking\s*<span\s*class="text-accent-primary">\s*Free\s*<\/span>\s*4\.0\s*<\/span>/g;

    const footerBrandNew = `<div class="flex items-center gap-3">
                        <img src="assets/logo.png" alt="Breaking Free 4.0 Logo" class="h-16 w-auto object-contain">
                        <span class="text-3xl font-bold text-white tracking-tight">Breaking<span
                            class="text-accent-primary">Free</span> 4.0</span>
                    </div>`;

    content = content.replace(footerBrandRegex, footerBrandNew);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${file}`);
});
