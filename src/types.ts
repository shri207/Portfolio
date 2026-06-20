export interface Service {
  id: string;
  category: 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS';
  title: string;
  price: string;
  description: string;
  image: string;
  dataAlt?: string;
}

export interface Package {
  id: string;
  tier: 'Essential' | 'Signature' | 'Ultimate';
  name: string;
  price: string;
  badge?: string;
  features: string[];
  ctaText: string;
}

export interface AlaCarteItem {
  name: string;
  duration: string;
  price: string;
}

export interface AlaCarteCategory {
  category: string;
  icon: string;
  items: AlaCarteItem[];
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  dataAlt?: string;
}

export interface GalleryItem {
  id: string;
  category: 'HAIR' | 'MAKEUP' | 'SPA' | 'NAILS' | 'INTERIOR';
  title: string;
  image: string;
  dataAlt?: string;
}

export interface BookingDetails {
  category: string;
  serviceId: string;
  therapistId: string;
  date: string; // YYYY-MM-DD or Wed 14th etc.
  time: string;
  price: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}
