import React, { useState } from 'react';
import { 
  Package, 
  DollarSign, 
  Layout, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  RefreshCw, 
  Check, 
  ArrowLeft, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  LogOut, 
  Save, 
  Sparkles, 
  Flame, 
  AlertTriangle,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Palette,
  Play,
  Video,
  Film,
  CheckCircle2
} from 'lucide-react';
import { Product, ProductCategory, StoreInfo, HomePageSectionsConfig, Order, HeroSlide, StoreVideoItem, ThemeConfig } from '../types';
import { DEFAULT_HERO_SLIDES } from './HeroBanner';
import { DEFAULT_STORE_VIDEOS } from './StoreIntroVideoSection';

export const THEME_PRESETS: {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  badgeBg: string;
  description: string;
}[] = [
  { id: 'royal_blue', name: 'أزرق كوانتم (الافتراضي)', primaryColor: '#2563eb', accentColor: '#38bdf8', badgeBg: 'bg-blue-600', description: 'المظهر التقني الكلاسيكي لمكتب القمر' },
  { id: 'rog_red', name: 'أحمر ROG للألعاب', primaryColor: '#dc2626', accentColor: '#f87171', badgeBg: 'bg-red-600', description: 'طابع الحماس والقوة لجمهور الجيمنج والتجميعات' },
  { id: 'emerald_green', name: 'أخضر رايزر زمردي', primaryColor: '#059669', accentColor: '#34d399', badgeBg: 'bg-emerald-600', description: 'طابع احترافي مستوحى من Razer وNvidia' },
  { id: 'cyber_purple', name: 'سايبر بنفسجي نيون', primaryColor: '#7c3aed', accentColor: '#c084fc', badgeBg: 'bg-purple-600', description: 'ألوان مستقبلية مذهلة لعشاق الـ RGB' },
  { id: 'fiery_orange', name: 'برتقالي ناري فائق', primaryColor: '#ea580c', accentColor: '#fb923c', badgeBg: 'bg-orange-600', description: 'طاقة عالية ولمسات حيوية تجذب الانتباه' },
  { id: 'luxury_gold', name: 'ذهبي فاخر VIP', primaryColor: '#d97706', accentColor: '#fde047', badgeBg: 'bg-amber-600', description: 'طابع فخم للمواصفات العليا واللابتوبات الراقية' },
  { id: 'sci_cyan', name: 'سايان ثلجي مستقبلي', primaryColor: '#0284c7', accentColor: '#38bdf8', badgeBg: 'bg-sky-600', description: 'ألوان تبريد مائي ناصعة وطابع تقني حديث' },
  { id: 'neon_magenta', name: 'ماجنتا وردي نيون', primaryColor: '#db2777', accentColor: '#f472b6', badgeBg: 'bg-pink-600', description: 'طابع نيون مضيء وجريء' },
];

