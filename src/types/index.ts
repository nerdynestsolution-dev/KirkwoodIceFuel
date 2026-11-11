export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Everyday'
  | 'Weekdays'
  | 'Weekends';

export type SpecialCategory = 'Food' | 'Drink' | 'Food & Drink';

export interface SpecialItem {
  id: string;
  day_of_week: DayOfWeek;
  title: string;
  description: string;
  price: string | null;
  details: string | null;
  category: SpecialCategory;
  is_active: boolean;
  is_featured: boolean;
  is_placeholder?: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventItem {
  id: string;
  title: string;
  event_date: string; // YYYY-MM-DD
  start_time: string;
  end_time?: string | null;
  description: string;
  category: string;
  image_url?: string | null;
  external_link?: string | null;
  additional_details?: string | null;
  is_published: boolean;
  is_featured: boolean;
  is_placeholder?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  secondaryPriceLabel?: string;
  badge?: string;
  image?: string;
  verifiedSource: '569Dine' | 'OwnerReviewRequired';
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle?: string;
  note?: string;
  verifiedSource: '569Dine' | 'OwnerReviewRequired';
  items: MenuItem[];
}

export type GalleryCategory =
  | 'All'
  | 'Food & Drinks'
  | 'Bar & Atmosphere'
  | 'Outdoor Patio'
  | 'Events';

export interface GalleryImage {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  src: string;
  alt: string;
  isPlaceholder: boolean;
}
