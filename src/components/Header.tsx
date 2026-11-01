import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Phone, 
  MapPin, 
  Wrench, 
  Sparkles, 
  Laptop, 
  Layers, 
  Flame, 
  Clock, 
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Cpu,
  CircuitBoard,
  HardDrive,
  Zap,
  Fan,
  Box,
  Monitor,
  Headphones,
  LayoutGrid,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Heart,
  User,
  Lock
} from 'lucide-react';
import { ProductCategory, Product, StoreInfo } from '../types';

interface HeaderProps {
  storeInfo: StoreInfo;
  currency: 'IQD' | 'USD';
  onCurrencyToggle: () => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  userName?: string;
  onOpenAIAdvisor: () => void;
  onOpenLocation: () => void;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  activeTab: 'store' | 'pc-builder' | 'prebuilt' | 'laptops' | 'admin';
  onSelectTab: (tab: 'store' | 'pc-builder' | 'prebuilt' | 'laptops' | 'admin') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  storeInfo,
  currency,
  onCurrencyToggle,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenAccount,
  userName = 'حسابي',
  onOpenAIAdvisor,
  onOpenLocation,
  activeCategory,
  onSelectCategory,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  products = [],
  onSelectProduct,
  onOpenAdmin,
  isAdminLoggedIn = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState<ProductCategory>('all');
  const logoClickCountRef = useRef<number>(0);
  const logoClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close search popup & dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDepartmentsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Secret manager trigger via 4 quick clicks on store logo
  const handleLogoClick = () => {
    onSelectTab('store');
    onSelectCategory('all');

    logoClickCountRef.current += 1;
    if (logoClickTimerRef.current) {
      clearTimeout(logoClickTimerRef.current);
    }
    if (logoClickCountRef.current >= 4) {
      logoClickCountRef.current = 0;
      if (onOpenAdmin) onOpenAdmin();
    } else {
      logoClickTimerRef.current = setTimeout(() => {
        logoClickCountRef.current = 0;
      }, 1200);
    }
  };

