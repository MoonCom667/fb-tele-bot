import fs from 'fs';
import path from 'path';
import { 
  Product, 
  StoreInfo, 
  StoreCategoryItem, 
  Order, 
  HomePageSectionsConfig, 
  HeroSlide,
  StoreVideoItem,
  ThemeConfig 
} from '../src/types.js';
import { PRODUCTS, STORE_INFO } from './data/products.js';

export const DEFAULT_STORE_VIDEOS: StoreVideoItem[] = [
  {
    id: 'chap-1',
    titleAr: 'جولة داخل صالة عرض مكتب القمر بفرع شارع الصناعة',
    durationAr: '1:45 دقيقة',
    descriptionAr: 'تفقّد أحدث كروت الشاشة، اللابتوبات، والشاشات المعروضة في صالتنا الرئيسية ببغداد.',
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'chap-2',
    titleAr: 'كيف نقوم بتجميع واختبار حاسوبك الشخصي قبل التسليم؟',
    durationAr: '2:10 دقيقة',
    descriptionAr: 'شاهد خطوط التجميع الاحترافية، ترتيب الأسلاك (Cable Management)، واختبار الضغط والتبريد.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  },
  {
    id: 'chap-3',
    titleAr: 'سياسة ضمان مكتب القمر الحقيقية المسجلة بالسيريال',
    durationAr: '1:15 دقيقة',
    descriptionAr: 'تعرّف على كيفية تسجيل السيريال الخاص بقطعتك لضمان الاستبدال الفوري بدون تعقيد.',
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  },
  {
    id: 'chap-4',
    titleAr: 'خدمة التوصيل السريع والآمن لجميع المحافظات 18',
    durationAr: '1:30 دقيقة',
    descriptionAr: 'آلية التغليف الآمن المقاوم للصدمات والشحن مع الشركاء المعتمدين لضمان وصول حاسوبك سليماً.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  }
];

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#2563eb', // Royal Blue
  themePresetName: 'أزرق كوانتم (الافتراضي)',
  buttonRadius: 'rounded-xl',
  buttonGlow: true,
  buttonStyle: 'gradient'
};

export const DEFAULT_STORE_CATEGORIES: StoreCategoryItem[] = [
  { id: 'all', name: 'All Categories', nameAr: 'جميع الأقسام', icon: '📦' },
  { id: 'gpus', name: 'Graphics Cards', nameAr: 'كروت الشاشة', icon: '🎮', badge: 'RTX / RX' },
  { id: 'cpus', name: 'Processors', nameAr: 'المعالجات', icon: '🧠', badge: 'Intel / AMD' },
  { id: 'motherboards', name: 'Motherboards', nameAr: 'اللوحات الأم', icon: '🎛️', badge: 'ATX / AM5' },
  { id: 'ram', name: 'Memory', nameAr: 'الذاكرة العشوائية', icon: '⚡', badge: 'DDR5 / DDR4' },
  { id: 'storage', name: 'Storage', nameAr: 'وحدات التخزين SSD', icon: '💾', badge: 'Gen4 / Gen5' },
  { id: 'power_supplies', name: 'Power Supplies', nameAr: 'مزودات الطاقة', icon: '🔌', badge: 'Gold / Platinum' },
  { id: 'cooling', name: 'Cooling', nameAr: 'التبريد المائي والهوائي', icon: '❄️', badge: '360mm / AIO' },
  { id: 'cases', name: 'Cases', nameAr: 'كيسات الحاسوب', icon: '🖥️', badge: 'Mesh / RGB' },
  { id: 'laptops', name: 'Gaming Laptops', nameAr: 'لابتوبات ألعاب ومونتاج', icon: '💻', badge: '240Hz / OLED' },
  { id: 'monitors', name: 'Monitors', nameAr: 'شاشات الألعاب', icon: '📺', badge: '2K / 4K / OLED' },
  { id: 'accessories', name: 'Accessories', nameAr: 'الملحقات والإكسسوارات', icon: '🎧', badge: 'Mice / Audio' },
  { id: 'prebuilt_pcs', name: 'Prebuilt PCs', nameAr: 'تجميعات جاهزة', icon: '🔥', badge: 'Ready to Play' }
];

export const DEFAULT_HOME_SECTIONS: HomePageSectionsConfig = {
  showPromoBanner: false,
  promoBannerText: 'عروض مكتب القمر الحصرية على كروت الشاشة والمعالجات والتجميعات الاحترافية مع هدايا تركيب مجانية في شارع الصناعة',
  showHeroBanner: true,
  showQuickCategoriesNav: true,
  showFlashSale: false,
  showBestSellers: false,
  showNewArrivals: false,
  showBuyTogetherBundles: true,
  showRecommended: false,
  showTestimonials: true,
  showCustomerStories: false,
  showDeliveryMap: false,
  showSocialMediaFeed: false,
  showStoreVideo: true,
  showTechBlog: false,
  showFAQ: true,
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-geforce-rtx',
    kicker: 'تجميعات وكروت الشاشة الاحترافية · GEFORCE RTX 40 SERIES',
    titleMain: 'أداء استثنائي للألعاب وصناعة المحتوى',
    titleSub: 'كروت RTX 4090 / 4080 Super وتجميعات الجيل الرابع عشر',
    description: 'نجهز لك أقوى الحواسيب المكتبية بقطع أصلية 100% مع فحص حراري شامل وضمان استبدال محلي معتمد من معرضنا في شارع الصناعة.',
    primaryCtaText: 'تصفح التجميعات الجاهزة',
    primaryCtaAction: 'prebuilts',
    secondaryCtaText: 'ابنِ تجميعتك الخاصة',
    secondaryCtaAction: 'builder',
    priceTag: {
      usd: 1450,
      iqd: 2204000,
      label: 'تبدأ التجميعات الاحترافية من'
    },
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'slide-pc-builder',
    kicker: 'أداة التجميع الذكية · PC BUILDER',
    titleMain: 'صمّم حاسوبك خطوة بخطوة بتوافقية مضمونة',
    titleSub: 'فحص تلقائي للمقبس والطاقة والذواكر DDR5',
    description: 'اختر المعالج، اللوحة الأم، وكرت الشاشة، وسيقوم النظام بالتحقق من التوافقية وحساب استهلاك الطاقة الفعلي مع تركيب مجاني.',
    primaryCtaText: 'ابدأ تجميع حاسوبك الآن',
    primaryCtaAction: 'builder',
    secondaryCtaText: 'تصفح جميع القطع',
    secondaryCtaAction: 'products',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'slide-gaming-laptops',
    kicker: 'أجهزة الألعاب المحمولة · ASUS ROG & LENOVO LEGION',
    titleMain: 'قوة الألعاب والهندسة في جهاز محمول',
    titleSub: 'شاشات 240Hz OLED مع معالجات Core i9 و Ryzen 9',
    description: 'تشكيلة واسعة من أحدث اللابتوبات المخصصة للألعاب الثقيلة، التصميم الهندسي، والمونتاج بضمان محلي حقيقي لمدة سنة.',
    primaryCtaText: 'استعراض اللابتوبات',
    primaryCtaAction: 'laptops',
    secondaryCtaText: 'تصفح جميع المنتجات',
    secondaryCtaAction: 'products',
    priceTag: {
      usd: 1150,
      iqd: 1748000,
      label: 'تبدأ أسعار اللابتوبات من'
    },
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=85'
  }
];

