// --- Logo Image Paths (Placeholders - replace with your actual paths) ---
export const getLogoPath = (langName) => {
  const lowerCaseName = langName.toLowerCase();
  // Using placehold.co for demonstration. Replace with your actual image paths.
  switch (lowerCaseName) {
    case 'html': return "https://placehold.co/24x24/E44D26/FFFFFF?text=HTML";
    case 'python': return "https://placehold.co/24x24/3776AB/FFD43B?text=PY";
    case 'java': return "https://placehold.co/24x24/007396/FFFFFF?text=JAVA";
    case 'dart': return "https://placehold.co/24x24/0175C2/FFFFFF?text=DART";
    case 'css': return "https://placehold.co/24x24/1572B6/FFFFFF?text=CSS";
    case 'tailwind css': return "https://placehold.co/24x24/06B6D4/FFFFFF?text=TW";
    case 'rust': return "https://placehold.co/24x24/DEA584/FFFFFF?text=RS";
    case 'golang': return "https://placehold.co/24x24/00ADD8/FFFFFF?text=GO";
    case 'actix': return "https://placehold.co/24x24/6A0DAD/FFFFFF?text=AX"; // Generic icon for Actix
    case 'gcp': return "https://placehold.co/24x24/4285F4/FFFFFF?text=GCP";
    case 'aws': return "https://placehold.co/24x24/FF9900/FFFFFF?text=AWS";
    case 'kafka': return "https://placehold.co/24x24/231F20/FFFFFF?text=KF";
    case 'rabbitmq': return "https://placehold.co/24x24/FF6600/FFFFFF?text=RMQ";
    case 'django': return "https://placehold.co/24x24/092E20/FFFFFF?text=DJ";
    case 'postgresql': return "https://placehold.co/24x24/336791/FFFFFF?text=PG";
    case 'mysql': return "https://placehold.co/24x24/00758F/FFFFFF?text=MY";
    case 'mongodb': return "https://placehold.co/24x24/47A248/FFFFFF?text=MDB";
    case 'react': return "https://placehold.co/24x24/61DAFB/FFFFFF?text=RC";
    case 'c++': return "https://placehold.co/24x24/00599C/FFFFFF?text=C++";
    case 'c#': return "https://placehold.co/24x24/9D00FF/FFFFFF?text=C#";
    case 'kotlin': return "https://placehold.co/24x24/7F52FF/FFFFFF?text=KT";
    case 'typescript': return "https://placehold.co/24x24/3178C6/FFFFFF?text=TS"; // TypeScript logo
    case 'docker': return "https://placehold.co/24x24/2496ED/FFFFFF?text=DK";
    case 'kubernetes': return "https://placehold.co/24x24/326CE5/FFFFFF?text=K8S";
    case 'rest': return "https://placehold.co/24x24/364F6B/FFFFFF?text=REST";
    default: return "https://placehold.co/24x24/CCCCCC/999999?text=LANG"; // Fallback
  }
};

// --- Mapeamento de nomes de estatísticas para exibição completa ---
export const statDisplayNames = {
  PWR: 'Poder',
  VEL: 'Velocidade',
  FLX: 'Flexibilidade',
  COM: 'Comunicação',
  CRV: 'Curva'
};
