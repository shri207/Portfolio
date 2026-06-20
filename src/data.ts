import { Service, Package, AlaCarteCategory, Therapist, GalleryItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'hair-1',
    category: 'HAIR',
    title: 'Precision Cutting',
    price: '$80+',
    description: 'Bespoke styling tailored to your features and lifestyle, executed with masterful technique for a flawless finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO0Uk_RWvdV5VYVxrLIT82zSwwm_HQoyPprIoui4o_DgP3A6jzORsJNQNZ_tw_M2FZpmlV2oiZCRf1B9ltYNBxZNzjg7iKU5x5ry1zqFeMkJ4Zlmt9ClyYY46UUTf-m-8aBwM4qzW9JPsJpqnUpMYQufLZp6pp-9fNOSkIHg5SpRrn751BoI8I4ENoMRsCuaiAHj__6OuPpLiZEW4tCs5fA6uWnDIzt9J0YGWnJy2AVZ4fUz-NR98mrp-wcsIDbHe9IKLdDh0F9ZY1',
    dataAlt: "A close-up of a stylist's hands elegantly cutting hair using premium shears in a luxury salon setting."
  },
  {
    id: 'color-1',
    category: 'COLOR',
    title: 'Dimensional Color',
    price: '$150+',
    description: 'Rich, multi-tonal coloring utilizing premium organic formulations to protect hair integrity while delivering stunning depth.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjangEuKUlBC-573LtvlsOwP3ZS7cZlAAdwHaW9N6d0uzKFCkTar7VnKovemTW0K2eDGIQJ47as6euC9Nqhu8UOWME8tbqPaOKSWVIMVPU5toxOF2j3ia7TW0l7YVq-EmVMx1USuGbmBbv-NE0c8WuCspN2irMR8WW6qJpcDDLacM9Fe2ouS-Ic7NFxa0o-Pz0T6QgjAZblZd33eTzoQadXDNzdmCW2vvbYwEtSJfZa2BRRTz9iV9zp0Ko9mHYID5QlWD-_QPx4ZD6',
    dataAlt: 'A rich, vibrant shot of hair color mixing bowls on a sleek black marble counter in a luxury salon.'
  },
  {
    id: 'makeup-1',
    category: 'MAKEUP',
    title: 'Bridal Artistry',
    price: '$250+',
    description: 'Comprehensive bridal consultation and application designed for long-lasting, camera-ready perfection on your special day.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_FNGP04EPPsjZS-9IzeuAVB5MhQXXf4PZDH888sftyr8PyAszgYz5Mt3OS1bzmLZhpDgpIvrSHYUYwVUsYiZt4xi0uf2srCnRKqw8QmaH4e8wJmwi5tu7GRQVhqs0-03LjQT2pcvaZqFpbDZf8gx8t63oSRNSA4VKzHc3JzbmU091nbrKI07Sgc-bIimKZrmB9JFndwU10J_qL3T0uRUtFZ9xB8uJfODV9obrMBh9RBE-9AK8Vud7oQBs8b5kdT6JhJNcC7giMLIE',
    dataAlt: 'A stunningly elegant bridal makeup setup featuring premium cosmetics, soft glowing lighting, and a dark, moody background.'
  },
  {
    id: 'skin-1',
    category: 'SKINCARE',
    title: 'Signature Facial',
    price: '$120+',
    description: 'A deeply restorative treatment utilizing active botanical ingredients to rejuvenate, hydrate, and illuminate your complexion.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSMwzp1VfXYcRVHh3BNzZKeQKhIAo4mbUAaK6G7kMmNJmHdTp_6a-FmrFTAINAaFXjZrOPmiMi0eVG-7fRnT4gncGACsYULv4GrQk0hkPuwLiYwRPGjYFot_YtDCDwcTKS-JqKOFDYa3SIsZa-Pikgzg-jqFYZihPhPGTQLDiTIIrh1ywe8veWWXh3AtYGxKMWrfoLfsOQQ1T5S2uF_BVCmBnsM_mQty5wxVTzNylBrQMCiNxzCgOQBPc027dt7lvdUqDRy04WEIen',
    dataAlt: 'A tranquil, high-end facial treatment room with a pristine towel setup on a luxurious treatment bed.'
  },
  {
    id: 'spa-1',
    category: 'SPA',
    title: 'Therapeutic Massage',
    price: '$180+',
    description: 'Release tension and restore balance with our customized massage therapies, incorporating heated stones and essential oils.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWZ9V3M83BUGug9KFH43AyEyTKyE0VZ8lYdaLiYsR2YyoEoget5nvykGrFIHdq1XsFSPooV0zR49j7ccTt5c0aDFiK3xx8WX1X8Ex-5QJPYOdPTV1z_AQRr14U_8Z1vcXhzYpWZHSJBefzekhnAvZGXy4jfbEI7cr-Oel5expEPRfGN9JHoJYE0QdcxGN6pjcLFO7WQSVYw1rRUF3Qa-7iewaxtRWqMKGavuQ6X5ahae9uyHmyJkJzm2l3MLkHWyLtWU8mhxGpd7lh',
    dataAlt: 'A serene spa environment featuring smooth hot stones resting on dark bamboo mats, surrounded by orchids and candles.'
  },
  {
    id: 'nails-1',
    category: 'NAILS',
    title: 'Couture Nail Art',
    price: '$60+',
    description: 'Intricate, hand-painted designs using premium lacquers. Elevate your manicure to a personalized work of art.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq2j4niGCFoRWdpnne_I-OFMA24EPEgyfjOfcrsUPsit4Sid2rrhIE9Ug3IVU50IWbLvv0xMopEo39dVtB_dQm5AdYdl6eACM3T-IJ7ShK_cUR-nzUx3Gpd2oQ2eYblTCu9mAcax5_XUvDMjw4gPPalT6lST-vJTHI3HcCCfaBZjYqqYQb4vPLDZPjBBcmvblJe39rB01gFZlIHJSqRB_WiR4jHoqfWs7TNdAGWsbWrOc5nA3hI0as8ujTGE3sb2T6pefzLfk1fecO',
    dataAlt: 'A macro shot of intricate, elegant nail art being painted with a fine brush in a modern sleek manicure station.'
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'pkg-1',
    tier: 'Essential',
    name: 'The Retreat',
    price: '$150',
    features: [
      '60-Minute Swedish Massage',
      'Express Radiance Facial',
      'Aromatherapy Enhancement'
    ],
    ctaText: 'Select Retreat'
  },
  {
    id: 'pkg-2',
    tier: 'Signature',
    name: 'The Luxe Aura',
    price: '$285',
    badge: 'Most Desired',
    features: [
      '90-Minute Deep Tissue Massage',
      'Bespoke Anti-Aging Facial',
      'Hot Stone Therapy Add-on',
      'Complimentary Champagne'
    ],
    ctaText: 'Reserve Aura'
  },
  {
    id: 'pkg-3',
    tier: 'Ultimate',
    name: 'The Pinnacle',
    price: '$450',
    features: [
      '120-Minute Four-Hand Massage',
      '24k Gold Radiance Facial',
      'Full Body Detox Wrap',
      'Private Suite & Grazing Board'
    ],
    ctaText: 'Experience Pinnacle'
  }
];

