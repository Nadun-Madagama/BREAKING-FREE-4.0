import glob
import re
import os

html_files = glob.glob('*.html')

nav_desktop_insert = '\n                        <a href="awareness.html"\n                            class="text-gray-300 hover:text-white transition-colors font-medium relative py-1 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-primary hover:after:w-full after:transition-all">Awareness</a>'

nav_mobile_insert = '\n                <a href="awareness.html"\n                    class="block text-gray-300 hover:text-white hover:bg-white/5 px-3 py-3 rounded-lg text-base font-medium transition-colors">Awareness</a>'

footer_insert = '\n                        <li><a href="awareness.html" class="text-gray-500 hover:text-accent-primary transition-colors">Awareness</a></li>'

for f in html_files:
    if f in ['awareness.html', 'index.html']:
        continue
        
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Replace Desktop Menu
    content = re.sub(
        r'(<a href="phases\.html"\s+class="[^"]*">Phases</a>)',
        r'\1' + nav_desktop_insert,
        content
    )
    
    # Replace Mobile Menu
    content = re.sub(
        r'(<a href="phases\.html"\s+class="block [^"]*">Phases</a>)',
        r'\1' + nav_mobile_insert,
        content
    )
    
    # Replace Footer Menu
    content = re.sub(
        r'(<li><a href="phases\.html" class="[^"]*">Our\s*Journey</a></li>)',
        r'\1' + footer_insert,
        content
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Updated all HTML files successfully.")
