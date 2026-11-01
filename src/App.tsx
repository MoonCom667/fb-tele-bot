import React, { useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  PCBuildParts, 
  StoreInfo,
  OrderCustomer,
  Order,
  HomePageSectionsConfig,
  HeroSlide,
  StoreVideoItem,
  ThemeConfig
} from './types';
import { DynamicNotificationBar } from './components/DynamicNotificationBar';
import { Header } from './components/Header';
import { HeroBanner, DEFAULT_HERO_SLIDES } from './components/HeroBanner';
import { MainCategoriesNav } from './components/MainCategoriesNav';
import { RecommendedProducts } from './components/RecommendedProducts';
import { FlashSaleSection } from './components/FlashSaleSection';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { BestSellersSection } from './components/BestSellersSection';
import { BuyTogetherBundlesSection } from './components/BuyTogetherBundlesSection';
import { InteractiveDeliveryMap } from './components/InteractiveDeliveryMap';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { CategorySidebar } from './components/CategorySidebar';
import { CompareModal } from './components/CompareModal';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { PCBuilder } from './components/PCBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIAdvisorDrawer } from './components/AIAdvisorDrawer';
import { StoreLocationModal } from './components/StoreLocationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { CustomerStoriesSection } from './components/CustomerStoriesSection';
import { MobileBottomDock } from './components/MobileBottomDock';
import { SocialMediaFeedSection } from './components/SocialMediaFeedSection';
import { StoreIntroVideoSection, DEFAULT_STORE_VIDEOS } from './components/StoreIntroVideoSection';
import { TechBlog } from './components/TechBlog';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminProductModal } from './components/AdminProductModal';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  Sparkles, 
  Wrench, 
  Flame, 
  Laptop, 
  Cpu, 
  Check, 
  RefreshCw,
  ShoppingBag,
  MessageCircle,
  Scale,
  Lock
} from 'lucide-react';

const INITIAL_STORE_INFO: StoreInfo = {
  name: 'مكتب القمر للحاسبات',
  nameEn: 'Moon Computer',
  logo: '/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg',
  location: 'العراق، بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود رقم 14',
  addressDetails: 'بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود رقم 14',
  phone: '07708732185',
  whatsapp: '9647708732185',
  workingHours: 'السبت - الخميس: 9:30 صباحاً حتى 8:30 مساءً (الجمعة استراحة / دعم أونلاين)',
  exchangeRate: 1520,
  provinces: [
    'بغداد - الكرخ',
    'بغداد - الرصافة',
    'البصرة',
    'أربيل',
    'النجف الأشرف',
    'كربلاء المقدسة',
    'السليمانية',
    'نينوى (الموصل)',
    'بابل (الحلة)',
    'ديالى',
    'الأنبار',
    'كركوك',
    'ذي قار (الناصرية)',
    'ميسان (العمارة)',
    'واسط (الكوت)',
    'القادسية (الديوانية)',
    'المثنى (السماوة)',
    'دهوك',
    'صلاح الدين'
  ]
};

const INITIAL_CUSTOMER_PROFILE: OrderCustomer = {
  fullName: 'زبون مكتب القمر',
  phoneNumber: '07708732185',
  province: 'بغداد - الرصافة',
  cityOrArea: 'شارع الصناعة'
};