export const ALACARTE_SERVICES: AlaCarteCategory[] = [
  {
    category: 'Massage Therapy',
    icon: 'spa',
    items: [
      { name: 'Swedish Relaxation', duration: '60 min / 90 min', price: '$120 / $160' },
      { name: 'Deep Tissue Recovery', duration: '60 min / 90 min', price: '$140 / $185' },
      { name: 'Hot Stone Therapy', duration: '75 min', price: '$165' }
    ]
  },
  {
    category: 'Skincare & Facials',
    icon: 'face',
    items: [
      { name: 'Illuminating Peel', duration: '45 min', price: '$110' },
      { name: 'Bespoke Renewal Facial', duration: '60 min', price: '$150' },
      { name: 'Advanced Microdermabrasion', duration: '60 min', price: '$180' }
    ]
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'emma-watson',
    name: 'Emma Watson',
    title: 'HAIR STYLIST',
    subtitle: 'MASTER',
    description: 'Specializing in bespoke color transformations and precision cutting. Emma brings 10 years of international runway experience to every client.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALME2F1jAoC6EoStsyOz0T76AKwMwGkAEN7lNaHxDcgRW7x45e1MxuwhLf9AzD3fKnBZqyrOQxkptLp7BwKgjgy7eIafrsFOHCnsWC5sWoFhpw-ZgDPAWk8TrdqiXzkCkpJ4YEAnR_YQpJ5Pd3lIB7hQRbs5TTu5l6ZfFG0cGbYwaAANET3_a2F5sHJ4_H8rV66xHSBA7FfxHE-lBkMh41c_9kBLEWFiFZcsWxwwBMajnr3O__Po9Y0BA5KDmCjftrvz0EtdkOCIS3',
    dataAlt: 'A beautiful portrait of custom master hair stylist Emma Watson in a soft gold glow luxury studio environment.'
  },
  {
    id: 'sophia-miller',
    name: 'Sophia Miller',
    title: 'MAKEUP ARTIST',
    description: "Creating flawless, ethereal looks for bridal and editorial clients. Sophia's approach enhances natural features with a luminous finish.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJv5gyd6wVR85q7iTC5HGy6dKUfutoUcgLcT83UquEzNwYbtq1SlFMczezpsJBpulZ1uX7JfDb-56S6UVdeFO0BrSCbDbWdHyKtBuqfV40H6j-dwdKxP9-8VFFSQaeHk73eP2AnqJmKDyNeOrcUxVdE0J3Nekuq4Hn2488vhkqWgZWo-tvVCLlFE4FKEvFCDlW9wmUn9ba4zBpHeJszk0ivD-Vr5Nf3RCwrIu40D9Vqwuf-6KUWam5QmcfKm4_ua4T9c0WvDD4oY8',
    dataAlt: 'Sophia Miller, luxury bridal stylist posing with premium cosmetics tools in dramatic backlighting.'
  },
  {
    id: 'olivia-brown',
    name: 'Olivia Brown',
    title: 'SKIN SPECIALIST',
    subtitle: 'CLINICAL',
    description: 'Merging advanced dermatological science with holistic therapies. Olivia designs tailored regimens for lasting skin health and radiance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYyl_fOyNhIUo9aDW9N8kvhG_Ct61RjOLR7fUskwYO1IABn-D_o_cgVW6n15vd7HNwtUhvBHuoEiO22LlbkBxrMnAUbUI7F74yuU4DbViZkJmKbaXl5PiCQa1C-u0Wpw1YvNwjsZNhkR53bYw8V_jUfW8V8nt9STnXHPUeBrFW2qvBa7xQ_qHXAaXP_SC6IQhc7ybA1l2V7mjxT6TLPjc0TD79g7Ih-O2AxIwrqUnuWdr-N0vNp71Ks1qryzHtvQb_fQ1YQqbAXTCT',
    dataAlt: 'Olivia Brown Clinical skincare specialist in black minimal spa uniform standing against premium glass fixtures.'
  },
  {
    id: 'mia-johnson',
    name: 'Mia Johnson',
    title: 'NAIL ARTIST',
    description: 'Elevating manicures to miniature works of art. Mia specializes in intricate detailing and advanced builder gel techniques.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-YDMMkQNf01Tdq6jICQctIugXTqtcJg0CpkDCUlMyPff_i2peoPrPcT0ShAy6AvzKPrrQDGSWFOxxjO6w13Rnw1D2kg9wF0gf0FGs3nvjqyBKUuLErVoN0MfkQh78R6z72nPipwB8amFUsYFV66oWZeLuNzBVWK21-jcZerSynIkGTieaEloh6S13kdypr15-U-1SEAoksqsGy77hi9czkmkLX93suv1LBTvu6XwpBA26JSrD3OltwnULWSfqZ6Dpv5R6oiASbpX',
    dataAlt: 'Mia Johnson highly skilled creative nail artisan in a sleek dark upscale boutique setting.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'HAIR',
    title: 'Signature Balayage',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYQHnV2Zqy9viryFiDxToLKSwHy5nsUHp53i-GAdD0QEUTYFv1HsVgmZOOVOq-IHvcITxTA8rl3CIT7SL-plR4Ck22XZFe3YBGxSUtj8_7s2V5PYPH3mMauqad3RK-jutt7hZ94MhSj5rur4kXzw5_T-4Y5oDqptTMLd7xCNODuwt_fzzFG_Vd0d6kX-TOnZnv-UxU66IeudZEksYxCuRqoYwU1lVYfT9TzpmSgg1IbZusb41IxLjYlMJLj3y4kmIWRq-vFcsg9Ye-',
    dataAlt: 'A stunning salon hair transformation displaying high definition blonde balayage waves.'
  },
  {
    id: 'gal-2',
    category: 'SPA',
    title: 'Tranquil Treatment Room',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjaHghR-VmbbU1iinua6tE_fHeQ0fiT4lltBZePzdR2T-4BXXMhfEAr09bzdzEZTPziZ5EWLWeOPQJQ__f9LnsixznKmjORX9-76GRde0t7RAhVarvSuad_fUoiN56aeal9XlX8saXvnk_9ggXsnJoTFhJlh7ywURsjO-5BpMqO-V-XVXZM5pWdaGyAMunSwZbYeJXQG_h_PJ-y7bmsRnUZhBBSqnzM8U0Q7CrHd905oTU6nn-RM7fy-vBRjW3U83bwORbe5C40McY',
    dataAlt: 'A tranquil organic spa table equipped with luxury sheets and essential oils set in cozy warm dark light.'
  },
  {
    id: 'gal-3',
    category: 'MAKEUP',
    title: 'Evening Glamour',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE2kFqBcbDSpFX9yIF9ZEyMOpKPmSdzhiCxQDcP6ofHceK7jcS7dznG2W20-wzc0_Pno1k_XVnTMUQyqnt4DKzvGVA1CnfxYCaEg3K_CilugW9NUrqpne1vaKhrkBccIn8oYYkwmoIrs3IpuZmGWgwtoSKBvSk2K_RnuLNbMbcE6EUgK6C4jKVyktvvcHVTKUpFXFJhj4j6gY-EW4RIRsYlQbYUFQ3_8Dw0q-XR1D_9qzgJB1zH-blgNr3_QWg3bISQEHi9fY1CdCH',
    dataAlt: 'Flawless luxurious custom evening makeup and glowing skin under elegant directed light.'
  },
  {
    id: 'gal-4',
    category: 'NAILS',
    title: 'Gold Accent Manicure',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGLp9GwMCGl_PiJxgqOl1MKN816rPRvK9fdYjFGy1J5qVmjmuqEdvpNarqIsQtiaPPc7OpJRky9YACL5ScE5JRvjMPG2pTBS7lP2rqFLMTkbdkT8AI-SYlqENekDQJIVjX6eSzUOa-TsLpSsmN5J3gs5gFcPY8wuYypB8YVrcGC0bqbDpKZROc2YpIQe1ugt1pMGTARxDjwzIXEEHSbucVaFtBeXMTuZ30k8WKwevnpQYYo3vYjNZ8iphYrO_F42vsd2m4b4yw510y',
    dataAlt: 'Elegant matte dark red manicure detailed with fine luxury gold shapes.'
  },
  {
    id: 'gal-5',
    category: 'INTERIOR',
    title: 'The Wash Lounge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLuGhw_rxAQgB-M7ZcMRDOVdSMQ_6k4AbfCGap5aCZwGp7MWpUhCtbrGdXmNWAfr8Dm0K5YUXY4dORVE_DOZNPl26ta6tNqJSpHFfKtvANWkXbjM9eu02W4QdjDH7PIkGXlIDjd8QmHUVCwx5qoTXMNCReEoN6Rl-ghyzA_xrqhyf3CeEi0Md1Qdp7Zn7lYzgSDx9cdkdwLp3khrBba4HeIT7oskI3VIl7XbEUyK9nkaj62TIjXxecpohbXi_oS5GCcuqmb70KCZXm',
    dataAlt: 'Sleek luxury leather seating and vanity basins illuminated by glowing rose-gold installations.'
  },
  {
    id: 'gal-6',
    category: 'HAIR',
    title: 'Precision Cut',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHGRXtjQPluk3NH4vMK8p4DO6juCA-bofCVwohI9UJWIqU9vfvRqlLYdpp02Y23MSPQ-M2dDTwcrsvc30WBBghf5ZiB6DultwRsQjFSAk-ZfS7WyRx4xUnyPTuA8LDZil-eHgWov0Cf7zGfT-nLPRdiQz54nXwx0eQrXqDpiF1xcipgE-Ol-BuizyNc4_T4IdLlMLzgSgfNNwrvKho4IPEgkhMWyCGBkP5VPFlpA10EL_KRCf9id75h-eCTbSDMHFk5Mv-8mrqwf_o',
    dataAlt: 'Sharply textured and finished elegant dark bob with highly premium dimensional gloss.'
  }
];