  // Filter products for the live smart search dropdown
  const liveSearchResults = searchQuery.trim() ? products.filter(p => {
    if (selectedSearchCat !== 'all' && p.category !== selectedSearchCat) return false;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameAr.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.descriptionAr.toLowerCase().includes(q) ||
      (p.specs.vram && String(p.specs.vram).toLowerCase().includes(q)) ||
      (p.specs.socket && String(p.specs.socket).toLowerCase().includes(q)) ||
      (p.specs.capacity && String(p.specs.capacity).toLowerCase().includes(q))
    );
  }).slice(0, 5) : [];

  const departments: { id: ProductCategory; nameAr: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', nameAr: 'جميع الأقسام', icon: <LayoutGrid className="w-4 h-4 text-blue-400" />, count: products.length },
    { id: 'gpus', nameAr: 'كروت الشاشة', icon: <Cpu className="w-4 h-4 text-sky-400" />, count: products.filter(p => p.category === 'gpus').length },
    { id: 'cpus', nameAr: 'المعالجات', icon: <Cpu className="w-4 h-4 text-indigo-400" />, count: products.filter(p => p.category === 'cpus').length },
    { id: 'motherboards', nameAr: 'اللوحات الأم', icon: <CircuitBoard className="w-4 h-4 text-blue-400" />, count: products.filter(p => p.category === 'motherboards').length },
    { id: 'ram', nameAr: 'الذاكرة العشوائية', icon: <Layers className="w-4 h-4 text-sky-400" />, count: products.filter(p => p.category === 'ram').length },
    { id: 'storage', nameAr: 'وحدات التخزين SSD', icon: <HardDrive className="w-4 h-4 text-indigo-400" />, count: products.filter(p => p.category === 'storage').length },
    { id: 'power_supplies', nameAr: 'مزودات الطاقة', icon: <Zap className="w-4 h-4 text-blue-400" />, count: products.filter(p => p.category === 'power_supplies').length },
    { id: 'cooling', nameAr: 'أنظمة التبريد', icon: <Fan className="w-4 h-4 text-sky-400" />, count: products.filter(p => p.category === 'cooling').length },
    { id: 'cases', nameAr: 'كيسات الحاسوب', icon: <Box className="w-4 h-4 text-indigo-400" />, count: products.filter(p => p.category === 'cases').length },
    { id: 'laptops', nameAr: 'لابتوبات الألعاب', icon: <Laptop className="w-4 h-4 text-blue-400" />, count: products.filter(p => p.category === 'laptops').length },
    { id: 'monitors', nameAr: 'شاشات الألعاب', icon: <Monitor className="w-4 h-4 text-sky-400" />, count: products.filter(p => p.category === 'monitors').length },
    { id: 'accessories', nameAr: 'الملحقات والإكسسوارات', icon: <Headphones className="w-4 h-4 text-indigo-400" />, count: products.filter(p => p.category === 'accessories').length },
    { id: 'prebuilt_pcs', nameAr: 'التجميعات الجاهزة', icon: <Flame className="w-4 h-4 text-blue-400" />, count: products.filter(p => p.category === 'prebuilt_pcs').length },
  ];

  const quickTrendingTags = [
    'RTX 4090',
    'Ryzen 7 7800X3D',
    'i9-14900K',
    'ASUS ROG',
    'DDR5 32GB',
    'Samsung 990 PRO'
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800/80 w-full">
      
      {/* 1. SLIM UTILITY BAR */}
      <div className="bg-[#070a12] border-b border-slate-800/60 text-slate-400 text-[11px] py-1.5 px-3 sm:px-4 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenLocation}
              className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>بغداد - شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود 14</span>
            </button>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>السبت - الخميس (9:30 ص - 8:30 م)</span>
            </span>
            <span className="hidden md:inline text-slate-700">·</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>توصيل لكافة محافظات العراق</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-500">
              سعر الصرف: <strong className="text-slate-300 font-tech tabular-nums">{storeInfo.exchangeRate} د.ع</strong>
            </span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <a 
              href={`tel:${storeInfo.phone}`} 
              className="flex items-center gap-1 hover:text-white text-slate-300 transition-colors font-tech tabular-nums"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>{storeInfo.phone}</span>
            </a>
            <span className="text-slate-700">·</span>
            <a 
              href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent('السلام عليكم مكتب القمر، استفسار عن قطع البي سي')}`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>واتساب المبيعات</span>
            </a>
            <span className="text-slate-700">·</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>{isAdminLoggedIn ? 'لوحة الإدارة' : 'دخول المدير'}</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          
          {/* BRAND WORDMARK WITH OFFICIAL LOGO */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 text-right group focus:outline-none shrink-0 cursor-pointer"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md shadow-amber-500/20 group-hover:border-amber-300 transition-all bg-white shrink-0 p-0.5">
              <img 
                src={storeInfo.logo || "/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg"} 
                alt="كمبيوتر القمر Moon Computer" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-none">
                مكتب القمر للحاسبات
              </span>
              <span className="text-[11px] text-amber-400 font-tech block mt-1 tracking-wide">
                Moon Computer · كمبيوتر القمر
              </span>
            </div>
          </button>

          {/* SMART SEARCH BAR */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="flex w-full items-center bg-[#111827] border border-slate-800 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all overflow-hidden">
              
              <select
                value={selectedSearchCat}
                onChange={(e) => setSelectedSearchCat(e.target.value as ProductCategory)}
                className="bg-slate-900/90 text-slate-300 text-xs font-medium px-3 py-2.5 border-l border-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">كل الأقسام</option>
                <option value="gpus">كروت الشاشة</option>
                <option value="cpus">المعالجات</option>
                <option value="motherboards">اللوحات الأم</option>
                <option value="ram">الرامات</option>
                <option value="storage">التخزين</option>
                <option value="laptops">اللابتوبات</option>
                <option value="monitors">الشاشات</option>
                <option value="prebuilt_pcs">تجميعات جاهزة</option>
              </select>

              <div className="flex-1 relative flex items-center">
                <input 
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '#admin' || val === 'admin:7708') {
                      onSearchChange('');
                      setIsSearchFocused(false);
                      if (onOpenAdmin) onOpenAdmin();
                      return;
                    }
                    onSearchChange(val);
                    setIsSearchFocused(true);
                  }}
                  placeholder="ابحث عن كرت شاشة، معالج، لابتوب، أو ماركة..."
                  className="w-full bg-transparent px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />

                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    className="p-1.5 text-slate-500 hover:text-white text-xs ml-1"
                    title="مسح البحث"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="px-3.5 py-2 text-slate-400">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* LIVE SMART SEARCH DROPDOWN */}
            {isSearchFocused && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl p-4 z-50">
                {!searchQuery ? (
                  <div className="space-y-2.5 text-right">
                    <div className="text-xs font-medium text-slate-400">
                      عمليات البحث الشائعة:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {quickTrendingTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            onSearchChange(tag);
                            setIsSearchFocused(true);
                          }}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-blue-600/15 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-right">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                      <span className="font-bold text-white">نتائج البحث عن "{searchQuery}"</span>
                      <span className="text-blue-400 font-tech tabular-nums">{liveSearchResults.length} نتائج</span>
                    </div>

                    {liveSearchResults.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        لا توجد نتائج مطابقة لـ "{searchQuery}"
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {liveSearchResults.map((prod) => (
                          <div
                            key={prod.id}
                            className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                            onClick={() => {
                              if (onSelectProduct) onSelectProduct(prod);
                              setIsSearchFocused(false);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                                <img src={prod.image} alt={prod.nameAr} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 font-tech uppercase">
                                  {prod.brand}
                                </span>
                                <h4 className="text-xs font-bold text-white line-clamp-1">
                                  {prod.nameAr}
                                </h4>
                              </div>
                            </div>

                            <div className="text-left shrink-0">
                              <div className="text-xs font-bold text-blue-400 font-tech tabular-nums">
                                {currency === 'IQD' ? `${prod.priceIQD.toLocaleString()} د.ع` : `$${prod.priceUSD}`}
                              </div>
                              <span className="text-[10px] text-emerald-400">
                                {prod.inStock ? 'متوفر' : 'غير متوفر'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACTION CONTROLS */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Currency Switcher */}
            <button
              onClick={onCurrencyToggle}
              title="تبديل العملة"
              className="px-3 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer font-tech tabular-nums"
            >
              {currency === 'IQD' ? 'د.ع IQD' : '$ USD'}
            </button>

            {/* AI Advisor */}
            <button
              onClick={onOpenAIAdvisor}
              title="المستشار الذكي"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-blue-400 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>مستشار التجميع</span>
            </button>

            {/* Account */}
            <button
              onClick={onOpenAccount}
              title="حسابي"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span className="hidden lg:inline">{userName}</span>
            </button>

            {/* ADMIN / MANAGER BUTTON */}
            {onOpenAdmin && (
              isAdminLoggedIn ? (
                <button
                  onClick={onOpenAdmin}
                  title="الانتقال إلى لوحة تحكم المدير"
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">لوحة الإدارة</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAdmin}
                  title="تسجيل دخول المدير (اسم المستخدم وكلمة المرور)"
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>دخول المدير</span>
                </button>
              )
            )}

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              title="المفضلة"
              className="relative flex items-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              {wishlistCount > 0 && (
                <span className="text-[11px] font-bold text-rose-400 font-tech tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              title="سلة التسوق"
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-950/40 text-white text-[11px] font-tech tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white bg-[#111827] border border-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="mt-2.5 md:hidden relative">
          <input 
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '#admin' || val === 'admin:7708') {
                onSearchChange('');
                setIsSearchFocused(false);
                if (onOpenAdmin) onOpenAdmin();
                return;
              }
              onSearchChange(val);
              setIsSearchFocused(true);
            }}
            placeholder="ابحث عن قطع، لابتوبات، شاشات..."
            className="w-full bg-[#111827] border border-slate-800 rounded-xl px-4 py-2 pr-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-2 text-slate-400 text-xs"
            >
              مسح
            </button>
          )}
        </div>

        {/* 3. CLEAN NAVIGATION BAR */}
        <nav className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3 relative z-30">
          
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* ALL DEPARTMENTS DROPDOWN (Outside overflow container to prevent clipping behind/inside) */}
            <div ref={dropdownRef} className="relative shrink-0 z-50">
              <button
                onClick={() => setDepartmentsDropdownOpen(!departmentsDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                  departmentsDropdownOpen
                    ? 'bg-blue-600 text-white shadow-blue-500/20'
                    : 'bg-[#111827] hover:bg-slate-800 text-slate-200 border border-slate-700/80'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
                <span>أقسام المتجر</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${departmentsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {departmentsDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-72 sm:w-84 bg-[#0d1322] border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-[100] ring-1 ring-white/10 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
                      <span>تصفح حسب القسم</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-tech">{departments.length} أقسام</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-80 overflow-y-auto no-scrollbar pr-0.5">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => {
                          onSelectCategory(dept.id);
                          onSelectTab(dept.id === 'prebuilt_pcs' ? 'prebuilt' : dept.id === 'laptops' ? 'laptops' : 'store');
                          setDepartmentsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between p-2 rounded-xl text-right text-xs transition-all cursor-pointer ${
                          activeCategory === dept.id
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold'
                            : 'hover:bg-slate-800/90 text-slate-300 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span>{dept.icon}</span>
                          <span className="truncate">{dept.nameAr}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-tech tabular-nums bg-slate-900/80 px-1.5 py-0.5 rounded-md">{dept.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="text-slate-800 shrink-0">|</span>

            {/* SCROLLABLE CATEGORY / NAV PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">

            {/* PRIMARY NAV TABS */}
            <button
              onClick={() => {
                onSelectTab('store');
                onSelectCategory('all');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'store'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>جميع القطع والملحقات</span>
            </button>

            <button
              onClick={() => onSelectTab('pc-builder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pc-builder'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>مجمع الحاسوب (PC Builder)</span>
            </button>

            <button
              onClick={() => onSelectTab('prebuilt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'prebuilt'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-sky-400" />
              <span>التجميعات الجاهزة</span>
            </button>

            <button
              onClick={() => onSelectTab('laptops')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'laptops'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-indigo-400" />
              <span>لابتوبات الألعاب</span>
            </button>
          </div>
        </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenLocation}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors py-1 px-2.5 rounded-lg cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>عنوان المعرض</span>
            </button>
          </div>

        </nav>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f19] border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { onSelectTab('store'); onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-right text-slate-200"
            >
              جميع القطع والملحقات
            </button>
            <button
              onClick={() => { onSelectTab('pc-builder'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-blue-600/15 border border-blue-500/30 text-blue-400 rounded-xl text-right"
            >
              مجمع الحاسوب الذكي
            </button>
            <button
              onClick={() => { onSelectTab('prebuilt'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-right text-slate-200"
            >
              التجميعات الجاهزة
            </button>
            <button
              onClick={() => { onSelectTab('laptops'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-right text-slate-200"
            >
              لابتوبات الألعاب
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => { onOpenAIAdvisor(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 border border-slate-800 text-blue-400 rounded-xl text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>مستشار التجميع الذكي</span>
            </button>

            {isAdminLoggedIn && onOpenAdmin && (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>لوحة تحكم المدير</span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
