import glob
import re
import os

files = ['index.html', 'phases.html', 'awareness.html', 'about-us.html', 'stories.html', 'quizzes.html']
link_map = {
    'index.html': 'Home',
    'phases.html': 'Phases',
    'awareness.html': 'Awareness',
    'about-us.html': 'About Us',
    'stories.html': 'Stories',
    'quizzes.html': 'Quizzes'
}

def generate_desktop_menu(active_file):
    links = []
    for f, title in link_map.items():
        if f == active_file:
            links.append(f'                        <a href="{f}" class="text-accent-primary font-medium relative py-1 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent-primary">{title}</a>')
        else:
            links.append(f'                        <a href="{f}" class="text-gray-300 hover:text-white transition-colors font-medium relative py-1 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-primary hover:after:w-full after:transition-all">{title}</a>')
    
    return '\n'.join(links)

def generate_mobile_menu(active_file):
    links = []
    for f, title in link_map.items():
        if f == active_file:
            links.append(f'                <a href="{f}" class="block text-accent-primary bg-white/5 px-3 py-3 rounded-lg text-base font-medium">{title}</a>')
        else:
            links.append(f'                <a href="{f}" class="block text-gray-300 hover:text-white hover:bg-white/5 px-3 py-3 rounded-lg text-base font-medium transition-colors">{title}</a>')
    return '\n'.join(links)

def generate_footer_menu(active_file):
    links = []
    for f, title in link_map.items():
        display_title = "Our Journey" if title == "Phases" else title
        if f == active_file:
            links.append(f'                        <li><a href="{f}" class="text-accent-primary font-medium transition-colors">{display_title}</a></li>')
        else:
            links.append(f'                        <li><a href="{f}" class="text-gray-500 hover:text-accent-primary transition-colors">{display_title}</a></li>')
    return '\n'.join(links)

for f in files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    desktop_new = generate_desktop_menu(f)
    mobile_new = generate_mobile_menu(f)
    footer_new = generate_footer_menu(f)
    
    # Use re.sub to intelligently replace the whole block enclosed by particular boundaries
    # Desktop Menu boundary: <div class="ml-10 flex items-center space-x-8"> ... </div>
    content = re.sub(
        r'(<div class="ml-10 flex items-center space-x-8">.*?)(</div>)',
        f'<div class="ml-10 flex items-center space-x-8">\n{desktop_new}\n                    </div>',
        content,
        flags=re.DOTALL
    )
    
    # Mobile Menu boundary: <div class="px-4 pt-4 pb-6 space-y-2 text-center"> ... </div>
    content = re.sub(
        r'(<div class="px-4 pt-4 pb-6 space-y-2 text-center">.*?)(</div>)',
        f'<div class="px-4 pt-4 pb-6 space-y-2 text-center">\n{mobile_new}\n            </div>',
        content,
        flags=re.DOTALL
    )
    
    # Footer Quick Links boundary: <h4 class="text-white font-bold mb-6 text-lg">Quick Links</h4>\n\s*<ul class="space-y-4"> ... </ul>
    content = re.sub(
        r'(<h4 class="text-white font-bold mb-6 text-lg">Quick Links</h4>\s*<ul class="space-y-4">).*?(</ul>)',
        f'\\1\n{footer_new}\n                    </ul>',
        content,
        flags=re.DOTALL
    )

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Navigation completely synchronized!")
