import { Product } from '../types';

import shoeStarlinerImg from '../assets/images/shoe_starliner_cyan_1791434236799.jpg';
import shoeSkyrushImg from '../assets/images/shoe_skyrush_orange_1791434255335.jpg';
import shoeApexImg from '../assets/images/shoe_apex_phantom_1791434266109.jpg';
import ballQuantumImg from '../assets/images/ball_quantum_elite_1791434279144.jpg';
import jerseyEncounterImg from '../assets/images/apparel_retro_jersey_1791434289799.jpg';

export const BASKETBALL_PRODUCTS: Product[] = [
  {
    id: 'starliner-shoe',
    name: 'Starliner Basketball Shoe',
    category: 'footwear',
    tag: 'New arrival',
    discountPercent: 10,
    originalPrice: 4999,
    discountedPrice: 4499,
    image: shoeStarlinerImg,
    colors: [
      { name: 'Cyan Blue / Silver', hex: '#38bdf8', secondaryHex: '#e0e7ff', image: shoeStarlinerImg },
      { name: 'Pure White / Ice', hex: '#f8fafc', secondaryHex: '#94a3b8' },
      { name: 'Solar Gold / Obsidian', hex: '#eab308', secondaryHex: '#0f172a' },
      { name: 'Midnight Jet Black', hex: '#18181b', secondaryHex: '#ef4444' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    description: 'Engineered for explosive point guards and fast-paced transition play. Features dual-density responsive foam, lateral TPU outrigger for hard cuts, and a multi-directional herringbone tread.',
    specs: {
      surface: 'Indoor Hardwood',
      cut: 'Low-Top',
      cushioning: 'AeroCushion Nitro Foam Midsole',
      traction: 'Full 360° Herringbone Traction',
      weight: '365g (UK 9)',
      material: 'Engineered Aeromesh with synthetic hot-melt overlays'
    },
    features: [
      'Lateral TPU stability wing prevents ankle rollover on hard stops',
      'Dual-zone forefoot responsiveness for maximum court feel',
      'Breathable anatomical collar with Achilles tendon pillow'
    ],
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    isNew: true
  },
  {
    id: 'quantum-elite-ball',
    name: 'Quantum Elite Match Basketball',
    category: 'balls',
    tag: 'New arrival',
    discountPercent: 0,
    originalPrice: 3699,
    discountedPrice: 3699,
    image: ballQuantumImg,
    colors: [
      { name: 'Tri-Color Royal / Red / White', hex: '#2563eb', secondaryHex: '#dc2626', image: ballQuantumImg },
      { name: 'Official FIBA Classic Ochre', hex: '#ea580c', secondaryHex: '#000000' }
    ],
    sizes: ['Size 7 (Official Mens)', 'Size 6 (Womens/Youth)'],
    description: 'Official tournament specification basketball crafted with Japanese microfiber composite leather, deep pebble recessed channels, and butyl bladder for true bounce trajectory.',
    specs: {
      surface: 'All-Court',
      material: 'Microfiber Composite Leather with Deep Recessed Channels',
      weight: '620g (Size 7)',
      traction: 'Cushioned Core Pebble Skin'
    },
    features: [
      'FIBA approved 12-panel aerodynamic design',
      'Sweat-absorbing composite surface retains grip in high humidity',
      'Nylon-wound butyl core retains air pressure for 180+ days'
    ],
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
    isNew: true
  },
  {
    id: 'skyrush-basketball-shoes',
    name: 'Skyrush Basketball Shoes',
    category: 'footwear',
    tag: 'New arrival',
    discountPercent: 20,
    originalPrice: 2999,
    discountedPrice: 2399,
    image: shoeSkyrushImg,
    colors: [
      { name: 'Black / Solar Flame Orange', hex: '#18181b', secondaryHex: '#f97316', image: shoeSkyrushImg },
      { name: 'Stealth Olive / Crimson', hex: '#3f6212', secondaryHex: '#ef4444' },
      { name: 'Silver Wolf / Royal Blue', hex: '#64748b', secondaryHex: '#2563eb' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    description: 'High-durability basketball shoe built specifically for outdoor asphalt and rough concrete courts. Heavy-gauge rubber compound withstands extreme abrasions without sacrificing comfort.',
    specs: {
      surface: 'Outdoor Concrete',
      cut: 'Mid-Top',
      cushioning: 'Impact-Shield High Rebound EVA',
      traction: 'Deep-Groove Extra Durable Rubber (XDR)',
      weight: '410g (UK 9)',
      material: 'Ballistic Ripstop Nylon & Synthetic Leather'
    },
    features: [
      'High-abrasion solid rubber outsole designed for concrete tarmac',
      'Mid-ankle padded collar providing rigid lateral lockdown',
      'Reinforced drag-zone toe cap protects during crossovers'
    ],
    rating: 4.7,
    reviewCount: 310,
    inStock: true,
    isNew: true
  },
  {
    id: 'apex-phantom-high-top',
    name: 'Apex Phantom High-Top Court Shoe',
    category: 'footwear',
    tag: 'Best seller',
    discountPercent: 15,
    originalPrice: 6499,
    discountedPrice: 5499,
    image: shoeApexImg,
    colors: [
      { name: 'Snow White / Crimson Fire', hex: '#f8fafc', secondaryHex: '#dc2626', image: shoeApexImg },
      { name: 'Triple Carbon Stealth', hex: '#09090b', secondaryHex: '#27272a' },
      { name: 'Court Navy / Cyber Lime', hex: '#1e3a8a', secondaryHex: '#84cc16' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    description: 'The pinnacle of basketball footwear engineering. Featuring high-top lockdown collars, carbon-fiber midfoot shank plate for torsion rigidity, and icy translucent court grip.',
    specs: {
      surface: 'Indoor Hardwood',
      cut: 'High-Top',
      cushioning: 'Nitrogen Infused Gas Cell Midsole',
      traction: 'Translucent Radial Multi-Surface Grip',
      weight: '395g (UK 9)',
      material: 'Adaptive FormKnit & Perforated Full Grain Leather'
    },
    features: [
      'Carbon-fiber composite torsion plate returns spring energy on jumps',
      'Padded dynamic lock collar wraps the Achilles tendon securely',
      'Non-marking razor siped rubber sticks to hardwood effortlessly'
    ],
    rating: 4.9,
    reviewCount: 224,
    inStock: true
  },
  {
    id: 'encounter-retro-jersey',
    name: 'Encounter Retro Basketball Jersey',
    category: 'apparel',
    tag: 'Best seller',
    discountPercent: 5,
    originalPrice: 999,
    discountedPrice: 949,
    image: jerseyEncounterImg,
    colors: [
      { name: 'Vintage Chalk White / Tricolor', hex: '#f5f5f4', secondaryHex: '#dc2626', image: jerseyEncounterImg },
      { name: 'Dark Court Navy / Gold', hex: '#1e293b', secondaryHex: '#eab308' },
      { name: 'Forest Court Green', hex: '#14532d', secondaryHex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Throwback 90s inspired court warm-up jersey. Heavyweight double-knit mesh with moisture-wicking technology keeps you dry through grueling four-quarter battles.',
    specs: {
      material: '100% Recycled Poly Dri-Vent Mesh',
      weight: '180 GSM High-Wick Fabric'
    },
    features: [
      'Athletic relaxed cut tailored for full shooting arm mobility',
      'Sublimated chest stripes will never peel, crack, or fade',
      'Ribbed collar and armholes prevent chafing during active motion'
    ],
    rating: 4.6,
    reviewCount: 78,
    inStock: true
  },
  {
    id: 'court-glide-low-pro',
    name: 'Court Glide Low Pro Shoe',
    category: 'footwear',
    tag: 'Popular',
    discountPercent: 25,
    originalPrice: 3999,
    discountedPrice: 2999,
    image: shoeStarlinerImg,
    colors: [
      { name: 'Volt Lime / Cool Grey', hex: '#84cc16', secondaryHex: '#475569' },
      { name: 'Crimson Ember', hex: '#ef4444', secondaryHex: '#18181b' },
      { name: 'Triple White Clean', hex: '#f8fafc', secondaryHex: '#e2e8f0' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    description: 'Ultralight speed shoe tailored for lightning-fast perimeter defenders and agile guards who demand featherweight mobility and tactile court response.',
    specs: {
      surface: 'All-Court',
      cut: 'Low-Top',
      cushioning: 'AeroPulse Responsive Foam',
      traction: 'Wave Siped Multi-Vector Rubber',
      weight: '320g (UK 9)',
      material: 'Engineered Monomesh Upper'
    },
    features: [
      'Sub-330 gram ultra-light chassis accelerates first-step burst',
      'Molded heel counter locks heel without bulk',
      'Flexible forefoot flex grooves mimic natural foot articulation'
    ],
    rating: 4.6,
    reviewCount: 165,
    inStock: true
  },
  {
    id: 'pro-street-court-ball',
    name: 'StreetGrip Rubber Outdoor Ball',
    category: 'balls',
    tag: 'Best seller',
    discountPercent: 12,
    originalPrice: 1249,
    discountedPrice: 1099,
    image: ballQuantumImg,
    colors: [
      { name: 'Classic Street Orange / Black', hex: '#ea580c', secondaryHex: '#18181b' },
      { name: 'Camouflage Asphalt Grey', hex: '#475569', secondaryHex: '#0f172a' }
    ],
    sizes: ['Size 7 (Official)'],
    description: 'Ultra-tough pebbled vulcanized rubber basketball for cement, rough courts, and park chains. Deep pebble pattern guarantees solid grip in dusty conditions.',
    specs: {
      surface: 'Outdoor Concrete',
      material: 'Vulcanized High-Abrasion Rubber',
      weight: '600g'
    },
    features: [
      'Extra-thick rubber skin withstands aggressive blacktop friction',
      'Deep channeled grooves assist hand alignment during jump shots',
      'Pressure-retention core withstands hot summer court temperatures'
    ],
    rating: 4.8,
    reviewCount: 420,
    inStock: true
  },
  {
    id: 'court-armor-ankle-brace',
    name: 'CourtArmor Pro Ankle Support Brace',
    category: 'accessories',
    tag: 'Best seller',
    discountPercent: 15,
    originalPrice: 1199,
    discountedPrice: 1019,
    image: shoeSkyrushImg,
    colors: [
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Pure White', hex: '#f8fafc' }
    ],
    sizes: ['Small (UK 5-7)', 'Medium (UK 8-10)', 'Large (UK 11-13)'],
    description: 'Medical-grade basketball ankle stabilizer featuring figure-8 ballistic straps and bilateral hinge ribs. Designed to fit comfortably inside all basketball shoes.',
    specs: {
      material: 'Breathable Neoprene & Ballistic Nylon Straps',
      weight: '110g'
    },
    features: [
      'Figure-8 strapping system replicates athletic trainer tape lock',
      'Dual bilateral plastic stays prevent inward/outward inversion',
      'Fits comfortably inside Low, Mid, and High-top basketball shoes'
    ],
    rating: 4.9,
    reviewCount: 184,
    inStock: true
  },
  {
    id: 'pro-cushion-grip-socks',
    name: 'AeroHoops Court Crew Grip Socks (3-Pack)',
    category: 'accessories',
    tag: 'Popular',
    discountPercent: 20,
    originalPrice: 799,
    discountedPrice: 639,
    image: shoeApexImg,
    colors: [
      { name: 'Classic White / Black Band', hex: '#ffffff', secondaryHex: '#000000' },
      { name: 'All Black Hoops', hex: '#18181b' }
    ],
    sizes: ['Free Size (UK 7 - 11)'],
    description: 'High-density silicone traction pads underneath the footbed prevent internal shoe slippage during sudden deceleration, lateral cuts, and vertical jumps.',
    specs: {
      material: '80% Combed Cotton, 15% Nylon, 5% Spandex with Anti-Slip Grip Pads',
      weight: '85g per pair'
    },
    features: [
      'Underfoot silicone micro-tread locks your foot firmly to the shoe insole',
      'Zone-targeted heel and Achilles padding protects against shoe collar friction',
      'Arch compression band prevents sock twist inside high-traction shoes'
    ],
    rating: 4.9,
    reviewCount: 260,
    inStock: true
  },
  {
    id: 'nivia-hycourt-compression-tee',
    name: 'AeroFlex Court Compression Tee',
    category: 'apparel',
    tag: 'Best seller',
    discountPercent: 10,
    originalPrice: 749,
    discountedPrice: 674,
    image: jerseyEncounterImg,
    colors: [
      { name: 'Core Jet Black', hex: '#0f172a' },
      { name: 'Optic White', hex: '#ffffff' },
      { name: 'Court Heather Grey', hex: '#64748b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Compression base layer designed for muscle oxygenation during intense court scrimmages. Flatlock ergonomic seams prevent underarm irritation.',
    specs: {
      material: '88% Polyester, 12% Spandex 4-Way Stretch',
      weight: '160 GSM'
    },
    features: [
      '4-way dynamic stretch construction moves naturally with shooting motions',
      'Anti-odor antimicrobial treatment inhibits court bacteria buildup',
      'Ergonomic flatlock stitching eliminates friction hot spots'
    ],
    rating: 4.7,
    reviewCount: 115,
    inStock: true
  },
  {
    id: 'fast-break-basketball-shorts',
    name: 'FastBreak Mesh Basketball Shorts',
    category: 'apparel',
    tag: 'Popular',
    discountPercent: 18,
    originalPrice: 1299,
    discountedPrice: 1065,
    image: jerseyEncounterImg,
    colors: [
      { name: 'Shadow Black / White Stripe', hex: '#18181b', secondaryHex: '#ffffff' },
      { name: 'Royal Court Blue', hex: '#1d4ed8', secondaryHex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Classic 7-inch inseam athletic court shorts with zippered side pockets to securely hold keys and phones on and off the court.',
    specs: {
      material: 'Double-Layer Diamond Air Mesh',
      weight: '220 GSM'
    },
    features: [
      'Heavyweight striped knitted rib waistband with interior drawstring',
      'Two concealed zippered pockets for safe everyday storage',
      '7-inch above-the-knee modern basketball cut'
    ],
    rating: 4.8,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 'court-dual-action-pump',
    name: 'Dual-Action Ball Air Pump with Pressure Gauge',
    category: 'accessories',
    tag: 'Popular',
    discountPercent: 25,
    originalPrice: 599,
    discountedPrice: 449,
    image: ballQuantumImg,
    colors: [
      { name: 'Matte Black / Orange Accent', hex: '#1e293b', secondaryHex: '#f97316' }
    ],
    sizes: ['Universal Standard'],
    description: 'Pumps air on both push and pull strokes. Built-in precision PSI gauge ensures exact 7.5 to 8.5 PSI tournament regulation basketball inflation.',
    specs: {
      material: 'Reinforced Aluminum Barrel & Flexible Hose',
      weight: '140g'
    },
    features: [
      'Dual action doubles inflation speed',
      'Integrated pressure release bleeder valve',
      'Includes 3 brass needles and flexible hose to prevent needle breakage'
    ],
    rating: 4.7,
    reviewCount: 94,
    inStock: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Basketball' },
  { id: 'footwear', label: 'Footwear' },
  { id: 'balls', label: 'All Balls' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'apparel', label: 'Apparels' },
  { id: 'new', label: 'New', badge: true },
  { id: 'sale', label: 'Sale' }
] as const;
