export type CategoryType = 'all' | 'footwear' | 'balls' | 'accessories' | 'apparel' | 'new' | 'sale';

export type CourtSurface = 'Indoor Hardwood' | 'Outdoor Concrete' | 'All-Court';
export type CutType = 'Low-Top' | 'Mid-Top' | 'High-Top' | 'N/A';

export interface ProductColor {
  name: string;
  hex: string;
  secondaryHex?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'footwear' | 'balls' | 'accessories' | 'apparel';
  tag?: 'New arrival' | 'Best seller' | 'Popular';
  discountPercent: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  colors: ProductColor[];
  sizes?: string[]; // e.g. ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"]
  description: string;
  specs: {
    surface?: CourtSurface;
    cut?: CutType;
    cushioning?: string;
    traction?: string;
    weight?: string;
    material?: string;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique item id including variant
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize?: string;
  quantity: number;
}

export interface FilterState {
  category: CategoryType;
  searchQuery: string;
  cut: string[];
  surface: string[];
  sizes: string[];
  priceRange: [number, number];
  onlyDiscounted: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'discount-high' | 'rating' | 'newest';
}
