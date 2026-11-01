export type ProductCategory = string;

export interface StoreCategoryItem {
  id: string;
  name: string;
  nameAr: string;
  icon?: string;
  badge?: string;
  count?: number;
  isCustom?: boolean;
}

export interface ProductSpec {
  [key: string]: string | number | boolean | undefined;
  socket?: string; // e.g. "AM5", "LGA1700"
  memoryType?: string; // "DDR5", "DDR4"
  formFactor?: string; // "ATX", "Micro-ATX", "Mini-ITX"
  wattage?: number; // TDP or PSU rated wattage
  vram?: string; // e.g. "16GB GDDR6X"
  coreCount?: string; // e.g. "16 Cores (8P + 8E)"
  clockSpeed?: string; // e.g. "Up to 5.4 GHz"
  gpuLength?: number; // in mm
  maxGpuLength?: number; // for cases in mm
  capacity?: string; // e.g. "2TB", "32GB (2x16GB)"
  refreshRate?: string; // e.g. "240Hz"
  resolution?: string; // e.g. "2560x1440 (QHD)"
  screenSize?: string; // e.g. "16-inch OLED"
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: ProductCategory;
  brand: string;
  priceUSD: number;
  priceIQD: number;
  originalPriceUSD?: number;
  originalPriceIQD?: number;
  image: string;
  gallery?: string[];
  description: string;
  descriptionAr: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  badgeAr?: string;
  rating: number;
  reviewsCount: number;
  specs: ProductSpec;
  gamingScore?: number; // 1-100
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PCBuildParts {
  cpu?: Product;
  cooler?: Product;
  motherboard?: Product;
  ram?: Product;
  gpu?: Product;
  storage?: Product;
  powerSupply?: Product;
  pcCase?: Product;
}

export interface CompatibilityIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  component: string;
}

export interface CompatibilityReport {
  isCompatible: boolean;
  totalWattage: number;
  recommendedPsuWattage: number;
  estimatedFps: {
    game: string;
    fps1080p: number;
    fps1440p: number;
    fps4k: number;
  }[];
  issues: CompatibilityIssue[];
}

export interface OrderItem {
  productId: string;
  name: string;
  priceUSD: number;
  priceIQD: number;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phoneNumber: string;
  province: string;
  cityOrArea: string;
  notes?: string;
  paymentMethod?: 'cash_on_delivery' | 'zain_cash' | 'store_pickup';
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  totalUSD: number;
  totalIQD: number;
  currency: 'IQD' | 'USD';
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  whatsappLink: string;
}

export interface StoreInfo {
  name: string;
  nameEn: string;
  logo?: string;
  location: string;
  addressDetails: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  exchangeRate: number; // 1 USD in IQD (e.g. 1500)
  provinces: string[];
}

export interface HomePageSectionsConfig {
  showPromoBanner: boolean;
  promoBannerText: string;
  showHeroBanner: boolean;
  showQuickCategoriesNav?: boolean;
  showFlashSale: boolean;
  showBestSellers: boolean;
  showNewArrivals: boolean;
  showBuyTogetherBundles: boolean;
  showRecommended: boolean;
  showTestimonials: boolean;
  showCustomerStories: boolean;
  showDeliveryMap: boolean;
  showSocialMediaFeed: boolean;
  showStoreVideo: boolean;
  showTechBlog: boolean;
  showFAQ: boolean;
  heroCustomTitle?: string;
  heroCustomDescription?: string;
}

export interface HeroSlide {
  id: string;
  titleMain: string;
  titleSub?: string;
  kicker?: string;
  description?: string;
  image: string;
  primaryCtaText?: string;
  primaryCtaAction?: 'builder' | 'prebuilts' | 'laptops' | 'products' | 'whatsapp';
  secondaryCtaText?: string;
  secondaryCtaAction?: 'builder' | 'prebuilts' | 'laptops' | 'products' | 'whatsapp';
  priceTag?: {
    usd: number;
    iqd: number;
    label: string;
  };
}

export interface StoreVideoItem {
  id: string;
  titleAr: string;
  durationAr: string;
  descriptionAr: string;
  thumbnail: string;
  videoUrl?: string; // YouTube URL, MP4 link, or direct video
}

export interface ThemeConfig {
  primaryColor: string; // e.g. '#2563eb' (Blue), '#dc2626' (ROG Red), '#059669' (Emerald), '#7c3aed' (Purple), '#ea580c' (Orange), '#d97706' (Amber/Gold), '#06b6d4' (Cyan), '#db2777' (Magenta)
  themePresetName: string;
  buttonRadius: 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
  buttonGlow: boolean;
  buttonStyle?: 'solid' | 'gradient' | 'neon';
}