const DEFAULT_HOME_SECTIONS: HomePageSectionsConfig = {
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
  showStoreVideo: false,
  showTechBlog: false,
  showFAQ: true,
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_admin_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const DEFAULT_STORE_CATEGORIES = [
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

  const [categories, setCategories] = useState<{ id: string; name: string; nameAr: string; icon?: string; badge?: string; isCustom?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_admin_categories');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_CATEGORIES;
    } catch {
      return DEFAULT_STORE_CATEGORIES;
    }
  });

  const [brands, setBrands] = useState<string[]>([
    'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Kingston', 'NZXT', 'Lian Li', 'Intel', 'AMD', 'NVIDIA', 'Samsung'
  ]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem('alqamar_admin_store');
      return saved ? JSON.parse(saved) : INITIAL_STORE_INFO;
    } catch {
      return INITIAL_STORE_INFO;
    }
  });
  const [loading, setLoading] = useState(true);

  // User Settings & Tab States
  const [currency, setCurrency] = useState<'IQD' | 'USD'>('IQD');
  const [activeTab, setActiveTab] = useState<'store' | 'pc-builder' | 'prebuilt' | 'laptops' | 'admin'>('store');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Admin & Manager Access States - strictly default to false on launch
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminProductModalOpen, setIsAdminProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Home Page Sections Customizer State (clean v2 defaults)
  const [homeSections, setHomeSections] = useState<HomePageSectionsConfig>(() => {
    try {
      const saved = localStorage.getItem('alqamar_admin_home_sections_v2');
      return saved ? JSON.parse(saved) : DEFAULT_HOME_SECTIONS;
    } catch {
      return DEFAULT_HOME_SECTIONS;
    }
  });

  // Hero Slider Custom Slides State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_hero_slides');
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const DEFAULT_THEME_CONFIG: ThemeConfig = {
    primaryColor: '#2563eb',
    themePresetName: 'أزرق كوانتم (الافتراضي)',
    buttonRadius: 'rounded-xl',
    buttonGlow: true,
    buttonStyle: 'gradient'
  };

  // Theme & Appearance Customizer State
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('alqamar_theme_config');
      return saved ? JSON.parse(saved) : DEFAULT_THEME_CONFIG;
    } catch {
      return DEFAULT_THEME_CONFIG;
    }
  });

  // Store Intro Videos State
  const [videos, setVideos] = useState<StoreVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_store_videos');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_VIDEOS;
    } catch {
      return DEFAULT_STORE_VIDEOS;
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<OrderCustomer>(() => {
    try {
      const saved = localStorage.getItem('alqamar_profile');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_PROFILE;
    } catch {
      return INITIAL_CUSTOMER_PROFILE;
    }
  });

  // Cart & PC Build State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Product Comparison State
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Recent Orders State
  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentBuild, setCurrentBuild] = useState<PCBuildParts>(() => {
    try {
      const saved = localStorage.getItem('alqamar_build');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modal / Drawer visibility & Recently Viewed State
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alqamar_recent_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSelectProduct = (product: Product) => {
    setSelectedProductModal(product);
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('alqamar_recent_ids', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clean up any legacy admin sessions or URL hashes on app load, ensuring clean store launch
  useEffect(() => {
    try {
      localStorage.removeItem('alqamar_admin_session');
      sessionStorage.removeItem('alqamar_admin_session');
    } catch (e) {
      console.error(e);
    }

    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Clean up any stale service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);

  // Manager shortcut (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setActiveTab('admin');
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn]);

  // Persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alqamar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('alqamar_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('alqamar_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('alqamar_orders', JSON.stringify(recentOrders));
    } catch (e) {
      console.error(e);
    }
  }, [recentOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('alqamar_build', JSON.stringify(currentBuild));
    } catch (e) {
      console.error(e);
    }
  }, [currentBuild]);

  // Fetch initial data from server APIs & auto-sync local products
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [prodRes, catRes, brandRes, storeRes, sectionsRes, slidesRes, ordersRes, videosRes, themeRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/brands'),
          fetch('/api/store'),
          fetch('/api/home-sections'),
          fetch('/api/hero-slides'),
          fetch('/api/orders'),
          fetch('/api/videos'),
          fetch('/api/theme')
        ]);

        const [prodData, catData, brandData, storeData, sectionsData, slidesData, ordersData, videosData, themeData] = await Promise.all([
          prodRes.json().catch(() => ({ success: false, data: [] })),
          catRes.json().catch(() => ({ success: false, data: [] })),
          brandRes.json().catch(() => ({ success: false, data: [] })),
          storeRes.json().catch(() => ({ success: false, data: null })),
          sectionsRes.json().catch(() => ({ success: false, data: null })),
          slidesRes.json().catch(() => ({ success: false, data: [] })),
          ordersRes.json().catch(() => ({ success: false, data: [] })),
          videosRes.json().catch(() => ({ success: false, data: [] })),
          themeRes.json().catch(() => ({ success: false, data: null }))
        ]);

        let currentProducts: Product[] = (prodData.success && Array.isArray(prodData.data)) ? prodData.data : [];

        // Critical Migration: Check if user has previously added products in local browser storage (e.g. on their PC)
        try {
          const localSaved = localStorage.getItem('alqamar_admin_products');
          if (localSaved) {
            const localList: Product[] = JSON.parse(localSaved);
            if (Array.isArray(localList) && localList.length > 0) {
              // Find any products that are not yet on the server
              const missingOnServer = localList.filter(lp => !currentProducts.some(sp => sp.id === lp.id));
              if (missingOnServer.length > 0) {
                // Sync local products to server database
                const syncRes = await fetch('/api/products/sync', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ products: localList })
                });
                const syncData = await syncRes.json();
                if (syncData.success && syncData.data) {
                  currentProducts = syncData.data;
                }
              }
            }
          }
        } catch (syncErr) {
          console.error('Local products sync error:', syncErr);
        }

        if (currentProducts.length > 0) {
          setProducts(currentProducts);
          try {
            localStorage.setItem('alqamar_admin_products', JSON.stringify(currentProducts));
          } catch (e) {
            console.error(e);
          }
        }

        if (catData.success && Array.isArray(catData.data) && catData.data.length > 0) {
          setCategories(catData.data);
          try {
            localStorage.setItem('alqamar_admin_categories', JSON.stringify(catData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (brandData.success && Array.isArray(brandData.data) && brandData.data.length > 0) {
          setBrands(brandData.data);
        }

        if (storeData.success && storeData.data) {
          setStoreInfo(storeData.data);
          try {
            localStorage.setItem('alqamar_admin_store', JSON.stringify(storeData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (sectionsData.success && sectionsData.data) {
          setHomeSections(sectionsData.data);
          try {
            localStorage.setItem('alqamar_admin_home_sections_v2', JSON.stringify(sectionsData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (slidesData.success && Array.isArray(slidesData.data) && slidesData.data.length > 0) {
          setHeroSlides(slidesData.data);
          try {
            localStorage.setItem('alqamar_hero_slides', JSON.stringify(slidesData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (videosData.success && Array.isArray(videosData.data) && videosData.data.length > 0) {
          setVideos(videosData.data);
          try {
            localStorage.setItem('alqamar_store_videos', JSON.stringify(videosData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (themeData.success && themeData.data) {
          setThemeConfig(themeData.data);
          try {
            localStorage.setItem('alqamar_theme_config', JSON.stringify(themeData.data));
          } catch (e) {
            console.error(e);
          }
        }

        if (ordersData.success && Array.isArray(ordersData.data)) {
          setRecentOrders(ordersData.data);
        }
      } catch (err) {
        console.error('Error fetching data from API:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  // Dynamic CSS injection for theme & button customization
  useEffect(() => {
    const primary = themeConfig.primaryColor || '#2563eb';
    const radiusMap: Record<string, string> = {
      'rounded-md': '0.375rem',
      'rounded-lg': '0.5rem',
      'rounded-xl': '0.75rem',
      'rounded-2xl': '1rem',
      'rounded-full': '9999px',
    };
    const radius = radiusMap[themeConfig.buttonRadius] || '0.75rem';
    const glow = themeConfig.buttonGlow ? `box-shadow: 0 0 16px ${primary}66, 0 4px 6px -1px rgb(0 0 0 / 0.1);` : '';

    let styleEl = document.getElementById('alqamar-theme-styles') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'alqamar-theme-styles';
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      :root {
        --app-primary: ${primary};
        --app-primary-hover: ${primary}ee;
        --app-btn-radius: ${radius};
      }
      .bg-blue-600,
      button.bg-blue-600,
      a.bg-blue-600 {
        background-color: ${primary} !important;
        border-radius: ${radius} !important;
        ${glow}
      }
      button.bg-blue-600:hover,
      a.bg-blue-600:hover {
        filter: brightness(1.15) !important;
      }
    `;
  }, [themeConfig]);

  const handleUpdateVideos = async (newVideos: StoreVideoItem[]) => {
    setVideos(newVideos);
    try {
      localStorage.setItem('alqamar_store_videos', JSON.stringify(newVideos));
      await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: newVideos })
      });
      showToast('تم تحديث الفيديوهات التعريفية وحفظها بنجاح');
    } catch (e) {
      console.error('Failed to sync videos to server:', e);
    }
  };

  const handleUpdateTheme = async (themeUpdates: Partial<ThemeConfig>) => {
    const updated: ThemeConfig = { ...themeConfig, ...themeUpdates };
    setThemeConfig(updated);
    try {
      localStorage.setItem('alqamar_theme_config', JSON.stringify(updated));
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      showToast('تم تطبيق مظهر الأزرار الجديد بنجاح');
    } catch (e) {
      console.error('Failed to sync theme to server:', e);
    }
  };

  // Admin Handlers
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setActiveTab('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setActiveTab('admin');
    showToast('مرحباً بك في لوحة تحكم المدير');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('alqamar_admin_session');
    setIsAdminLoggedIn(false);
    setActiveTab('store');
    showToast('تم تسجيل الخروج من لوحة الإدارة');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsAdminProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAdminProductModalOpen(true);
  };

  const handleSaveProduct = async (finalProduct: Product) => {
    // 1. Optimistic local state update
    setProducts(prev => {
      const exists = prev.some(p => p.id === finalProduct.id);
      let updated: Product[];
      if (exists) {
        updated = prev.map(p => p.id === finalProduct.id ? finalProduct : p);
      } else {
        updated = [finalProduct, ...prev];
      }
      try {
        localStorage.setItem('alqamar_admin_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    if (finalProduct.brand && !brands.includes(finalProduct.brand)) {
      setBrands(prev => [...prev, finalProduct.brand]);
    }

    showToast(editingProduct ? `تم تحديث "${finalProduct.nameAr}" بنجاح` : `تمت إضافة "${finalProduct.nameAr}" إلى الكتالوج`);

    // 2. Persist to server database so it appears on mobile and all devices
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalProduct)
      });
    } catch (err) {
      console.error('Failed to persist product to server:', err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem('alqamar_admin_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast('تم حذف المنتج من الكتالوج بنجاح');

    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete product from server:', err);
    }
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Copy)`,
      nameAr: `${product.nameAr} (نسخة)`
    };
    handleSaveProduct(duplicated);
  };

  const handleQuickStockChange = async (productId: string, delta: number) => {
    let updatedProduct: Product | null = null;
    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === productId) {
          const newCount = Math.max(0, (p.stockCount || 0) + delta);
          updatedProduct = {
            ...p,
            stockCount: newCount,
            inStock: newCount > 0
          };
          return updatedProduct;
        }
        return p;
      });
      try {
        localStorage.setItem('alqamar_admin_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    if (updatedProduct) {
      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct)
        });
      } catch (err) {
        console.error('Failed to update stock on server:', err);
      }
    }
  };

  const handleUpdateExchangeRate = async (newRate: number, autoRecalculatePrices: boolean) => {
    const updatedStore = { ...storeInfo, exchangeRate: newRate };
    setStoreInfo(updatedStore);
    try {
      localStorage.setItem('alqamar_admin_store', JSON.stringify(updatedStore));
    } catch (e) {
      console.error(e);
    }

    if (autoRecalculatePrices) {
      setProducts(prev => {
        const updatedProds = prev.map(p => ({
          ...p,
          priceIQD: Math.round(p.priceUSD * newRate)
        }));
        try {
          localStorage.setItem('alqamar_admin_products', JSON.stringify(updatedProds));
        } catch (e) {
          console.error(e);
        }
        return updatedProds;
      });
    }

    showToast(`تم اعتماد سعر الصرف الجديد: 1$ = ${newRate.toLocaleString()} د.ع`);

    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeInfo: updatedStore, autoRecalculate: autoRecalculatePrices })
      });
    } catch (err) {
      console.error('Failed to update exchange rate on server:', err);
    }
  };

  const handleUpdateStoreInfo = async (newInfo: StoreInfo) => {
    setStoreInfo(newInfo);
    try {
      localStorage.setItem('alqamar_admin_store', JSON.stringify(newInfo));
    } catch (e) {
      console.error(e);
    }
    showToast('تم تحديث بيانات المعرض بنجاح');

    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeInfo: newInfo })
      });
    } catch (err) {
      console.error('Failed to update store info on server:', err);
    }
  };

  const handleUpdateHomeSections = async (newSections: HomePageSectionsConfig) => {
    setHomeSections(newSections);
    try {
      localStorage.setItem('alqamar_admin_home_sections_v2', JSON.stringify(newSections));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ تخصيص أقسام الصفحة الرئيسية بنجاح');

    try {
      await fetch('/api/home-sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSections)
      });
    } catch (err) {
      console.error('Failed to update home sections on server:', err);
    }
  };

  const handleUpdateHeroSlides = async (newSlides: HeroSlide[]) => {
    setHeroSlides(newSlides);
    try {
      localStorage.setItem('alqamar_hero_slides', JSON.stringify(newSlides));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ وتحديث شرائح وصور السلايدر المتحرك بنجاح');

    try {
      await fetch('/api/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlides)
      });
    } catch (err) {
      console.error('Failed to update hero slides on server:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    setRecentOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status } : o);
      try {
        localStorage.setItem('alqamar_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast('تم تحديث حالة الطلب بنجاح');

    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error('Failed to update order status on server:', err);
    }
  };

  // Toast Notification Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تمت إضافة "${product.nameAr}" إلى سلة التسوق`);
  };

  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    if (productsToAdd.length === 0) return;
    setCart(prev => {
      let updated = [...prev];
      productsToAdd.forEach(prod => {
        const existing = updated.find(item => item.product.id === prod.id);
        if (existing) {
          updated = updated.map(item => 
            item.product.id === prod.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`تمت إضافة ${productsToAdd.length} قطع إلى السلة`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleFavorite = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`تمت إزالة "${product.nameAr}" من المفضلة`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`تمت إضافة "${product.nameAr}" إلى المفضلة`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  // Compare Handlers
  const handleToggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`تم إزالة "${product.nameAr}" من المقارنة`);
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('يمكنك مقارنة 4 منتجات كحد أقصى في نفس الوقت');
        return prev;
      }
      showToast(`تم إضافة "${product.nameAr}" لقائمة المقارنة`);
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // PC Builder Single Item Addition
  const handleAddToBuilder = (product: Product) => {
    const categoryToSlotMap: Partial<Record<ProductCategory, keyof PCBuildParts>> = {
      cpus: 'cpu',
      gpus: 'gpu',
      motherboards: 'motherboard',
      ram: 'ram',
      storage: 'storage',
      power_supplies: 'powerSupply',
      cooling: 'cooler',
      cases: 'pcCase'
    };

    const slot = categoryToSlotMap[product.category];
    if (slot) {
      setCurrentBuild(prev => ({
        ...prev,
        [slot]: product
      }));
      showToast(`تم إضافة "${product.nameAr}" إلى تجميعة الحاسوب`);
      setActiveTab('pc-builder');
    }
  };

  // Currency Toggle
  const handleCurrencyToggle = () => {
    setCurrency(prev => prev === 'IQD' ? 'USD' : 'IQD');
  };

  // Filter and Sort Products
  const filteredProducts = products.filter(p => {
    if (activeTab === 'prebuilt' && p.category !== 'prebuilt_pcs') return false;
    if (activeTab === 'laptops' && p.category !== 'laptops') return false;
    if (activeTab === 'store' && activeCategory !== 'all' && p.category !== activeCategory) return false;
    
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
    if (inStockOnly && !p.inStock) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        p.name.toLowerCase().includes(q) ||
        p.nameAr.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q) ||
        (p.specs.vram && String(p.specs.vram).toLowerCase().includes(q)) ||
        (p.specs.socket && String(p.specs.socket).toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.priceUSD - b.priceUSD;
    if (sortOption === 'price-desc') return b.priceUSD - a.priceUSD;
    if (sortOption === 'gaming-score') return (b.gamingScore || 0) - (a.gamingScore || 0);
    if (sortOption === 'popular' || sortOption === 'featured') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    return 0;
  });

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const categoriesWithCounts = categories.map(cat => {
    if (cat.id === 'all') {
      return { ...cat, count: products.length };
    }
    const count = products.filter(p => p.category === cat.id).length;
    return { ...cat, count };
  });

  const handleAddCategory = async (newCat: { nameAr: string; nameEn?: string; icon?: string; badge?: string }) => {
    const slug = (newCat.nameEn || newCat.nameAr)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_');
    
    const catId = slug || `cat_${Date.now()}`;

    if (categories.some(c => c.id === catId || c.nameAr === newCat.nameAr)) {
      showToast('هذا القسم موجود بالفعل بنفس الاسم');
      return;
    }

    const created = {
      id: catId,
      name: newCat.nameEn || newCat.nameAr,
      nameAr: newCat.nameAr,
      icon: newCat.icon || '📁',
      badge: newCat.badge || 'قسم جديد',
      isCustom: true
    };

    setCategories(prev => {
      const updated = [...prev, created];
      try {
        localStorage.setItem('alqamar_admin_categories', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(`تمت إضافة قسم "${newCat.nameAr}" بنجاح للمتجر`);

    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (err) {
      console.error('Failed to save category to server:', err);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (catId === 'all') return;
    setCategories(prev => {
      const updated = prev.filter(c => c.id !== catId);
      try {
        localStorage.setItem('alqamar_admin_categories', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast('تم حذف القسم بنجاح');

    try {
      await fetch(`/api/categories/${catId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete category on server:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-cairo antialiased selection:bg-blue-600 selection:text-white w-full max-w-full overflow-x-hidden relative" dir="rtl">
      
      {/* Optional Slim Promotional Bar */}
      {homeSections.showPromoBanner && (
        <DynamicNotificationBar 
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenBuilder={() => setActiveTab('pc-builder')}
          customText={homeSections.promoBannerText}
        />
      )}

      {/* Header */}
      <Header 
        storeInfo={storeInfo}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        userName={userProfile.fullName ? userProfile.fullName.split(' ')[0] : 'حسابي'}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={setSelectedProductModal}
        onAddToCart={handleAddToCart}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* Manager Admin Dashboard View (Strictly Password Protected) */}
        {activeTab === 'admin' && isAdminLoggedIn ? (
          <AdminDashboard 
            products={products}
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            storeInfo={storeInfo}
            orders={recentOrders}
            recentOrders={recentOrders}
            homeSections={homeSections}
            currency={currency}
            heroSlides={heroSlides}
            onUpdateHeroSlides={handleUpdateHeroSlides}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onDuplicateProduct={handleDuplicateProduct}
            onQuickStockChange={handleQuickStockChange}
            onUpdateExchangeRate={handleUpdateExchangeRate}
            onUpdateStoreInfo={handleUpdateStoreInfo}
            onUpdateHomeSections={handleUpdateHomeSections}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            videos={videos}
            onUpdateVideos={handleUpdateVideos}
            themeConfig={themeConfig}
            onUpdateThemeConfig={handleUpdateTheme}
            onExitAdmin={() => setActiveTab('store')}
            onLogoutAdmin={handleAdminLogout}
            onLogout={handleAdminLogout}
            onClose={() => setActiveTab('store')}
          />
        ) : (
          <>
            {/* 1. Hero Showcase (Visible on main store tab when no search filter is active) */}
            {activeTab === 'store' && !searchQuery && activeCategory === 'all' && homeSections.showHeroBanner && (
              <HeroBanner 
                storeInfo={storeInfo}
                currency={currency}
                slides={heroSlides}
                onOpenBuilder={() => setActiveTab('pc-builder')}
                onOpenAI={() => setIsAIAdvisorOpen(true)}
                onOpenPrebuilts={() => setActiveTab('prebuilt')}
                onOpenLaptops={() => setActiveTab('laptops')}
                onExploreProducts={() => {
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* 2. Compact Category Quick Selector */}
            {activeTab === 'store' && !searchQuery && activeCategory === 'all' && (homeSections.showQuickCategoriesNav !== false) && (
              <MainCategoriesNav 
                onSelectCategory={(cat) => setActiveCategory(cat)}
                onSelectTab={(tab) => setActiveTab(tab)}
                categoryCounts={categoryCounts}
              />
            )}

            {/* 3. Primary View Switcher: PC Builder vs Main Storefront Catalog */}
            {activeTab === 'pc-builder' ? (
              <PCBuilder 
                products={products}
                currentBuild={currentBuild}
                onUpdateBuild={setCurrentBuild}
                currency={currency}
                storeInfo={storeInfo}
                onAddAllToCart={handleAddMultipleToCart}
                onOpenProductModal={setSelectedProductModal}
              />
            ) : (
              <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                  <div className="text-right">
                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                      {activeTab === 'prebuilt' && <Flame className="w-5 h-5 text-blue-400" />}
                      {activeTab === 'laptops' && <Laptop className="w-5 h-5 text-blue-400" />}
                      {activeTab === 'store' && <Cpu className="w-5 h-5 text-blue-400" />}
                      <span>
                        {activeTab === 'prebuilt' 
                          ? 'تجميعات القمر الجاهزة والمختبرة' 
                          : activeTab === 'laptops' 
                          ? 'لابتوبات الألعاب وصناعة المحتوى' 
                          : 'كتالوج قطع الحاسوب والملحقات'}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {activeTab === 'prebuilt' 
                        ? 'تجميعات احترافية تم تركيبها وفحص حرارتها في فرع شارع الصناعة وجاهزة للتسليم المباشر'
                        : activeTab === 'laptops'
                        ? 'أقوى أجهزة اللابتوب بشاشات 240Hz وكروت RTX 40 مع ضمان محلي معتمد'
                        : 'أحدث كروت الشاشة، المعالجات، الذواكر، والشاشات الأصلية مع ضمان استبدال حقيقي'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('pc-builder')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>مجمع الحاسوب الذكي (PC Builder)</span>
                    </button>
                  </div>
                </div>

                {/* Filter Toolbar */}
                {activeTab === 'store' && (
                  <CategoryFilterBar 
                    categories={categoriesWithCounts}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                    selectedBrand={selectedBrand}
                    onSelectBrand={setSelectedBrand}
                    brands={brands}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    inStockOnly={inStockOnly}
                    onToggleInStock={() => setInStockOnly(!inStockOnly)}
                  />
                )}

                {/* Catalog Main Layout (Desktop Sidebar + Product Grid) */}
                <div className="flex gap-6 items-start">
                  
                  {activeTab === 'store' && (
                    <CategorySidebar 
                      categories={categoriesWithCounts}
                      activeCategory={activeCategory}
                      onSelectCategory={setActiveCategory}
                      selectedBrand={selectedBrand}
                      onSelectBrand={setSelectedBrand}
                      brands={brands}
                      inStockOnly={inStockOnly}
                      onToggleInStock={() => setInStockOnly(!inStockOnly)}
                      onResetFilters={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                        setSelectedBrand('all');
                        setInStockOnly(false);
                      }}
                    />
                  )}

                  {/* Products Grid */}
                  <div className="flex-1 min-w-0">
                    {loading ? (
                      <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
                        <RefreshCw className="w-7 h-7 animate-spin text-blue-400" />
                        <span className="text-xs font-medium">جاري تحميل المنتجات...</span>
                      </div>
                    ) : sortedProducts.length === 0 ? (
                      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                        <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                        <h3 className="text-sm font-bold text-slate-200">لا توجد منتجات مطابقة للفلاتر المحددة</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          جرب تغيير كلمات البحث أو إعادة ضبط فلاتر الأقسام والشركات.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setActiveCategory('all');
                            setSelectedBrand('all');
                            setInStockOnly(false);
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          إعادة ضبط الفلاتر
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sortedProducts.map((product) => {
                          const isFav = wishlist.some(item => item.id === product.id);
                          const isComp = compareList.some(item => item.id === product.id);
                          return (
                            <ProductCard 
                              key={product.id}
                              product={product}
                              currency={currency}
                              onAddToCart={handleAddToCart}
                              onSelectProduct={handleSelectProduct}
                              onAddToBuilder={handleAddToBuilder}
                              isFavorite={isFav}
                              onToggleFavorite={handleToggleFavorite}
                              isCompared={isComp}
                              onToggleCompare={handleToggleCompare}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>

              </section>
            )}

            {/* 4. Secondary Sections (Controlled by Manager in Admin Dashboard) */}
            {!searchQuery && activeTab === 'store' && activeCategory === 'all' && (
              <div className="space-y-8 border-t border-slate-800/60 pt-8">
                {homeSections.showFlashSale && (
                  <FlashSaleSection 
                    products={products}
                    currency={currency}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={handleSelectProduct}
                  />
                )}

                {homeSections.showBuyTogetherBundles && (
                  <BuyTogetherBundlesSection 
                    products={products}
                    currency={currency}
                    onAddMultipleToCart={handleAddMultipleToCart}
                    onSelectProduct={handleSelectProduct}
                  />
                )}

                {homeSections.showBestSellers && (
                  <BestSellersSection 
                    products={products}
                    currency={currency}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                  />
                )}

                {homeSections.showNewArrivals && (
                  <NewArrivalsCarousel 
                    products={products}
                    currency={currency}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    wishlistIds={wishlist.map(w => w.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}

                {homeSections.showRecommended && (
                  <RecommendedProducts 
                    products={products}
                    currency={currency}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={handleSelectProduct}
                    wishlist={wishlist}
                    onToggleFavorite={handleToggleFavorite}
                    activeCategory={activeCategory}
                    recentlyViewedIds={recentlyViewedIds}
                  />
                )}

                {homeSections.showStoreVideo && (
                  <StoreIntroVideoSection videos={videos} onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)} />
                )}

                {homeSections.showDeliveryMap && (
                  <InteractiveDeliveryMap storePhone={storeInfo.phone} />
                )}

                {homeSections.showCustomerStories && (
                  <CustomerStoriesSection onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)} />
                )}

                {homeSections.showSocialMediaFeed && (
                  <SocialMediaFeedSection />
                )}

                {homeSections.showTestimonials && (
                  <CustomerTestimonials />
                )}

                {homeSections.showTechBlog && (
                  <TechBlog onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)} />
                )}

                {homeSections.showFAQ && (
                  <FAQSection 
                    onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
                    onOpenLocation={() => setIsLocationModalOpen(true)}
                    storePhone={storeInfo.phone}
                    storeWhatsapp={storeInfo.whatsapp}
                  />
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* Clean Floating Support Button */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-2">
        <a
          href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent('السلام عليكم مكتب القمر، استفسار بخصوص قطع الحاسوب واللابتوبات')}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">تواصل عبر واتساب</span>
        </a>
      </div>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals and Drawers */}
      <ProductModal 
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        currency={currency}
        storeInfo={storeInfo}
        onAddToCart={handleAddToCart}
        onAddToBuilder={handleAddToBuilder}
        isFavorite={selectedProductModal ? wishlist.some(item => item.id === selectedProductModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearWishlist={handleClearWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProductModal}
        currency={currency}
        storeInfo={storeInfo}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        storeInfo={storeInfo}
        userProfile={userProfile}
        onSaveProfile={(prof) => {
          setUserProfile(prof);
          showToast('تم حفظ بيانات الحساب والعنوان بنجاح');
        }}
        recentOrders={recentOrders}
        currentBuild={currentBuild}
        onOpenPCBuilder={() => {
          setActiveTab('pc-builder');
        }}
        onOpenAdmin={handleOpenAdmin}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        storeInfo={storeInfo}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        storeInfo={storeInfo}
        onOrderSuccess={(orderData?: Order) => {
          if (orderData) {
            setRecentOrders(prev => [orderData, ...prev]);
          }
          handleClearCart();
        }}
      />

      <AIAdvisorDrawer 
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        storeInfo={storeInfo}
      />

      <StoreLocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        storeInfo={storeInfo}
      />

      {/* Admin Login Modal (Manager Only) */}
      <AdminLoginModal 
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Product Add/Edit Modal */}
      <AdminProductModal 
        isOpen={isAdminProductModalOpen}
        onClose={() => {
          setIsAdminProductModalOpen(false);
          setEditingProduct(null);
        }}
        editingProduct={editingProduct}
        productToEdit={editingProduct}
        categories={categories}
        brands={brands}
        exchangeRate={storeInfo.exchangeRate}
        onSaveProduct={handleSaveProduct}
        onSave={handleSaveProduct}
      />

      {/* Floating Compare Trigger Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>مقارنة المنتجات ({compareList.length})</span>
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      <CompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Footer */}
      <Footer 
        storeInfo={storeInfo}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveTab('store');
        }}
        onOpenBuilder={() => setActiveTab('pc-builder')}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Mobile Bottom Dock */}
      <MobileBottomDock 
        activeTab={activeTab === 'pc-builder' ? 'pc-builder' : 'store'}
        setActiveTab={(tab) => setActiveTab(tab)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onScrollToCategories={() => {
          const el = document.getElementById('products-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }
        }}
      />

    </div>
  );
}