interface AdminDashboardProps {
  products?: Product[];
  categories?: { id: string; name: string; nameAr: string; icon?: string; badge?: string; count?: number; isCustom?: boolean }[];
  onAddCategory?: (newCat: { nameAr: string; nameEn?: string; icon?: string; badge?: string }) => void;
  onDeleteCategory?: (catId: string) => void;
  onAddProduct?: () => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  onDuplicateProduct?: (product: Product) => void;
  onQuickStockChange?: (productId: string, delta: number) => void;
  storeInfo: StoreInfo;
  onUpdateStoreInfo?: (info: StoreInfo) => void;
  onUpdateExchangeRate?: (newRate: number, autoRecalculatePrices: boolean) => void;
  homeSections?: HomePageSectionsConfig;
  onUpdateHomeSections?: (sections: HomePageSectionsConfig) => void;
  heroSlides?: HeroSlide[];
  onUpdateHeroSlides?: (slides: HeroSlide[]) => void;
  videos?: StoreVideoItem[];
  onUpdateVideos?: (videos: StoreVideoItem[]) => void;
  themeConfig?: ThemeConfig;
  onUpdateThemeConfig?: (theme: Partial<ThemeConfig>) => void;
  orders?: Order[];
  recentOrders?: Order[];
  onUpdateOrderStatus?: (orderId: string, status: Order['status']) => void;
  onExitAdmin?: () => void;
  onClose?: () => void;
  onLogoutAdmin?: () => void;
  onLogout?: () => void;
  currency?: 'IQD' | 'USD';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products = [],
  categories = [],
  onAddCategory = () => {},
  onDeleteCategory = () => {},
  onAddProduct = () => {},
  onEditProduct = (_product: Product) => {},
  onDeleteProduct = (_productId: string) => {},
  onDuplicateProduct = (_product: Product) => {},
  onQuickStockChange = (_productId: string, _delta: number) => {},
  storeInfo,
  onUpdateStoreInfo = (_info: StoreInfo) => {},
  onUpdateExchangeRate = (_newRate: number, _autoRecalculatePrices: boolean) => {},
  homeSections = {
    showPromoBanner: true,
    showHeroBanner: true,
    showFlashSale: true,
    showRecommended: true,
    showNewArrivals: true,
    showBestSellers: true,
    showBuyTogetherBundles: true,
    showStoreVideo: true,
    showDeliveryMap: true,
    showCustomerStories: true,
    showSocialMediaFeed: true,
    showTestimonials: true,
    showTechBlog: true,
    showFAQ: true,
    promoBannerText: ''
  },
  onUpdateHomeSections = (_sections: HomePageSectionsConfig) => {},
  heroSlides,
  onUpdateHeroSlides = (_slides: HeroSlide[]) => {},
  videos,
  onUpdateVideos = (_videos: StoreVideoItem[]) => {},
  themeConfig,
  onUpdateThemeConfig = (_theme: Partial<ThemeConfig>) => {},
  orders,
  recentOrders,
  onUpdateOrderStatus = (_orderId: string, _status: Order['status']) => {},
  onExitAdmin,
  onClose,
  onLogoutAdmin,
  onLogout,
  currency = 'IQD'
}) => {
  const safeOrders = orders || recentOrders || [];
  const handleExitAdmin = onExitAdmin || onClose || (() => {});
  const handleLogoutAdmin = onLogoutAdmin || onLogout || (() => {});

  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'categories' | 'slider' | 'theme' | 'videos' | 'homepage' | 'exchange' | 'orders' | 'settings'>('products');
  
  // Category Management Form State
  const [newCategoryNameAr, setNewCategoryNameAr] = useState('');
  const [newCategoryNameEn, setNewCategoryNameEn] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('💺');
  const [newCategoryBadge, setNewCategoryBadge] = useState('');
  const [categorySuccessMsg, setCategorySuccessMsg] = useState(false);

  // Product Search & Filter
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Exchange Rate Temporary State
  const [tempRate, setTempRate] = useState<number>(storeInfo.exchangeRate || 1520);
  const [autoRecalculate, setAutoRecalculate] = useState(true);
  const [rateSuccessMsg, setRateSuccessMsg] = useState(false);

  // Store Info Form State
  const [tempStoreInfo, setTempStoreInfo] = useState<StoreInfo>(storeInfo);
  const [storeSaveSuccess, setStoreSaveSuccess] = useState(false);

  // Home Sections State
  const [tempHomeSections, setTempHomeSections] = useState<HomePageSectionsConfig>(homeSections);
  const [homeSaveSuccess, setHomeSaveSuccess] = useState(false);

  // Hero Slider Management State
  const [slidesList, setSlidesList] = useState<HeroSlide[]>(() => {
    return heroSlides && heroSlides.length > 0 ? heroSlides : DEFAULT_HERO_SLIDES;
  });
  const [slideSaveSuccess, setSlideSaveSuccess] = useState(false);
  const [newSlide, setNewSlide] = useState<{
    titleMain: string;
    titleSub: string;
    kicker: string;
    description: string;
    image: string;
    primaryCtaText: string;
    primaryCtaAction: 'builder' | 'prebuilts' | 'laptops' | 'products' | 'whatsapp';
  }>({
    titleMain: '',
    titleSub: '',
    kicker: 'عروض مكتب القمر الحصرية · شارع الصناعة',
    description: '',
    image: '',
    primaryCtaText: 'تصفح العرض',
    primaryCtaAction: 'prebuilts'
  });

  const handleSaveHeroSlides = () => {
    onUpdateHeroSlides(slidesList);
    setSlideSaveSuccess(true);
    setTimeout(() => setSlideSaveSuccess(false), 3000);
  };

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlide.image.trim()) {
      alert('يرجى تحديد صورة للشريحة أولاً عبر رفع ملف أو لصق رابط');
      return;
    }
    if (!newSlide.titleMain.trim()) {
      alert('يرجى كتابة عنوان رئيسي للشريحة');
      return;
    }

    const createdSlide: HeroSlide = {
      id: `slide-custom-${Date.now()}`,
      titleMain: newSlide.titleMain.trim(),
      titleSub: newSlide.titleSub.trim() || undefined,
      kicker: newSlide.kicker.trim() || undefined,
      description: newSlide.description.trim() || undefined,
      image: newSlide.image.trim(),
      primaryCtaText: newSlide.primaryCtaText.trim() || 'تصفح العرض',
      primaryCtaAction: newSlide.primaryCtaAction,
      secondaryCtaText: 'ابنِ تجميعتك',
      secondaryCtaAction: 'builder'
    };

    const updated = [createdSlide, ...slidesList];
    setSlidesList(updated);
    onUpdateHeroSlides(updated);
    setNewSlide({
      titleMain: '',
      titleSub: '',
      kicker: 'عروض مكتب القمر الحصرية · شارع الصناعة',
      description: '',
      image: '',
      primaryCtaText: 'تصفح العرض',
      primaryCtaAction: 'prebuilts'
    });
    setSlideSaveSuccess(true);
    setTimeout(() => setSlideSaveSuccess(false), 3000);
  };

  const handleDeleteSlide = (id: string) => {
    if (slidesList.length <= 1) {
      alert('يجب الإبقاء على شريحة واحدة على الأقل في السلايدر');
      return;
    }
    const updated = slidesList.filter(s => s.id !== id);
    setSlidesList(updated);
    onUpdateHeroSlides(updated);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slidesList.length) return;
    const updated = [...slidesList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSlidesList(updated);
    onUpdateHeroSlides(updated);
  };

  const handleResetDefaultSlides = () => {
    if (confirm('هل أنت متأكد من استعادة الشرائح الافتراضية للسلايدر؟')) {
      setSlidesList(DEFAULT_HERO_SLIDES);
      onUpdateHeroSlides(DEFAULT_HERO_SLIDES);
    }
  };

  // Theme Customizer State
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    return themeConfig || {
      primaryColor: '#2563eb',
      themePresetName: 'أزرق كوانتم (الافتراضي)',
      buttonRadius: 'rounded-xl',
      buttonGlow: true,
      buttonStyle: 'gradient'
    };
  });
  const [themeSaveSuccess, setThemeSaveSuccess] = useState(false);

  const handleApplyPreset = (preset: typeof THEME_PRESETS[0]) => {
    const updated: ThemeConfig = {
      ...currentTheme,
      primaryColor: preset.primaryColor,
      themePresetName: preset.name
    };
    setCurrentTheme(updated);
    onUpdateThemeConfig(updated);
  };

  const handleSaveTheme = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateThemeConfig(currentTheme);
    setThemeSaveSuccess(true);
    setTimeout(() => setThemeSaveSuccess(false), 3000);
  };

  // Video Management State
  const [videosList, setVideosList] = useState<StoreVideoItem[]>(() => {
    return (videos && videos.length > 0) ? videos : DEFAULT_STORE_VIDEOS;
  });
  const [videoSaveSuccess, setVideoSaveSuccess] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<{
    titleAr: string;
    durationAr: string;
    descriptionAr: string;
    thumbnail: string;
    videoUrl: string;
  }>({
    titleAr: '',
    durationAr: '1:45 دقيقة',
    descriptionAr: '',
    thumbnail: '',
    videoUrl: ''
  });

  const handleAddOrUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.titleAr.trim()) {
      alert('يرجى إدخال عنوان للفيديو');
      return;
    }
    const thumb = videoForm.thumbnail.trim() || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80';

    if (editingVideoId) {
      const updated = videosList.map(v => v.id === editingVideoId ? {
        ...v,
        titleAr: videoForm.titleAr.trim(),
        durationAr: videoForm.durationAr.trim() || '1:30 دقيقة',
        descriptionAr: videoForm.descriptionAr.trim(),
        thumbnail: thumb,
        videoUrl: videoForm.videoUrl.trim()
      } : v);
      setVideosList(updated);
      onUpdateVideos(updated);
      setEditingVideoId(null);
    } else {
      const newVid: StoreVideoItem = {
        id: `video-${Date.now()}`,
        titleAr: videoForm.titleAr.trim(),
        durationAr: videoForm.durationAr.trim() || '1:30 دقيقة',
        descriptionAr: videoForm.descriptionAr.trim(),
        thumbnail: thumb,
        videoUrl: videoForm.videoUrl.trim()
      };
      const updated = [...videosList, newVid];
      setVideosList(updated);
      onUpdateVideos(updated);
    }

    setVideoForm({
      titleAr: '',
      durationAr: '1:45 دقيقة',
      descriptionAr: '',
      thumbnail: '',
      videoUrl: ''
    });
    setVideoSaveSuccess(true);
    setTimeout(() => setVideoSaveSuccess(false), 3000);
  };

  const handleStartEditVideo = (v: StoreVideoItem) => {
    setEditingVideoId(v.id);
    setVideoForm({
      titleAr: v.titleAr,
      durationAr: v.durationAr,
      descriptionAr: v.descriptionAr,
      thumbnail: v.thumbnail,
      videoUrl: v.videoUrl || ''
    });
  };

  const handleDeleteVideo = (id: string) => {
    if (videosList.length <= 1) {
      alert('يجب الإبقاء على فيديو تعريفي واحد على الأقل');
      return;
    }
    const updated = videosList.filter(v => v.id !== id);
    setVideosList(updated);
    onUpdateVideos(updated);
    if (editingVideoId === id) {
      setEditingVideoId(null);
    }
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= videosList.length) return;
    const updated = [...videosList];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setVideosList(updated);
    onUpdateVideos(updated);
  };

  const handleResetDefaultVideos = () => {
    if (confirm('هل أنت متأكد من استعادة قائمة الفيديوهات التعريفية الافتراضية؟')) {
      setVideosList(DEFAULT_STORE_VIDEOS);
      onUpdateVideos(DEFAULT_STORE_VIDEOS);
    }
  };

  // Security / Credentials update state
  const [currentAdminUser, setCurrentAdminUser] = useState(() => {
    try {
      return localStorage.getItem('alqamar_admin_username') || 'admin';
    } catch {
      return 'admin';
    }
  });
  const [newUsername, setNewUsername] = useState(currentAdminUser);
  const [newPassword, setNewPassword] = useState('');
  const [credSuccessMsg, setCredSuccessMsg] = useState(false);
  const [credErrorMsg, setCredErrorMsg] = useState<string | null>(null);

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredErrorMsg(null);
    if (!newUsername.trim()) {
      setCredErrorMsg('يرجى إدخال اسم مستخدم صالح');
      return;
    }
    if (newPassword && newPassword.trim().length < 4) {
      setCredErrorMsg('يجب أن تتكون كلمة المرور من 4 خانات على الأقل');
      return;
    }
    try {
      localStorage.setItem('alqamar_admin_username', newUsername.trim());
      setCurrentAdminUser(newUsername.trim());
      if (newPassword.trim()) {
        localStorage.setItem('alqamar_admin_pin', newPassword.trim());
        setNewPassword('');
      }
      setCredSuccessMsg(true);
      setTimeout(() => setCredSuccessMsg(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Quick statistics
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const totalStoreValueUSD = products.reduce((acc, p) => acc + (p.priceUSD * (p.stockCount || 0)), 0);

  // Filtered products
  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameAr.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApplyExchangeRate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateExchangeRate(tempRate, autoRecalculate);
    setRateSuccessMsg(true);
    setTimeout(() => setRateSuccessMsg(false), 3000);
  };

  const handleSaveStoreInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreInfo(tempStoreInfo);
    setStoreSaveSuccess(true);
    setTimeout(() => setStoreSaveSuccess(false), 3000);
  };

  const handleSaveHomeSections = () => {
    onUpdateHomeSections(tempHomeSections);
    setHomeSaveSuccess(true);
    setTimeout(() => setHomeSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 text-right selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl px-4 sm:px-6 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Manager Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg shadow-amber-500/20 bg-white shrink-0 p-0.5">
              <img 
                src={storeInfo.logo || "/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg"} 
                alt="Moon Computer" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white">لوحة تحكم المدير (Master Admin)</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  جلسة آمنة نشطة 🔒
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                مكتب القمر للحاسبات (Moon Computer) • شارع الصناعة، مقابل الجامعة التكنولوجية، عمود 14
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExitAdmin}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>معاينة المتجر كزبون</span>
            </button>

            <button
              onClick={handleLogoutAdmin}
              title="تسجيل الخروج وقفل لوحة الإدارة فوراً"
              className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/30 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>تسجيل الخروج والقفل</span>
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Quick KPI Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>إجمالي المنتجات</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-tech">
              {totalProducts} <span className="text-xs text-slate-400 font-normal">قطعة</span>
            </div>
            <div className="text-[11px] text-emerald-400">
              {inStockProducts} متوفر بالمعرض
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>سعر صرف الدولار</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-tech">
              {storeInfo.exchangeRate} <span className="text-xs text-slate-400 font-normal">د.ع</span>
            </div>
            <div className="text-[11px] text-slate-400">
              $100 = {(storeInfo.exchangeRate * 100).toLocaleString()} د.ع
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>الطلبات الواردة</span>
              <ShoppingBag className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-tech">
              {safeOrders.length} <span className="text-xs text-slate-400 font-normal">طلب</span>
            </div>
            <div className="text-[11px] text-purple-400">
              {safeOrders.filter(o => o.status === 'pending').length} طلب معلق للتجهيز
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>قيمة المخزون المقدرة</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-tech">
              ${totalStoreValueUSD.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">
              ≈ {((totalStoreValueUSD * storeInfo.exchangeRate) / 1000000).toFixed(1)} مليون د.ع
            </div>
          </div>

        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
          
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>إدارة المنتجات والقطع ({totalProducts})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('categories')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'categories'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>إدارة وإضافة الأقسام ({categories.filter(c => c.id !== 'all').length}) 🗂️</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('slider')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'slider'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-blue-400" />
            <span>سلايدر وصور الواجهة ({slidesList.length}) 🖼️</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('theme')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'theme'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Palette className="w-4 h-4 text-blue-400" />
            <span>ألوان ومظهر الأزرار 🎨</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('videos')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'videos'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Play className="w-4 h-4 text-amber-400" />
            <span>فيديوهات مكتب القمر ({videosList.length}) 🎬</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('homepage')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'homepage'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>أقسام الصفحة والإعلانات 📑</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('exchange')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'exchange'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>سعر الصرف والعملة 💱</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'orders'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>الطلبات الواردة ({safeOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeAdminTab === 'settings'
                ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المعرض والأمان ⚙️</span>
          </button>

        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-4">
            
            {/* Action Bar (Search & Add Button) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg">
              
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="ابحث عن قطعة، موديل، براند (RTX, Ryzen, ASUS)..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id === 'all' ? 'جميع الأقسام' : `${cat.icon || ''} ${cat.nameAr}`}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={onAddProduct}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج جديد للكتالوج</span>
              </button>

            </div>

            {/* Products Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">المنتج والاسم</th>
                      <th className="p-3.5">التصنيف والشركة</th>
                      <th className="p-3.5">السعر بالدولار ($)</th>
                      <th className="p-3.5">السعر بالدينار (د.ع)</th>
                      <th className="p-3.5">المخزون السريع</th>
                      <th className="p-3.5">الشارات</th>
                      <th className="p-3.5 text-center">إجراءات الإدارة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                        
                        {/* Image & Title */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.nameAr} 
                              className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-950" 
                            />
                            <div>
                              <h4 className="font-bold text-white line-clamp-1">{product.nameAr}</h4>
                              <span className="text-[10px] text-slate-400 font-tech block line-clamp-1">{product.name}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category & Brand */}
                        <td className="p-3.5">
                          <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[10px] border border-amber-500/20 uppercase font-tech">
                            {product.brand}
                          </span>
                          <span className="text-slate-400 block text-[11px] mt-0.5">{product.category}</span>
                        </td>

                        {/* Price USD */}
                        <td className="p-3.5 font-black text-white font-tech">
                          ${product.priceUSD.toLocaleString()}
                        </td>

                        {/* Price IQD */}
                        <td className="p-3.5 font-black text-amber-400 font-tech">
                          {product.priceIQD.toLocaleString()} د.ع
                        </td>

                        {/* Quick Stock Controls */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onQuickStockChange(product.id, -1)}
                              title="إنقاص قطعة واحدة"
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className={`font-tech font-bold px-2 py-0.5 rounded text-xs ${
                              product.stockCount > 0 ? 'bg-slate-950 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400'
                            }`}>
                              {product.stockCount}
                            </span>
                            <button
                              onClick={() => onQuickStockChange(product.id, 1)}
                              title="زيادة قطعة واحدة"
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Badges */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {product.isBestSeller && (
                              <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded font-bold">🔥 مبيعات</span>
                            )}
                            {product.isNewArrival && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-bold">✨ جديد</span>
                            )}
                            {product.featured && (
                              <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.2 rounded font-bold">⭐ مميز</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => onEditProduct(product)}
                              title="تعديل المنتج"
                              className="p-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => onDuplicateProduct(product)}
                              title="تكرار / نسخ هذا المنتج"
                              className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من رغبتك في حذف المنتج "${product.nameAr}"؟`)) {
                                  onDeleteProduct(product.id);
                                }
                              }}
                              title="حذف المنتج نهائياً"
                              className="p-1.5 bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CATEGORY MANAGEMENT */}
        {activeAdminTab === 'categories' && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header Box */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Layers className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-lg font-black text-white">إدارة وتكوييد الأقسام والتصنيفات للمتجر</h2>
                  <p className="text-xs text-slate-400">
                    أضف أقساماً وتصنيفات جديدة للمتجر (مثل: كراسي جيمنج، طاولات، أجهزة VR، شبكات، إلخ) لتصنيف القطع والمنتجات فورياً.
                  </p>
                </div>
              </div>

              <div className="text-left shrink-0">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-blue-400 border border-slate-800 text-xs font-bold font-tech">
                  {categories.filter(c => c.id !== 'all').length} قسم معتمد بالمتجر
                </span>
              </div>
            </div>

            {categorySuccessMsg && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <Check className="w-4 h-4 shrink-0" />
                <span className="font-bold">تمت إضافة القسم الجديد بنجاح وتحديث أقسام وفلاتر واجهة المتجر فوراً!</span>
              </div>
            )}

            {/* Form: Add New Category */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCategoryNameAr.trim()) {
                  alert('يرجى كتابة اسم القسم بالعربية');
                  return;
                }
                onAddCategory({
                  nameAr: newCategoryNameAr.trim(),
                  nameEn: newCategoryNameEn.trim(),
                  icon: newCategoryIcon,
                  badge: newCategoryBadge.trim()
                });
                setNewCategoryNameAr('');
                setNewCategoryNameEn('');
                setNewCategoryBadge('');
                setCategorySuccessMsg(true);
                setTimeout(() => setCategorySuccessMsg(false), 3000);
              }}
              className="bg-[#111827] border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-right"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <h3 className="font-black text-sm text-white">إنشاء وإضافة قسم جديد لكتالوج المتجر</h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  سيظهر القسم فوراً في القوائم العلوية والشريط الجانبي
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-300 text-xs block">اسم القسم بالعربية *</label>
                  <input 
                    type="text"
                    required
                    value={newCategoryNameAr}
                    onChange={(e) => setNewCategoryNameAr(e.target.value)}
                    placeholder="مثال: كراسي وطاولات الجيمنج، أجهزة VR..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 text-xs block">اسم القسم بالإنجليزية (اختياري)</label>
                  <input 
                    type="text"
                    value={newCategoryNameEn}
                    onChange={(e) => setNewCategoryNameEn(e.target.value)}
                    placeholder="e.g. Gaming Chairs"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 text-xs block">شارة تمييز سريعة (Badge)</label>
                  <input 
                    type="text"
                    value={newCategoryBadge}
                    onChange={(e) => setNewCategoryBadge(e.target.value)}
                    placeholder="مثال: جديد / عروض خاصة"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Icon Selector */}
              <div className="space-y-2 bg-[#090d16] p-4 rounded-2xl border border-slate-800">
                <label className="font-bold text-xs text-blue-400 block">اختر أيقونة رمزية للقسم الجديد:</label>
                <div className="flex flex-wrap gap-2">
                  {['💺', '🎮', '🧠', '🎛️', '⚡', '💾', '🔌', '❄️', '🖥️', '💻', '📺', '🎧', '🔥', '🌐', '🕶️', '📦', '🕹️', '⌨️', '🖱️', '🖨️'].map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewCategoryIcon(emoji)}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                        newCategoryIcon === emoji 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-110 shadow-lg' 
                          : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة وتفعيل القسم فوراً بالمحل</span>
                </button>
              </div>
            </form>

            {/* List of Existing Categories */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-right">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>جميع أقسام المتجر المعتمدة حالياً ({categories.filter(c => c.id !== 'all').length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories
                  .filter(c => c.id !== 'all')
                  .map(cat => {
                    const prodCount = products.filter(p => p.category === cat.id).length;
                    return (
                      <div 
                        key={cat.id}
                        className="p-4 rounded-2xl bg-[#090d16] border border-slate-800/90 flex items-center justify-between gap-3 text-right hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-xl flex items-center justify-center shrink-0">
                            {cat.icon || '📁'}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-white truncate">{cat.nameAr}</h4>
                            <div className="text-[10px] text-slate-500 font-tech truncate mt-0.5">
                              {cat.name || cat.id}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-blue-400 font-tech font-bold text-[10px] border border-slate-800">
                            {prodCount} قطع
                          </span>

                          {cat.isCustom && (
                            <button
                              type="button"
                              onClick={() => {
                                if (prodCount > 0) {
                                  if (!confirm(`تحذير: يحتوي قسم "${cat.nameAr}" على ${prodCount} منتجات. هل تريد حذفه بالرغم من ذلك؟`)) {
                                    return;
                                  }
                                } else {
                                  if (!confirm(`هل تريد حذف القسم المخصص "${cat.nameAr}"؟`)) return;
                                }
                                onDeleteCategory(cat.id);
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              title="حذف هذا القسم"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: EXCHANGE RATE MASTER */}
        {activeAdminTab === 'exchange' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <DollarSign className="w-6 h-6" />
              </span>
              <div>
                <h2 className="text-lg font-black text-white">إدارة سعر الصرف والعملات (Currency Master)</h2>
                <p className="text-xs text-slate-400">
                  تحديث سعر صرف الدولار الأمريكي مقابل الدينار العراقي لجميع المنتجات فورياً.
                </p>
              </div>
            </div>

            <form onSubmit={handleApplyExchangeRate} className="space-y-6">
              
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <label className="text-xs font-bold text-slate-300 block">
                  سعر صرف الـ 100 دولار الحالية (IQD):
                </label>
                
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1000"
                    max="3000"
                    value={tempRate}
                    onChange={(e) => setTempRate(Number(e.target.value))}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-xl font-black text-amber-400 font-tech focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-sm font-bold text-slate-400">د.ع لكل دولار</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-slate-400 block w-full">أسعار سريعة شائعة بسوق بغداد وشارع الصناعة:</span>
                  {[1500, 1510, 1520, 1525, 1530, 1540, 1550].map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setTempRate(rate)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-tech font-bold transition-all ${
                        tempRate === rate 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {rate} د.ع (${100} = {(rate * 100).toLocaleString()})
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={autoRecalculate}
                    onChange={(e) => setAutoRecalculate(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white block">إعادة حساب وتحديث جميع أسعار المنتجات بالدينار فوراً</span>
                    <span className="text-slate-400 text-[11px]">سيتم ضرب السعر بالدولار لكل قطعة في الكتالوج بسعر الصرف الجديد ({tempRate} د.ع).</span>
                  </div>
                </label>
              </div>

              {rateSuccessMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4" />
                  <span>تم اعتماد سعر الصرف الجديد ({tempRate} د.ع) وتحديث جميع أسعار المعرض بنجاح!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>تطبيق وحفظ سعر الصرف للمتجر</span>
              </button>

            </form>

          </div>
        )}

        {/* TAB: HERO SLIDER & BANNER IMAGES MANAGEMENT */}
        {activeAdminTab === 'slider' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header & Quick Save Bar */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <ImageIcon className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-lg font-black text-white">إدارة صور وسلايدرات الواجهة المتحركة</h2>
                  <p className="text-xs text-slate-400">
                    أضف صورك الخاصة وعروضك الترويجية للسلايدر في أعلى المتجر، وتحكم في الترتيب والعناوين فورياً.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetDefaultSlides}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveHeroSlides}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التغييرات</span>
                </button>
              </div>
            </div>

            {slideSaveSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <Check className="w-4 h-4 shrink-0" />
                <span className="font-bold">تم حفظ وتحديث شرائح السلايدر المتحرك بنجاح وتطبيقها على واجهة المتجر فوراً!</span>
              </div>
            )}

            {/* Form to Add New Slide */}
            <form onSubmit={handleAddSlide} className="bg-[#111827] border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <h3 className="font-black text-sm text-white">إضافة صورة وشريحة جديدة للسلايدر المتحرك</h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  سيتم عرض الشريحة تلقائياً في السلايدر
                </span>
              </div>

              {/* Image Input (File Upload OR URL) */}
              <div className="space-y-3 bg-[#090d16] p-4 rounded-2xl border border-slate-800">
                <label className="font-bold text-xs text-blue-400 block">
                  1. تحديد صورة السلايدر (رفع من الجهاز أو إدخال رابط):
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-8 flex gap-2">
                    <input 
                      type="url"
                      value={newSlide.image}
                      onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                      placeholder="ألصق رابط الصورة هنا (https://...)"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-4 flex items-center gap-2">
                    <label className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>رفع من الجهاز</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (loadEvt) => {
                            const dataUrl = loadEvt.target?.result as string;
                            if (dataUrl) setNewSlide(prev => ({ ...prev, image: dataUrl }));
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                {/* Preset Banner Images */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-2 font-bold">
                    أو اختر صورة جاهزة عالية الجودة بنقرة واحدة:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { label: 'كرت RTX 4090 STRIX ألترا', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=85' },
                      { label: 'مجمع حواسيب RGB احترافي', url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=85' },
                      { label: 'لابتوب ألعاب ROG SCAR 18', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=85' },
                      { label: 'شاشة ألعاب سامسونج OLED كيرف', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=85' },
                      { label: 'معالجات رايزن AM5 الجيل الجديد', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1600&q=85' },
                      { label: 'كيس ليان لي البانورامي مع تبريد مائي', url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1600&q=85' },
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewSlide(prev => ({ ...prev, image: sample.url }))}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-[10px] whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>➕ {sample.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Box */}
                {newSlide.image && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-[21/9] max-h-48 bg-slate-950 mt-2">
                    <img 
                      src={newSlide.image} 
                      alt="معاينة الشريحة" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded-md border border-slate-700">
                        معاينة الصورة الحالية للسلايدر
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <label className="font-bold text-xs text-blue-400 block">
                  2. النصوص والأزرار المرافقة للصورة:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 text-xs block">العنوان الرئيسي للشريحة *</label>
                    <input 
                      type="text"
                      required
                      value={newSlide.titleMain}
                      onChange={(e) => setNewSlide({ ...newSlide, titleMain: e.target.value })}
                      placeholder="مثال: أداء استثنائي للألعاب وصناعة المحتوى"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 text-xs block">التصنيف العلوي (Kicker / Tag)</label>
                    <input 
                      type="text"
                      value={newSlide.kicker}
                      onChange={(e) => setNewSlide({ ...newSlide, kicker: e.target.value })}
                      placeholder="مثال: عروض كروت الشاشة · GEFORCE RTX 40"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 text-xs block">العنوان الفرعي أو التوضيحي</label>
                    <input 
                      type="text"
                      value={newSlide.titleSub}
                      onChange={(e) => setNewSlide({ ...newSlide, titleSub: e.target.value })}
                      placeholder="مثال: كروت RTX 4090 / 4080 Super وتجميعات الجيل الرابع عشر"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 text-xs block">تفاصيل العرض (الوصف)</label>
                    <textarea 
                      rows={2}
                      value={newSlide.description}
                      onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                      placeholder="مثال: نجهز لك أقوى الحواسيب المكتبية بقطع أصلية 100% مع فحص حراري شامل وضمان استبدال محلي..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 text-xs block">وجهة زر الشريحة</label>
                    <select
                      value={newSlide.primaryCtaAction}
                      onChange={(e) => setNewSlide({ ...newSlide, primaryCtaAction: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="prebuilts">تصفح التجميعات الجاهزة</option>
                      <option value="builder">مجمع الحاسوب (PC Builder)</option>
                      <option value="laptops">استعراض لابتوبات الألعاب</option>
                      <option value="products">تصفح كافة قطع الكتالوج</option>
                      <option value="whatsapp">مراسلة واتساب فورية</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 text-xs block">نص الزر التفاعلي</label>
                    <input 
                      type="text"
                      value={newSlide.primaryCtaText}
                      onChange={(e) => setNewSlide({ ...newSlide, primaryCtaText: e.target.value })}
                      placeholder="تصفح التجميعات الجاهزة"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Add Slide */}
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة هذه الشريحة للسلايدر</span>
                </button>
              </div>
            </form>

            {/* List of Current Slides */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <h3 className="font-black text-sm text-white">
                    الشرائح المعروضة حالياً بالسلايدر ({slidesList.length} شرائح)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  استخدم الأسهم ⬆️ و ⬇️ لتغيير ترتيب ظهور الشرائح
                </span>
              </div>

              <div className="space-y-3">
                {slidesList.map((slide, idx) => (
                  <div 
                    key={slide.id || idx}
                    className="p-4 bg-[#090d16] border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    {/* Thumbnail & Text Info */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <img 
                          src={slide.image} 
                          alt={slide.titleMain} 
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-mono font-bold">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        {slide.kicker && (
                          <span className="text-[10px] text-blue-400 font-bold block truncate">
                            {slide.kicker}
                          </span>
                        )}
                        <h4 className="text-xs sm:text-sm font-black text-white truncate">
                          {slide.titleMain}
                        </h4>
                        {slide.titleSub && (
                          <p className="text-[11px] text-slate-400 truncate">
                            {slide.titleSub}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Controls & Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSlide(idx, 'up')}
                        title="تحريك لأعلى (للأمام)"
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          idx === 0 
                            ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                        }`}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === slidesList.length - 1}
                        onClick={() => handleMoveSlide(idx, 'down')}
                        title="تحريك لأسفل (للخلف)"
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          idx === slidesList.length - 1 
                            ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                        }`}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(slide.id)}
                        title="حذف الشريحة"
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Save Action */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleSaveHeroSlides}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>تطبيق وحفظ جميع شرائح السلايدر للمتجر</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB: THEME & BUTTON APPEARANCE CUSTOMIZER */}
        {activeAdminTab === 'theme' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      <Palette className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      تخصيص مظهر وألوان الأزرار والهوية البصرية
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300">
                    اختر اللون المفضل للأزرار التفاعلية ونمط الحواف والتوهج النيون ليتم تطبيقه فوراً على كامل أقسام المتجر.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveTheme()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق المظهر فوراً</span>
                </button>
              </div>

              {themeSaveSuccess && (
                <div className="mt-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم حفظ وتطبيق المظهر البصري للأزرار بنجاح على المتجر!</span>
                </div>
              )}

              {/* LIVE COMPONENT PREVIEW */}
              <div className="mt-6 p-5 sm:p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-300 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>معاينة حية لشكل الأزرار في المتجر الآن:</span>
                  </span>
                  <span className="text-[11px] text-blue-400 font-tech">
                    {currentTheme.themePresetName || 'لون مخصص'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {/* Primary CTA Preview */}
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentTheme.primaryColor,
                      boxShadow: currentTheme.buttonGlow ? `0 0 16px ${currentTheme.primaryColor}66` : undefined
                    }}
                    className={`px-5 py-2.5 text-white font-bold text-xs flex items-center gap-2 transition-all ${currentTheme.buttonRadius}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>إضافة إلى السلة</span>
                  </button>

                  {/* Cart Button Preview */}
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentTheme.primaryColor,
                      boxShadow: currentTheme.buttonGlow ? `0 0 16px ${currentTheme.primaryColor}66` : undefined
                    }}
                    className={`px-4 py-2 text-white font-bold text-xs flex items-center gap-2 transition-all ${currentTheme.buttonRadius}`}
                  >
                    <span>السلة (3)</span>
                  </button>

                  {/* PC Builder CTA Preview */}
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentTheme.primaryColor,
                      boxShadow: currentTheme.buttonGlow ? `0 0 16px ${currentTheme.primaryColor}66` : undefined
                    }}
                    className={`px-4 py-2 text-white font-bold text-xs flex items-center gap-1.5 transition-all ${currentTheme.buttonRadius}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>مجمع الحاسوب الذكي</span>
                  </button>

                  {/* Outline / Tag Preview */}
                  <div
                    style={{
                      borderColor: currentTheme.primaryColor,
                      color: currentTheme.primaryColor
                    }}
                    className={`px-3 py-1.5 border bg-slate-900/60 text-xs font-bold font-tech flex items-center gap-1 ${currentTheme.buttonRadius}`}
                  >
                    <span>تنسيق الألوان متناسق 100%</span>
                  </div>
                </div>
              </div>

              {/* PALETTES PRESETS */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-black text-sm text-white block">
                    1. لوحات الألوان الجاهزة (Presets):
                  </label>
                  <span className="text-[11px] text-slate-400">انقر على أي لون لتطبيقه ومعاينته فوراً</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = currentTheme.primaryColor.toLowerCase() === preset.primaryColor.toLowerCase();

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900/90 border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div 
                          style={{ backgroundColor: preset.primaryColor }}
                          className="w-10 h-10 rounded-xl shrink-0 shadow-md flex items-center justify-center text-white"
                        >
                          {isSelected && <Check className="w-5 h-5 drop-shadow" />}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white truncate">{preset.name}</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{preset.description}</p>
                          <span className="text-[10px] font-tech text-slate-500 block">{preset.primaryColor}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOM COLOR PICKER */}
              <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Custom Hex / Color Input */}
                <div className="space-y-3">
                  <label className="font-black text-sm text-white block">
                    2. اختيار لون حر مخصص (Custom Color):
                  </label>
                  <p className="text-xs text-slate-400">
                    يمكنك اختيار أي درجة لون ترغب بها بواسطة منتقي الألوان أو كتابة رمز الـ Hex.
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="color"
                      value={currentTheme.primaryColor}
                      onChange={(e) => {
                        const updated = {
                          ...currentTheme,
                          primaryColor: e.target.value,
                          themePresetName: 'لون مخصص'
                        };
                        setCurrentTheme(updated);
                        onUpdateThemeConfig(updated);
                      }}
                      className="w-12 h-12 rounded-xl bg-transparent border-2 border-slate-700 cursor-pointer p-0.5"
                    />

                    <div className="flex-1 space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 block">رمز اللون (Hex Code):</label>
                      <input 
                        type="text"
                        value={currentTheme.primaryColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = {
                            ...currentTheme,
                            primaryColor: val,
                            themePresetName: 'لون مخصص'
                          };
                          setCurrentTheme(updated);
                          if (val.startsWith('#') && (val.length === 7 || val.length === 4)) {
                            onUpdateThemeConfig(updated);
                          }
                        }}
                        placeholder="#2563eb"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-tech text-slate-100 uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Button Radius Selector */}
                <div className="space-y-3">
                  <label className="font-black text-sm text-white block">
                    3. نمط واستدارة حواف الأزرار (Border Radius):
                  </label>
                  <p className="text-xs text-slate-400">
                    حدد درجة انحناء حواف الأزرار لتطابق الذوق المطلوب:
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'rounded-md', name: 'حواف كلاسيكية', preview: 'rounded-md' },
                      { id: 'rounded-lg', name: 'حواف أنيقة', preview: 'rounded-lg' },
                      { id: 'rounded-xl', name: 'ناعمة (موصى بها)', preview: 'rounded-xl' },
                      { id: 'rounded-2xl', name: 'عصرية حديثة', preview: 'rounded-2xl' },
                      { id: 'rounded-full', name: 'كبسولة دائرية', preview: 'rounded-full' },
                    ].map((rad) => {
                      const isSel = currentTheme.buttonRadius === rad.id;

                      return (
                        <button
                          key={rad.id}
                          type="button"
                          onClick={() => {
                            const updated = { ...currentTheme, buttonRadius: rad.id as any };
                            setCurrentTheme(updated);
                            onUpdateThemeConfig(updated);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="text-xs block">{rad.name}</span>
                          <span className={`inline-block w-8 h-2.5 mt-1.5 bg-slate-600 ${rad.preview}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Glow Toggle */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-white block">تأثير توهج النيون للأزرار (Neon Glow RGB)</span>
                  <p className="text-[11px] text-slate-400">إضافة هالة ضوئية نيون خفيفة تحاكي إضاءة صناديق وتجميعات الألعاب</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={currentTheme.buttonGlow} 
                    onChange={(e) => {
                      const updated = { ...currentTheme, buttonGlow: e.target.checked };
                      setCurrentTheme(updated);
                      onUpdateThemeConfig(updated);
                    }}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Final Save */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveTheme()}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl shadow-xl shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>تأكيد وحفظ المظهر للمتجر</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB: STORE INTRO VIDEOS MANAGER */}
        {activeAdminTab === 'videos' && (
          <div className="space-y-6">
            
            {/* Header info & Homepage Display Toggle */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Play className="w-5 h-5 fill-amber-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      إدارة الفيديوهات التعريفية لمكتب القمر
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300">
                    يمكنك إضافة فيديوهات يوتيوب أو فيديوهات MP4 توضح صالة العرض، طرق التجميع، وفحص الضمان بالسيريال.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetDefaultVideos}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>استعادة الفيديوهات الافتراضية</span>
                </button>
              </div>

              {/* Homepage Video Section Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-950/80 rounded-2xl border border-amber-500/30">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">ظهور قسم الفيديوهات التعريفية في الصفحة الرئيسية للمتجر</span>
                    <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-tech">
                      Store Video Section
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    عند التفعيل، يظهر قسم "تعرّف على مكتب القمر لتكنولوجيا الحاسوب" تلقائياً لجميع الزبائن مع الفصول وقائمة التشغيل.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    checked={tempHomeSections.showStoreVideo} 
                    onChange={(e) => {
                      const updated = { ...tempHomeSections, showStoreVideo: e.target.checked };
                      setTempHomeSections(updated);
                      onUpdateHomeSections(updated);
                    }}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {videoSaveSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم حفظ وتحديث الفيديوهات التعريفية بنجاح!</span>
                </div>
              )}

              {/* ADD / EDIT VIDEO FORM */}
              <form onSubmit={handleAddOrUpdateVideo} className="p-5 sm:p-6 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-black text-sm text-amber-400 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>{editingVideoId ? 'تعديل الفيديو التعريفي' : 'إضافة فيديو تعريفي جديد'}</span>
                  </h3>
                  {editingVideoId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVideoId(null);
                        setVideoForm({
                          titleAr: '',
                          durationAr: '1:45 دقيقة',
                          descriptionAr: '',
                          thumbnail: '',
                          videoUrl: ''
                        });
                      }}
                      className="text-xs text-rose-400 hover:underline cursor-pointer"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 block">عنوان الفيديو *</label>
                    <input 
                      type="text"
                      required
                      value={videoForm.titleAr}
                      onChange={(e) => setVideoForm({ ...videoForm, titleAr: e.target.value })}
                      placeholder="مثال: جولة داخل معرض مكتب القمر وفحص كروت الشاشة"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-bold focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">رابط الفيديو (YouTube أو رابط MP4 مباشر)</label>
                    <input 
                      type="text"
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      placeholder="مثال: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-tech focus:border-amber-500"
                    />
                    <span className="text-[10px] text-slate-500 block">يمكن وضع رابط فيديو YouTube وسيعمل تلقائياً كـ مشغل تفاعلي</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">مدة الفيديو التقديرية</label>
                    <input 
                      type="text"
                      value={videoForm.durationAr}
                      onChange={(e) => setVideoForm({ ...videoForm, durationAr: e.target.value })}
                      placeholder="مثال: 2:15 دقيقة"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-tech focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 block">صورة الغلاف (Thumbnail URL)</label>
                    <input 
                      type="text"
                      value={videoForm.thumbnail}
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-tech focus:border-amber-500"
                    />
                    
                    {/* Quick Preset Showroom Images */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                      <span>أو اختر صورة جاهزة:</span>
                      {[
                        { label: 'صالة العرض', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80' },
                        { label: 'تجميع البي سي', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80' },
                        { label: 'كروت الشاشة', url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&auto=format&fit=crop&q=80' },
                        { label: 'الشحن والتوصيل', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80' },
                      ].map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setVideoForm({ ...videoForm, thumbnail: item.url })}
                          className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-[10px] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-300 block">الوصف التوضيحي للفيديو</label>
                    <textarea 
                      rows={2}
                      value={videoForm.descriptionAr}
                      onChange={(e) => setVideoForm({ ...videoForm, descriptionAr: e.target.value })}
                      placeholder="تفقّد أحدث كروت الشاشة، اللابتوبات، والشاشات المعروضة في صالتنا الرئيسية ببغداد..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 focus:border-amber-500"
                    />
                  </div>

                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingVideoId ? 'حفظ تعديلات الفيديو' : 'إضافة هذا الفيديو للقائمة'}</span>
                  </button>
                </div>
              </form>

              {/* LIST OF CURRENT VIDEOS */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-amber-400" />
                    <span>قائمة الفيديوهات المعروضة حالياً ({videosList.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">يمكنك استخدام الأسهم لإعادة الترتيب</span>
                </div>

                <div className="space-y-2.5">
                  {videosList.map((video, idx) => (
                    <div 
                      key={video.id || idx}
                      className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                          <img src={video.thumbnail} alt={video.titleAr} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-tech font-bold">
                              فصل {idx + 1}
                            </span>
                            <span className="text-[11px] text-slate-400 font-tech">{video.durationAr}</span>
                            {video.videoUrl && (
                              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded font-tech truncate max-w-[120px]">
                                {video.videoUrl.includes('youtu') ? 'YouTube 📺' : 'MP4 🎥'}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-white truncate">{video.titleAr}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{video.descriptionAr}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleMoveVideo(idx, 'up')}
                          disabled={idx === 0}
                          title="تحريك لأعلى"
                          className={`p-2 rounded-xl border text-xs cursor-pointer ${
                            idx === 0 ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                          }`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveVideo(idx, 'down')}
                          disabled={idx === videosList.length - 1}
                          title="تحريك لأسفل"
                          className={`p-2 rounded-xl border text-xs cursor-pointer ${
                            idx === videosList.length - 1 ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                          }`}
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartEditVideo(video)}
                          title="تعديل الفيديو"
                          className="p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(video.id)}
                          title="حذف الفيديو"
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Save All Videos Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateVideos(videosList);
                      setVideoSaveSuccess(true);
                      setTimeout(() => setVideoSaveSuccess(false), 3000);
                    }}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ وتطبيق جميع الفيديوهات على المتجر</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: HOMEPAGE SECTIONS CUSTOMIZER */}
        {activeAdminTab === 'homepage' && (
          <div className="max-w-4xl mx-auto bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Layout className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-lg font-black text-white">التحكم في كافة أجزاء وأقسام الصفحة</h2>
                  <p className="text-xs text-slate-400">
                    يمكنك إظهار أو إخفاء أي جزء في المتجر، وتعديل نصوص البنرات الترويجية والإعلانات بنقرة واحدة.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allEnabled: HomePageSectionsConfig = {
                      ...tempHomeSections,
                      showPromoBanner: true,
                      showHeroBanner: true,
                      showQuickCategoriesNav: true,
                      showFlashSale: true,
                      showBestSellers: true,
                      showNewArrivals: true,
                      showBuyTogetherBundles: true,
                      showRecommended: true,
                      showDeliveryMap: true,
                      showCustomerStories: true,
                      showTestimonials: true,
                      showStoreVideo: true,
                      showSocialMediaFeed: true,
                      showTechBlog: true,
                      showFAQ: true,
                    };
                    setTempHomeSections(allEnabled);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  إظهار كل الأقسام
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const minimal: HomePageSectionsConfig = {
                      ...tempHomeSections,
                      showPromoBanner: false,
                      showHeroBanner: true,
                      showQuickCategoriesNav: true,
                      showFlashSale: false,
                      showBestSellers: false,
                      showNewArrivals: false,
                      showBuyTogetherBundles: false,
                      showRecommended: false,
                      showDeliveryMap: false,
                      showCustomerStories: false,
                      showTestimonials: false,
                      showStoreVideo: false,
                      showSocialMediaFeed: false,
                      showTechBlog: false,
                      showFAQ: true,
                    };
                    setTempHomeSections(minimal);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  الوضع الهادئ
                </button>

                <button
                  onClick={handleSaveHomeSections}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق</span>
                </button>
              </div>
            </div>

            {/* Promo Banner Text Editor */}
            <div className="bg-[#090d16] border border-blue-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-blue-400 block">
                  📢 نص شريط الإعلانات الترويجي العلوي (Announcement Bar):
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox"
                    checked={Boolean(tempHomeSections.showPromoBanner)}
                    onChange={(e) => setTempHomeSections({ ...tempHomeSections, showPromoBanner: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span className="font-bold">تفعيل الشريط العلوي</span>
                </label>
              </div>
              <input
                type="text"
                value={tempHomeSections.promoBannerText}
                onChange={(e) => setTempHomeSections({ ...tempHomeSections, promoBannerText: e.target.value })}
                placeholder="اكتب العرض أو الإعلان هنا..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Sections Toggles Grid */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-300 block">
                تبديل ظهور أجزاء الصفحة الرئيسية:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'showPromoBanner', label: '📢 شريط الإعلانات الترويجي العلوي', desc: 'شريط أحمر/أزرق بأعلى الموقع لعروض التوصيل والخصومات' },
                  { key: 'showHeroBanner', label: '🌟 البنر الرئيسي (Hero Showcase)', desc: 'السلايدر التفاعلي لكروت الشاشة والتجميعات' },
                  { key: 'showQuickCategoriesNav', label: '📂 شريط الأقسام السريع (Quick Categories)', desc: 'أيقونات الوصول المباشر لكروت الشاشة، المعالجات، واللابتوبات' },
                  { key: 'showFlashSale', label: '⚡ شريط التخفيضات السريعة (Flash Sale)', desc: 'عروض محدودة بوقت تنازلي على قطع مختارة' },
                  { key: 'showBestSellers', label: '🏆 قسم الأكثر مبيعاً (Best Sellers)', desc: 'القطع والتجميعات الأكثر طلباً في فرع الصناعة' },
                  { key: 'showNewArrivals', label: '✨ قسم الواصل حديثاً (New Arrivals)', desc: 'أحدث القطع التي وصلت لمعرض مكتب القمر' },
                  { key: 'showBuyTogetherBundles', label: '🧩 باقات وفر أكثر معاً (Hardware Bundles)', desc: 'تجميعات معالج + بورد + رام بسعر مخفض' },
                  { key: 'showRecommended', label: '🤖 قسم التوصيات الذكية (AI Picks)', desc: 'اقتراحات مخصصة بناءً على سلوك الزبون' },
                  { key: 'showDeliveryMap', label: '🗺️ خريطة الشحن والتوصيل للمحافظات', desc: 'معلومات الشحن السريع لكافة المحافظات العراقية' },
                  { key: 'showCustomerStories', label: '⭐ تجارب وقصص زبائن المعرض', desc: 'صور تجميعات الزبائن وتجاربهم الموثقة' },
                  { key: 'showTestimonials', label: '💬 آراء وتقييمات زبائن شارع الصناعة', desc: 'مراجعات وتقييمات نجوم من المشترين' },
                  { key: 'showStoreVideo', label: '🎬 فيديو جولة المعرض وورشة التجميع', desc: 'جولة فيديو داخل معرض مكتب القمر وورشة التركيب' },
                  { key: 'showSocialMediaFeed', label: '📱 منشورات السوشيال ميديا الحية', desc: 'روابط ومشاركات فيسبوك وانستغرام' },
                  { key: 'showTechBlog', label: '📰 المقالات والدليل التقني (Tech Blog)', desc: 'مقالات مقارنات كروت الشاشة والمعالجات' },
                  { key: 'showFAQ', label: '❓ الأسئلة الشائعة والضمان (FAQ)', desc: 'إجابات عن الضمان، التوصيل، والدفع' },
                ].map((sec) => (
                  <div 
                    key={sec.key} 
                    className="p-3.5 bg-[#090d16] border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-200 block">{sec.label}</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">{sec.desc}</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={Boolean(tempHomeSections[sec.key as keyof HomePageSectionsConfig] ?? true)}
                        onChange={(e) => setTempHomeSections({
                          ...tempHomeSections,
                          [sec.key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {homeSaveSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>تم حفظ إعدادات وأقسام الصفحة بنجاح وتطبيقها على المتجر فوراً!</span>
              </div>
            )}

            <button
              onClick={handleSaveHomeSections}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>تطبيق التغييرات على المتجر فوراً</span>
            </button>

          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div>
                <h2 className="text-base font-black text-white">إدارة طلبات الشراء الواردة</h2>
                <p className="text-xs text-slate-400">متابعة وتحديث حالة شحن طلبات الزبائن مباشرة.</p>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 font-tech">
                {safeOrders.length} طلبات مسجلة
              </span>
            </div>

            {safeOrders.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-200">لا توجد طلبات جديدة حالياً</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  عند قيام الزبائن بإتمام عملية الشراء من السلة، ستظهر تفاصيل الطلبات هنا مباشرة.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {safeOrders.map((order) => (
                  <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white font-tech">{order.id}</span>
                          <span className="text-[10px] text-slate-400 font-tech">{new Date(order.createdAt).toLocaleString('ar-IQ')}</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          الزبون: <strong className="text-amber-400">{order.customer.fullName}</strong> • هاتف: <span className="font-tech text-slate-200">{order.customer.phoneNumber}</span> • {order.customer.province} ({order.customer.cityOrArea})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="bg-slate-950 border border-slate-700 text-xs text-amber-400 font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                        >
                          <option value="pending">⏳ معلق للتجهيز</option>
                          <option value="processing">⚙️ قيد الفحص والتركيب</option>
                          <option value="shipped">🚚 تم الشحن للمحافظة</option>
                          <option value="completed">✅ تم التسليم بنجاح</option>
                          <option value="cancelled">❌ ملغي</option>
                        </select>

                        <a
                          href={`https://wa.me/${order.customer.phoneNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>واتساب</span>
                        </a>
                      </div>
                    </div>

                    {/* Ordered Items Summary */}
                    <div className="bg-slate-950/80 rounded-xl p-3 divide-y divide-slate-800/60 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-1.5 flex items-center justify-between text-slate-300">
                          <span>{item.name} × {item.quantity}</span>
                          <span className="font-tech font-bold text-amber-400">
                            {order.currency === 'IQD' ? `${item.priceIQD.toLocaleString()} د.ع` : `$${item.priceUSD}`}
                          </span>
                        </div>
                      ))}
                      
                      <div className="pt-2 flex items-center justify-between font-black text-white text-xs">
                        <span>إجمالي الطلب:</span>
                        <span className="text-amber-400 font-tech text-sm">
                          {order.currency === 'IQD' ? `${order.totalIQD.toLocaleString()} د.ع` : `$${order.totalUSD}`}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 5: STORE SETTINGS & SECURITY */}
        {activeAdminTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Store Contact & General Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>بيانات المعرض والاتصال</span>
              </h3>

              <form onSubmit={handleSaveStoreInfo} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">اسم المعرض بالعربية:</label>
                  <input
                    type="text"
                    value={tempStoreInfo.name}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">رقم الهاتف الرسمي:</label>
                  <input
                    type="text"
                    value={tempStoreInfo.phone}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">رقم الواتساب للطلبات:</label>
                  <input
                    type="text"
                    value={tempStoreInfo.whatsapp}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">عنوان المعرض التفصيلي:</label>
                  <input
                    type="text"
                    value={tempStoreInfo.addressDetails}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, addressDetails: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">ساعات العمل:</label>
                  <input
                    type="text"
                    value={tempStoreInfo.workingHours}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, workingHours: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                  />
                </div>

                {storeSaveSuccess && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                    تم حفظ بيانات المعرض بنجاح!
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md"
                >
                  حفظ بيانات المتجر
                </button>
              </form>
            </div>

            {/* Admin Security PIN Control */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>أمان ورمز دخول لوحة المدير</span>
              </h3>

              <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">اسم مستخدم المدير (Username):</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="مثال: admin"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                  />
                  <span className="text-[10px] text-slate-500 block">اسم المستخدم الحالي: {currentAdminUser}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">كلمة المرور الجديدة (New Password):</label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="اتركه فارغاً إذا كنت لا ترغب بتغيير كلمة المرور"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-tech"
                  />
                </div>

                {credErrorMsg && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
                    {credErrorMsg}
                  </div>
                )}

                {credSuccessMsg && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                    تم تحديث بيانات دخول المدير (اسم المستخدم وكلمة المرور) بنجاح!
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  حفظ بيانات دخول المدير
                </button>
              </form>

              {/* Reset to Factory Defaults Option */}
              <div className="pt-6 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">إعادة ضبط المصنع للكتالوج:</span>
                <p className="text-[11px] text-slate-500">
                  إذا أردت استعادة قائمة المنتجات والأسعار الأصلية في أي وقت.
                </p>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من رغبتك في مسح التعديلات المحلية واستعادة الكتالوج الافتراضي؟')) {
                      localStorage.removeItem('alqamar_admin_products');
                      localStorage.removeItem('alqamar_admin_store');
                      localStorage.removeItem('alqamar_admin_home_sections');
                      window.location.reload();
                    }
                  }}
                  className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الكتالوج الافتراضي</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