interface StoreDatabase {
  products: Product[];
  categories: StoreCategoryItem[];
  storeInfo: StoreInfo;
  homeSections: HomePageSectionsConfig;
  heroSlides: HeroSlide[];
  orders: Order[];
  videos: StoreVideoItem[];
  theme: ThemeConfig;
}

const DB_FILE_PATH = path.join(process.cwd(), 'server', 'data', 'store_db.json');

class StoreRepository {
  private db: StoreDatabase;

  constructor() {
    this.db = this.loadDatabase();
  }

  private loadDatabase(): StoreDatabase {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : PRODUCTS,
          categories: Array.isArray(parsed.categories) && parsed.categories.length > 0 ? parsed.categories : DEFAULT_STORE_CATEGORIES,
          storeInfo: parsed.storeInfo || STORE_INFO,
          homeSections: parsed.homeSections || DEFAULT_HOME_SECTIONS,
          heroSlides: Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0 ? parsed.heroSlides : DEFAULT_HERO_SLIDES,
          orders: Array.isArray(parsed.orders) ? parsed.orders : [],
          videos: Array.isArray(parsed.videos) && parsed.videos.length > 0 ? parsed.videos : DEFAULT_STORE_VIDEOS,
          theme: parsed.theme || DEFAULT_THEME
        };
      }
    } catch (e) {
      console.error('Error reading store_db.json, falling back to defaults:', e);
    }

    const initial: StoreDatabase = {
      products: PRODUCTS,
      categories: DEFAULT_STORE_CATEGORIES,
      storeInfo: STORE_INFO,
      homeSections: DEFAULT_HOME_SECTIONS,
      heroSlides: DEFAULT_HERO_SLIDES,
      orders: [],
      videos: DEFAULT_STORE_VIDEOS,
      theme: DEFAULT_THEME
    };

    this.persist(initial);
    return initial;
  }

  private persist(data: StoreDatabase) {
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write store_db.json to disk:', e);
    }
  }

  private save() {
    this.persist(this.db);
  }

  // --- Products ---
  public getProducts(filter?: {
    category?: string;
    search?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    featured?: boolean;
    sort?: string;
  }): Product[] {
    let prods = [...this.db.products];

    if (filter?.category && filter.category !== 'all') {
      prods = prods.filter(p => p.category === filter.category);
    }

    if (filter?.brand && filter.brand !== 'all') {
      prods = prods.filter(p => p.brand.toLowerCase() === String(filter.brand).toLowerCase());
    }

    if (filter?.search) {
      const q = String(filter.search).toLowerCase();
      prods = prods.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.nameAr.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q)
      );
    }

    if (filter?.minPrice !== undefined) {
      prods = prods.filter(p => p.priceUSD >= filter.minPrice!);
    }

    if (filter?.maxPrice !== undefined) {
      prods = prods.filter(p => p.priceUSD <= filter.maxPrice!);
    }

    if (filter?.inStock) {
      prods = prods.filter(p => p.inStock);
    }

    if (filter?.featured) {
      prods = prods.filter(p => p.featured || p.isBestSeller);
    }

    if (filter?.sort) {
      if (filter.sort === 'price_asc') {
        prods.sort((a, b) => a.priceUSD - b.priceUSD);
      } else if (filter.sort === 'price_desc') {
        prods.sort((a, b) => b.priceUSD - a.priceUSD);
      } else if (filter.sort === 'rating') {
        prods.sort((a, b) => b.rating - a.rating);
      } else if (filter.sort === 'gaming_score') {
        prods.sort((a, b) => (b.gamingScore || 0) - (a.gamingScore || 0));
      }
    }

    return prods;
  }

  public getProductById(id: string): Product | undefined {
    return this.db.products.find(p => p.id === id);
  }

  public saveProduct(product: Product): Product {
    const index = this.db.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.db.products[index] = product;
    } else {
      this.db.products.unshift(product);
    }
    this.save();
    return product;
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.db.products.length;
    this.db.products = this.db.products.filter(p => p.id !== id);
    const deleted = this.db.products.length < initialLen;
    if (deleted) {
      this.save();
    }
    return deleted;
  }

  // Merge/sync products from client (e.g. from user's PC localStorage)
  public syncProducts(clientProducts: Product[]): Product[] {
    if (!Array.isArray(clientProducts) || clientProducts.length === 0) {
      return this.db.products;
    }

    let modified = false;
    for (const clientProd of clientProducts) {
      if (!clientProd || !clientProd.id) continue;
      const index = this.db.products.findIndex(p => p.id === clientProd.id);
      if (index >= 0) {
        // Update existing if client modified it
        this.db.products[index] = { ...this.db.products[index], ...clientProd };
        modified = true;
      } else {
        // Add new product from client
        this.db.products.unshift(clientProd);
        modified = true;
      }
    }

    if (modified) {
      this.save();
    }
    return this.db.products;
  }

  // --- Categories ---
  public getCategories(): StoreCategoryItem[] {
    // Dynamically calculate product counts
    return this.db.categories.map(cat => {
      if (cat.id === 'all') {
        return { ...cat, count: this.db.products.length };
      }
      return {
        ...cat,
        count: this.db.products.filter(p => p.category === cat.id).length
      };
    });
  }

  public addCategory(cat: StoreCategoryItem): StoreCategoryItem {
    const exists = this.db.categories.some(c => c.id === cat.id || c.nameAr === cat.nameAr);
    if (!exists) {
      this.db.categories.push(cat);
      this.save();
    }
    return cat;
  }

  public deleteCategory(id: string): boolean {
    if (id === 'all') return false;
    const initialLen = this.db.categories.length;
    this.db.categories = this.db.categories.filter(c => c.id !== id);
    const deleted = this.db.categories.length < initialLen;
    if (deleted) {
      this.save();
    }
    return deleted;
  }

  // --- Store Info & Exchange Rate ---
  public getStoreInfo(): StoreInfo {
    return this.db.storeInfo;
  }

  public updateStoreInfo(info: Partial<StoreInfo>, autoRecalculatePrices = false): StoreInfo {
    const updated = { ...this.db.storeInfo, ...info };
    this.db.storeInfo = updated;

    if (autoRecalculatePrices && info.exchangeRate) {
      const rate = info.exchangeRate;
      this.db.products = this.db.products.map(p => ({
        ...p,
        priceIQD: Math.round(p.priceUSD * rate),
        originalPriceIQD: p.originalPriceUSD ? Math.round(p.originalPriceUSD * rate) : undefined
      }));
    }

    this.save();
    return this.db.storeInfo;
  }

  // --- Home Sections ---
  public getHomeSections(): HomePageSectionsConfig {
    return this.db.homeSections;
  }

  public updateHomeSections(sections: HomePageSectionsConfig): HomePageSectionsConfig {
    this.db.homeSections = sections;
    this.save();
    return this.db.homeSections;
  }

  // --- Hero Slides ---
  public getHeroSlides(): HeroSlide[] {
    return this.db.heroSlides;
  }

  public updateHeroSlides(slides: HeroSlide[]): HeroSlide[] {
    this.db.heroSlides = slides;
    this.save();
    return this.db.heroSlides;
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return this.db.orders;
  }

  public addOrder(order: Order): Order {
    this.db.orders.unshift(order);
    this.save();
    return order;
  }

  public updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const order = this.db.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.save();
      return true;
    }
    return false;
  }

  // --- Videos ---
  public getVideos(): StoreVideoItem[] {
    return this.db.videos || DEFAULT_STORE_VIDEOS;
  }

  public updateVideos(videos: StoreVideoItem[]): StoreVideoItem[] {
    this.db.videos = videos;
    this.save();
    return this.db.videos;
  }

  public addVideo(video: StoreVideoItem): StoreVideoItem {
    if (!this.db.videos) this.db.videos = [];
    const existingIndex = this.db.videos.findIndex(v => v.id === video.id);
    if (existingIndex >= 0) {
      this.db.videos[existingIndex] = video;
    } else {
      this.db.videos.push(video);
    }
    this.save();
    return video;
  }

  public deleteVideo(id: string): boolean {
    if (!this.db.videos) return false;
    const initialLen = this.db.videos.length;
    this.db.videos = this.db.videos.filter(v => v.id !== id);
    if (this.db.videos.length < initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Theme Customizer ---
  public getTheme(): ThemeConfig {
    return this.db.theme || DEFAULT_THEME;
  }

  public updateTheme(newTheme: Partial<ThemeConfig>): ThemeConfig {
    this.db.theme = {
      ...(this.db.theme || DEFAULT_THEME),
      ...newTheme
    };
    this.save();
    return this.db.theme;
  }

  public getBrands(): string[] {
    const brandsSet = new Set(this.db.products.map(p => p.brand).filter(Boolean));
    return Array.from(brandsSet).sort();
  }
}

export const storeRepo = new StoreRepository();
