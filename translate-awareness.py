import os, re

# Read original
with open('awareness.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add toggle to awareness.html
toggle_en = '''
    <!-- Language Toggle -->
    <div class="fixed top-24 right-4 sm:right-8 z-[60] bg-slate-dark/80 backdrop-blur-md border border-white/10 rounded-full p-1 flex shadow-[0_0_20px_rgba(45,212,191,0.2)]">
        <a href="awareness.html" class="px-3 py-1 text-sm font-bold rounded-full bg-accent-primary text-white pointer-events-none shadow-sm">EN</a>
        <a href="awareness-si.html" class="px-3 py-1 text-sm font-medium rounded-full text-gray-400 hover:text-white transition-colors">සිංහල</a>
    </div>
'''

toggle_si = '''
    <!-- Language Toggle -->
    <div class="fixed top-24 right-4 sm:right-8 z-[60] bg-slate-dark/80 backdrop-blur-md border border-white/10 rounded-full p-1 flex shadow-[0_0_20px_rgba(45,212,191,0.2)]">
        <a href="awareness.html" class="px-3 py-1 text-sm font-medium rounded-full text-gray-400 hover:text-white transition-colors" style="font-family: Outfit, sans-serif;">EN</a>
        <a href="awareness-si.html" class="px-3 py-1 text-sm font-bold rounded-full bg-accent-primary text-white pointer-events-none shadow-sm">සිංහල</a>
    </div>
'''

# insert toggles right after <body> tag
if "<!-- Language Toggle -->" not in content:
    content_en = re.sub(r'(<body[^>]*>)', r'\1\n' + toggle_en, content)
else:
    content_en = content

with open('awareness.html', 'w', encoding='utf-8') as f:
    f.write(content_en)

content_si = re.sub(r'(<body[^>]*>)', r'\1\n' + toggle_si, content)

# 2. Translations for Sinhala
replacements = {
    'Educational Awareness': 'අධ්‍යාපනික දැනුවත් කිරීම',
    'Prevention &amp; Awareness Program': 'නිවාරණ සහ දැනුවත් කිරීමේ වැඩසටහන',
    'Prevention & Awareness Program': 'නිවාරණ සහ දැනුවත් කිරීමේ වැඩසටහන',
    'Life should be about': 'ජීවිතය යනු',
    'Freedom, Happiness, &amp; Purpose.': 'නිදහස, සතුට සහ අරමුණක් විය යුතුය.',
    'Freedom, Happiness, & Purpose.': 'නිදහස, සතුට සහ අරමුණක් විය යුතුය.',
    '...Not Addiction.': '...ඇබ්බැහි වීමක් නොවේ.',
    "Discover the scientific truth about alcohol, tobacco, and drugs. Let's break the cycle and empower the youth to take control.": "මත්පැන්, දුම්කොළ සහ මත්ද්‍රව්‍ය පිළිබඳ විද්‍යාත්මක සත්‍යය සොයාගන්න. අපි මෙම චක්‍රය බිඳ දමා අනාගතය ජය ගැනීමට තරුණ පරපුර බලගන්වමු.",
    'What is <span class="text-purple-400">Addiction?</span>': 'ඇබ්බැහි වීම <span class="text-purple-400">යනු කුමක්ද?</span>',
    'It doesn’t start big — it starts small. People think it’s “harmless” at first.': 'එය විශාලව ආරම්භ නොවේ — එය කුඩා ලෙසින් අරඹයි. මුලින් මිනිසුන් සිතන්නේ "එය හානිකර නැහැ" කියාය.',
    'How It Starts': 'ආරම්භ වන ආකාරය',
    'Peer Pressure': 'මිතුරන්ගේ බලපෑම',
    'Curiosity': 'කුතුහලය',
    'Stress': 'මානසික ආතතිය',
    'Social Influence': 'සමාජ බලපෑම්',
    'Myths vs Reality': 'මිථ්‍යාව සහ යථාර්ථය',
    'Myth: "It reduces stress and is harmless."': 'මිථ්‍යාව: "මෙය ආතතිය අඩු කරන අතර හානිකර නැත."',
    'Reality: It physically alters the brain, damages health, and creates immense long-term stress.': 'යථාර්ථය: එය මොළය භෞතිකව වෙනස් කරයි, සෞඛ්‍යයට හානි කරයි, සහ දීර්ඝකාලීන දැඩි ආතතියක් ඇති කරයි.',
    'Myth: "Everyone is doing it."': 'මිථ්‍යාව: "හැමෝම මේක කරනවා."',
    'Reality: You only see what\'s visible. The majority live healthy, meaningful lives without substances.': 'යථාර්ථය: ඔබට පෙනෙන්නේ පිටින් පෙනෙන දේ පමණි. බහුතරයක් මත්ද්‍රව්‍ය නොමැතිව නිරෝගී, අර්ථවත් ජීවිත ගත කරති.',
    'The Trap: <span class="text-accent-primary">The Addiction Cycle</span>': 'උගුල: <span class="text-accent-primary">ඇබ්බැහි වීමේ චක්‍රය</span>',
    'Try for Fun': 'විනෝදයට උත්සාහ කිරීම',
    'Harmless curiosity.': 'හානිකර නැතැයි සිතා කුතුහලයට කිරීම.',
    'Repeat Socially': 'සමාජීයව නැවත කිරීම',
    'Becoming a habit.': 'පුරුද්දක් බවට පත්වීම.',
    'Become Dependent': 'යැපීමට පත්වීම',
    'Cravings start.': 'ආශාවන් ආරම්භ වීම.',
    'Lose Control': 'පාලනය ගිලිහීයාම',
    'Life becomes restricted.': 'ජීවිතය සීමා වීම.',
    'Major Health Problem in Sri Lanka': 'ශ්‍රී ලංකාවේ ප්‍රධානතම සෞඛ්‍ය අර්බුදය',
    'The <span class="text-red-500">Silent Epidemic</span>': '<span class="text-red-500">නිහඬ වසංගතය</span>',
    'of all deaths in Sri Lanka': 'ශ්‍රී ලංකාවේ සියලුම මරණ වලින්',
    'Are caused by Non-Communicable Diseases (NCDs).': 'බෝ නොවන රෝග හේතුවෙන් සිදුවේ.',
    'Deaths per day from smoking': 'දුම්පානය හේතුවෙන් දිනකට සිදුවන මරණ',
    'Deaths per year': 'වසරකට මරණ',
    'Smoking &amp; Drug Effects': 'දුම් සහ මත්ද්‍රව්‍ය වල බලපෑම',
    'Smoking & Drug Effects': 'දුම් සහ මත්ද්‍රව්‍ය වල බලපෑම',
    '"Smoking destroys both body and mind."': '"දුම්පානය ශරීරය මෙන්ම මනස ද විනාශ කරයි."',
    'Short-Term Effects': 'කෙටිකාලීන බලපෑම්',
    'Bad Smell': 'අමිහිරි දුගඳ',
    'Reduced Energy': 'ශක්තිය අඩුවීම',
    'Breathing Difficulty': 'හුස්ම ගැනීමේ අපහසුතා',
    'Loss of Appetite': 'ආහාර අරුචිය',
    'Poor Performance': 'දුර්වල ක්‍රියාකාරිත්වය',
    'Long-Term Effects &amp; Diseases': 'දිගුකාලීන බලපෑම් සහ රෝග',
    'Long-Term Effects & Diseases': 'දිගුකාලීන බලපෑම් සහ රෝග',
    'Cancer': 'පිළිකා',
    'Heart Disease': 'හෘද රෝග',
    'Lung Damage': 'පෙනහළු හානි වීම',
    'Mental Issues': 'මානසික ගැටළු',
    'Kidney Disease': 'වකුගඩු රෝග',
    'Sexual Weakness': 'ලිංගික දුර්වලතා',
    'Financial Impact': 'මූල්‍යමය බලපෑම',
    'The Price We <span class="text-green-500">All Pay</span>': 'අප සැවොම <span class="text-green-500">ගෙවන මිල</span>',
    'It drains personal savings and creates a massive economic disaster for the country.': 'එය පුද්ගලික ඉතුරුම් විනාශ කර රටට දැවැන්ත ආර්ථික ව්‍යසනයක් ඇති කරයි.',
    'Personal Cost Overview <br><span class="text-sm font-normal text-gray-500">(Based on 3 cigarettes/day)</span>': 'පුද්ගලික වියදම් සමාලෝචනය <br><span class="text-sm font-normal text-gray-500">(දිනකට සිගරට් 3ක් මත පදනම්ව)</span>',
    'Daily': 'දිනකට',
    'Monthly': 'මසකට',
    'Yearly Loss': 'වාර්ෂික පාඩුව',
    'What else you could do with <span class="text-green-400">Rs. 172,800</span> a year': 'වසරකට <span class="text-green-400">රු. 172,800</span> කින් ඔබට වෙනත් කළ හැකි දේවල්',
    'A Quality Laptop': 'උසස් තත්ත්වයේ ලැප්ටොප් පරිගණකයක්',
    'Invest in your education and career': 'ඔබේ අධ්‍යාපනය සහ වෘත්තිය සඳහා ආයෝජනය කරන්න',
    'A Vacation Abroad': 'විදේශ සංචාරයක්',
    'Create unforgettable memories': 'අමතක නොවන මතකයන් නිර්මාණය කරන්න',
    'Months of Groceries': 'මාස කිහිපයකට අවශ්‍ය සිල්ලර බඩු',
    'Provide quality food for your family': 'ඔබේ පවුලට ගුණාත්මක ආහාර ලබා දෙන්න',
    'A Solid Investment': 'ශක්තිමත් ආයෝජනයක්',
    'Grow your wealth for the future': 'අනාගතය සඳහා ඔබේ ධනය වර්ධනය කරන්න',
    'Economic Impact on Sri Lanka': 'ශ්‍රී ලංකාවට ඇති ආර්ථික බලපෑම',
    '"The country loses MORE than it earns from tobacco."': '"දුම්කොළ වලින් උපයනවාට වඩා වැඩි ප්‍රමාණයක් රටට අහිමි වේ."',
    'Govt. Income from Tobacco': 'රජයේ දුම්කොළ ආදායම',
    'Cost of Smoking-Related Issues': 'දුම්පානය නිසා ඇතිවන ගැටළු වෙනුවෙන් යන වියදම',
    'Billion': 'බිලියන',
    'Tobacco Industry Reality': 'දුම්කොළ කර්මාන්තයේ යථාර්ථය',
    'They increase profits while harming people. Weak policies allow their growth.': 'ඔවුන් මිනිසුන්ට හානි කරමින් ලාභය වැඩි කරති. දුර්වල ප්‍රතිපත්ති ඔවුන්ගේ වර්ධනයට ඉඩ දෙයි.',
    'Price increases often still benefit the companies massively.': 'මිල ඉහළ යාම බොහෝ විට එම සමාගම්වලට විශාල වශයෙන් ප්‍රතිලාභය සපයයි.',
    'Example: Extra <strong>Rs. 18 million daily income</strong> goes to these companies from simple habit maintenance.': 'ඇබ්බැහිවූවන් නිසා දිනකට අමතර <strong>රුපියල් මිලියන 18ක ආදායමක්</strong> මෙම සමාගම් වලට යයි.',
    'Manipulation': 'මායාවන් මගින් පාලනය කිරීම',
    'The <span class="text-blue-400">Media</span> Illusion': '<span class="text-blue-400">මාධ්‍ය </span> මායාව',
    '"Smoking is made to look \'cool\' and \'normal\' to target the youth."': '"තරුණ පරපුර ඉලක්ක කර ගැනීම සඳහා දුම්පානය \'නව විලාසිතාවක්\' සහ \'සාමාන්‍ය දෙයක්\' ලෙස පෙනෙන්නට සලස්වනු ලැබේ."',
    'Hidden Manipulation': 'සැඟවුණු පාලනය',
    'Characters people admire are used to promote smoking. <span class="text-white font-medium">More exposure = higher chance of youth starting.</span>': 'මිනිසුන් අගය කරන චරිත දුම්පානය ප්‍රවර්ධනය කිරීමට යොදා ගනී. <span class="text-white font-medium">වඩාත් නිරාවරණය වීම = තරුණයන් මෙය ආරම්භ කිරීමට ඇති ඉඩකඩ වැඩි වීම.</span>',
    'Movies': 'චිත්‍රපට',
    'Ads': 'වෙළඳ දැන්වීම්',
    'Social Media': 'සමාජ මාධ්‍ය',
    'Celebrities': 'ජනප්‍රිය තරු',
    'Cartoons': 'කාටූන්',
    'Statistics': 'සංඛ්‍යා ලේඛන',
    'Usage Is A <span class="text-purple-400">Growing Problem</span>': 'මෙය <span class="text-purple-400">වර්ධනය වන ගැටළුවකි</span>',
    'Alcohol and cigarette consumption are continuously trending upward.': 'මත්පැන් සහ සිගරට් පරිභෝජනය අඛණ්ඩව ඉහළ යමින් පවතී.',
    'Daily Alcohol Consumption <span>(Units/Day)</span>': 'දිනපතා මත්පැන් පරිභෝජනය <span>(ඒකක / දිනකට)</span>',
    'Units': 'ඒකක',
    'Cigarette Production': 'සිගරට් නිෂ්පාදනය',
    'Trends from 1995–2021 show a persistent presence of manufacturing despite health campaigns, enforcing the need for personal awareness.': 'සෞඛ්‍ය ව්‍යාපාර ක්‍රියාත්මක වුවද නිෂ්පාදනයේ අඛණ්ඩව පවත්වා ගැනීමක් පෙන්නුම් කරන බැවින් පුද්ගලික දැනුවත්භාවයේ අවශ්‍යතාවය දැඩි කරයි.',
    'Psycho &amp; Social <span class="text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-200">Traps</span>': 'මානසික සහ සමාජීය <span class="text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-200">උගුල්</span>',
    'Psycho & Social <span class="text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-200">Traps</span>': 'මානසික සහ සමාජීය <span class="text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-200">උගුල්</span>',
    'Life becomes trapped and restricted. It affects not just you, but everyone around you.': 'ජීවිතය කොටුවී සීමා වේ. එය ඔබට පමණක් නොව ඔබ වටා සිටින සැමට බලපායි.',
    'Limits Life': 'ජීවිතය සීමා කරයි',
    'Freedom': 'නිදහස',
    'Happiness': 'සතුට',
    'Relationships': 'සබඳතා',
    'Future Opportunities': 'අනාගත අවස්ථා',
    'Leads To': 'මේ වෙත යොමු කරයි',
    'Isolation': 'හුදෙකලා වීම',
    'Poor Decision Making': 'දුර්වල තීරණ ගැනීම',
    'Absolute Dependence': 'පූර්ණ වශයෙන් යැපීම',
    'Broader Social Impact': 'පුළුල් සමාජීය බලපෑම',
    'Affects families, communities, and the economy, ultimately leading to <span class="text-white">poverty</span>, health burdens, and severe social issues.': 'පවුල්, ප්‍රජාවන් සහ ආර්ථිකයට බලපාන අතර අවසානයේ එය <span class="text-white">දුප්පත්කමට</span>, සෞඛ්‍ය බරට සහ දැඩි සමාජ ගැටලු වලට මඟ පාදයි.',
    'Addiction is not freedom.<br>': 'ඇබ්බැහි වීම යනු නිදහස නොවේ.<br>',
    '<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">It is a trap that destroys life slowly.</span>': '<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">එය සෙමින් ජීවිතය විනාශ කරන උගුලකි.</span>',
    'Real life should be Free, Healthy, Happy, and Meaningful.': 'සැබෑ ජීවිතය නිදහස්, නිරෝගී, සතුටින් පිරි, අර්ථවත් එකක් විය යුතුය.',
    'Take Control of Your Future': 'ඔබේ අනාගතය පාලනය කරන්න'
}

for eng, sin in replacements.items():
    content_si = content_si.replace(eng, sin)

# Use Noto Sans Sinhala or Iskoola Pota for better rendering
content_si = content_si.replace("sans: ['Outfit', 'sans-serif'],", 
                                "sans: ['Noto Sans Sinhala', 'Abhaya Libre', 'Outfit', 'sans-serif'],")

# Swap Language Toggle Button Active States
content_si = content_si.replace(
    '<a href="awareness.html" class="px-3 py-1 text-sm font-bold rounded-full bg-accent-primary text-white pointer-events-none shadow-sm">EN</a>',
    '<a href="awareness.html" class="px-3 py-1 text-sm font-medium rounded-full text-gray-400 hover:text-white transition-colors">EN</a>'
)
content_si = content_si.replace(
    '<a href="awareness-si.html" class="px-3 py-1 text-sm font-medium rounded-full text-gray-400 hover:text-white transition-colors">සිංහල</a>',
    '<a href="awareness-si.html" class="px-3 py-1 text-sm font-bold rounded-full bg-accent-primary text-white pointer-events-none shadow-sm">සිංහල</a>'
)

with open('awareness-si.html', 'w', encoding='utf-8') as f:
    f.write(content_si)
