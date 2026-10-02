import { Product, CollectionName } from '../types';

import heroImg from '../assets/images/hero_cinematic_streetwear_1790259556703.jpg';
import hoodieImg from '../assets/images/product_apex_essential_hoodie_1790259568267.jpg';
import teeImg from '../assets/images/product_apex_core_tee_1790259578419.jpg';
import nightImg from '../assets/images/collection_apex_night_1790259590152.jpg';
import matchingImg from '../assets/images/matching_collection_hoodies_1790259599446.jpg';

export const ASSETS = {
  hero: heroImg,
  hoodie: hoodieImg,
  tee: teeImg,
  night: nightImg,
  matching: matchingImg,
};

export const PRODUCTS: Product[] = [
  {
    id: 'apex-essential-hoodie',
    name: 'APEX ESSENTIAL HOODIE',
    price: 3,
    category: 'HOODIES',
    collection: 'APEX CORE',
    isNew: true,
    gender: 'unisex',
    colors: [
      { name: 'Obsidian Black', hex: '#0f0f10' },
      { name: 'Chalk White', hex: '#f4f4f5' },
      { name: 'Ash Grey', hex: '#52525b' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'Built for everyday movement. A heavyweight silhouette with a refined finish and the signature APEX star mark.',
    fullDescription:
      'Engineered from custom 480 GSM French Terry cotton. Features an architectural drop-shoulder cut, double-layered hood without drawstrings for a sleek profile, ribbed side gussets, and the official embroidered APEX star mark centered cleanly on the chest.',
    images: [
      hoodieImg,
      matchingImg,
      heroImg,
      nightImg,
    ],
    matchingPairId: 'apex-core-tee',
    matchingNote: 'Coordinated Obsidian and Chalk pairing with the subtle APEX star emblem.',
    specs: {
      materials: '100% Organic Heavyweight French Terry Cotton (480 GSM). Pre-shrunk.',
      fit: 'Relaxed drop-shoulder silhouette. True to size for modern drape; size down for standard fit.',
      care: 'Machine wash cold with like colors inside out. Do not tumble dry. Cool iron avoiding embroidery.',
      shipping: 'Complimentary shipping across Egypt (2–3 business days). Express worldwide delivery available.',
      returns: 'Complimentary 14-day hassle-free returns and exchanges in original unworn condition with tags.',
    },
  },
  {
    id: 'apex-core-tee',
    name: 'APEX CORE TEE',
    price: 1450,
    category: 'T-SHIRTS',
    collection: 'APEX CORE',
    isNew: true,
    gender: 'unisex',
    colors: [
      { name: 'Chalk White', hex: '#f4f4f5' },
      { name: 'Obsidian Black', hex: '#0f0f10' },
      { name: 'Charcoal', hex: '#27272a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'The foundational layer. Ultra-dense combed jersey tailored with precision and the signature APEX star mark.',
    fullDescription:
      'Constructed with 280 GSM luxury combed compact cotton. Reinforced 1.25-inch high-rib collar that maintains its crisp structure through countless wears. Features subtle tonal micro-embroidery of the official APEX star emblem on the chest.',
    images: [
      teeImg,
      heroImg,
      hoodieImg,
      matchingImg,
    ],
    matchingPairId: 'apex-essential-hoodie',
    matchingNote: 'Subtle complementary monochrome pairing designed to connect seamlessly.',
    specs: {
      materials: '100% Combed Compact Cotton (280 GSM). Anti-pilling silicone bio-wash finish.',
      fit: 'Relaxed boxy silhouette with extended elbow-length sleeves.',
      care: 'Wash cold inside out. Flat dry recommended. Do not bleach.',
      shipping: 'Express dispatch within 24 hours. Cairo delivery within 48 hours.',
      returns: 'Complimentary 14-day return privilege on all unwashed items.',
    },
  },
  {
    id: 'apex-oversized-hoodie',
    name: 'APEX OVERSIZED HOODIE',
    price: 25,
    category: 'OVERSIZED',
    collection: 'APEX FORM',
    isNew: true,
    gender: 'unisex',
    colors: [
      { name: 'Ash Grey', hex: '#52525b' },
      { name: 'Obsidian Black', hex: '#0f0f10' },
      { name: 'Raw Silver', hex: '#a1a1aa' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'Architectural volume meets supreme comfort. A sculpted silhouette detailed with the APEX star emblem.',
    fullDescription:
      'Cut with bold geometric proportions inspired by brutalist architecture. 500 GSM loopback cotton fleece with brushed interior for thermal protection. Concealed kangaroo pocket with invisible seam zips.',
    images: [
      matchingImg,
      hoodieImg,
      heroImg,
      nightImg,
    ],
    specs: {
      materials: '100% Heavyweight Brushed Cotton Fleece (500 GSM). Custom milled.',
      fit: 'Generous oversized fit with exaggerated drop shoulder and structured cuffs.',
      care: 'Dry clean or cold gentle cycle. Do not iron over star embroidery.',
      shipping: 'Tracked premium door-to-door courier service with SMS status updates.',
      returns: 'Exchange or full refund available within 14 days of delivery.',
    },
  },
  {
    id: 'apex-heavyweight-tee',
    name: 'APEX HEAVYWEIGHT TEE',
    price: 1600,
    category: 'T-SHIRTS',
    collection: 'APEX MOTION',
    isNew: false,
    gender: 'unisex',
    colors: [
      { name: 'Obsidian Black', hex: '#0f0f10' },
      { name: 'Chalk White', hex: '#f4f4f5' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'Elevated weight for substantial drape. Designed for everyday movement with the iconic APEX mark.',
    fullDescription:
      'A dense 310 GSM carded jersey that holds a defined geometric shape. Features seam-free seamless sides and a reinforced neckline with tonal APEX star embroidery.',
    images: [
      teeImg,
      nightImg,
      heroImg,
      hoodieImg,
    ],
    specs: {
      materials: '100% Carded Heavy Jersey Cotton (310 GSM).',
      fit: 'Structured straight cut. Tailored for elevated casual wear.',
      care: 'Machine wash delicate cold. Hang dry in shade.',
      shipping: 'Ships in bespoke APEX matte black embossed recyclable box.',
      returns: '14-day risk-free returns.',
    },
  },
  {
    id: 'apex-signature-hoodie',
    name: 'APEX SIGNATURE HOODIE',
    price: 3450,
    category: 'HOODIES',
    collection: 'APEX NIGHT',
    isNew: true,
    gender: 'unisex',
    colors: [
      { name: 'Night Charcoal', hex: '#18181b' },
      { name: 'Obsidian Black', hex: '#0f0f10' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'The pinnacle of APEX craftsmanship. Minimalist design featuring high-density silver metallic star detailing.',
    fullDescription:
      'Crafted for evening movement and urban exploration. Features a refined matte surface with high-density silver yarn embroidery of the star emblem and APEX wordmark discreetly anchored beneath.',
    images: [
      nightImg,
      hoodieImg,
      matchingImg,
      heroImg,
    ],
    specs: {
      materials: '95% Compact Cotton, 5% Technical Cashmere Blend (520 GSM).',
      fit: 'Precision tailored modern streetwear cut.',
      care: 'Dry clean recommended or hand wash cold.',
      shipping: 'Priority delivery within 24–48 hours.',
      returns: 'White-glove courier pickup for returns within Cairo & Giza.',
    },
  },
  {
    id: 'apex-form-oversized-tee',
    name: 'APEX FORM OVERSIZED TEE',
    price: 1550,
    category: 'OVERSIZED',
    collection: 'APEX FORM',
    isNew: false,
    gender: 'unisex',
    colors: [
      { name: 'Concrete Grey', hex: '#71717a' },
      { name: 'Chalk White', hex: '#f4f4f5' },
      { name: 'Obsidian Black', hex: '#0f0f10' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'Sculpted drape and architectural clean lines. Finished with the subtle centered APEX star mark.',
    fullDescription:
      'Minimalism translated into pure silhouette. The FORM tee uses high-gauge yarn for a smooth, fluid hand feel while retaining an intentional squared shoulder shape.',
    images: [
      teeImg,
      heroImg,
      matchingImg,
      nightImg,
    ],
    specs: {
      materials: '100% Long-Staple Egyptian Cotton (290 GSM).',
      fit: 'Oversized box silhouette with dropped shoulder seams.',
      care: 'Cold water wash, gentle cycle. Hang dry.',
      shipping: 'Complimentary shipping on orders over EGP 2,500.',
      returns: 'Complimentary returns within 14 days.',
    },
  },
  {
    id: 'apex-motion-hoodie',
    name: 'APEX MOTION HOODIE',
    price: 3600,
    category: 'HOODIES',
    collection: 'APEX MOTION',
    isNew: false,
    gender: 'unisex',
    colors: [
      { name: 'Matte Black', hex: '#121214' },
      { name: 'Silver Slate', hex: '#71717a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    shortDescription:
      'Ergonomic construction engineered for active urban pace. Minimalist APEX star mark on chest.',
    fullDescription:
      'Designed with articulated sleeve darts, breathability underarm grommets, and stretch French terry. Created for unrestricted motion from morning training to midnight transit.',
    images: [
      hoodieImg,
      heroImg,
      nightImg,
      matchingImg,
    ],
    specs: {
      materials: '92% Heavy Cotton, 8% Elastane Stretch Knit (460 GSM).',
      fit: 'Athletic tailored streetwear fit.',
      care: 'Machine wash cold. Do not use fabric softeners.',
      shipping: 'Standard delivery 2–3 business days.',
      returns: '14-day return window.',
    },
  },
  {
    id: 'apex-limited-star-hoodie',
    name: 'APEX LIMITED STAR HOODIE',
    price: 4500,
    category: 'LIMITED EDITION',
    collection: 'APEX LIMITED',
    isNew: true,
    isLimited: true,
    editionNumber: '042/150',
    totalStock: 150,
    remainingStock: 14,
    releaseDate: 'FALL 2026',
    gender: 'unisex',
    colors: [
      { name: 'Deep Obsidian', hex: '#09090b' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription:
      'Numbered small-batch release. Pure silver thread star embroidery with individualized numbered inner leather patch.',
    fullDescription:
      'Only 150 pieces produced worldwide. Features individually hand-numbered debossed leather interior tag, solid sterling silver tipped drawcords, and custom woven APEX star insignia.',
    images: [
      hoodieImg,
      nightImg,
      matchingImg,
      heroImg,
    ],
    specs: {
      materials: '100% Japanese Heavy French Terry (540 GSM). Sterling silver aglets.',
      fit: 'Substantial structured cut. Custom tailored aesthetic.',
      care: 'Specialist dry clean only.',
      shipping: 'Insured priority white-glove courier with custom serial certificate.',
      returns: 'Eligible for return within 7 days with intact security seal.',
    },
  },
];

export const COLLECTIONS_DATA = [
  {
    id: 'APEX CORE' as CollectionName,
    title: 'APEX CORE',
    tagline: 'The essential APEX pieces.',
    description:
      'Foundational silhouettes engineered with uncompromising fabric density, refined monochrome tones, and timeless daily wearability.',
    image: heroImg,
    itemCount: '12 Pieces',
  },
  {
    id: 'APEX MOTION' as CollectionName,
    title: 'APEX MOTION',
    tagline: 'Sport and movement-inspired pieces.',
    description:
      'Technical streetwear tuned for human momentum. Ergonomic panelling, moisture balance, and lightweight performance textiles.',
    image: matchingImg,
    itemCount: '8 Pieces',
  },
  {
    id: 'APEX FORM' as CollectionName,
    title: 'APEX FORM',
    tagline: 'Minimal architectural designs.',
    description:
      'Brutalist proportions and razor-sharp cuts. Substantial drapes that create a commanding presence in negative space.',
    image: teeImg,
    itemCount: '10 Pieces',
  },
  {
    id: 'APEX NIGHT' as CollectionName,
    title: 'APEX NIGHT',
    tagline: 'Dark monochrome pieces.',
    description:
      'Pure shades of obsidian, carbon, and subtle silver reflectivity designed for nocturnal urban exploration.',
    image: nightImg,
    itemCount: '6 Pieces',
  },
  {
    id: 'APEX LIMITED' as CollectionName,
    title: 'APEX LIMITED',
    tagline: 'Small-batch special releases.',
    description:
      'Hand-numbered editions produced in strictly finite quantities with precious metal finishes and bespoke collector packaging.',
    image: hoodieImg,
    itemCount: '3 Pieces Remaining',
  },
];

export const LOOKBOOK_ITEMS = [
  {
    id: 'lb-01',
    season: 'APEX / FALL 2026',
    title: 'FORM 01',
    location: 'Concrete Brutalist Pavilion',
    image: heroImg,
    featuredProduct: 'APEX Essential Hoodie in Obsidian Black',
  },
  {
    id: 'lb-02',
    season: 'APEX / FALL 2026',
    title: 'NIGHT METROPOLIS',
    location: 'Central Plaza Transit',
    image: nightImg,
    featuredProduct: 'APEX Signature Hoodie in Night Charcoal',
  },
  {
    id: 'lb-03',
    season: 'APEX / FALL 2026',
    title: 'TWO. ONE ENERGY.',
    location: 'Atrium Minimal Study',
    image: matchingImg,
    featuredProduct: 'Coordinated APEX Star Hoodies in Black & Chalk',
  },
  {
    id: 'lb-04',
    season: 'APEX / FALL 2026',
    title: 'CORE FOUNDATION',
    location: 'Travertine Studio Loft',
    image: teeImg,
    featuredProduct: 'APEX Core Tee in Chalk White',
  },
];
