import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  TrendingUp, 
  Heart, 
  Eye, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Star,
  Compass,
  Filter,
  Mouse,
  Laptop,
  Cpu
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface RecommendedProductsProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  onToggleFavorite: (product: Product) => void;
  activeCategory?: ProductCategory;
  recentlyViewedIds?: string[];
}

type RecommendationTab = 'personalized' | 'bestsellers' | 'top_gaming' | 'top_deals';

type UserGoal = 'all' | '4k_gaming' | 'editing' | 'laptops' | 'budget' | 'accessories';

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  products,
  currency,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleFavorite,
  activeCategory = 'all',
  recentlyViewedIds = []
}) => {
  const [activeTab, setActiveTab] = useState<RecommendationTab>('personalized');
  const [userGoal, setUserGoal] = useState<UserGoal>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track user's viewed category preferences from localStorage
  const [favoriteCategory, setFavoriteCategory] = useState<string | null>(() => {
    try {
      return localStorage.getItem('alqamar_fav_cat') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      try {
        localStorage.setItem('alqamar_fav_cat', activeCategory);
        setFavoriteCategory(activeCategory);
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeCategory]);

  const isWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  // Filter products according to selected tab and user behavior
  const getFilteredRecommendations = (): { product: Product; reasonBadge: string; reasonColor: string }[] => {
    if (!products || products.length === 0) return [];

    let pool = [...products];

    // Filter by user interactive goal first if selected
    if (userGoal === '4k_gaming') {
      pool = pool.filter(p => (p.gamingScore && p.gamingScore >= 90) || p.category === 'gpus' || p.category === 'prebuilt_pcs');
    } else if (userGoal === 'editing') {
      pool = pool.filter(p => p.category === 'cpus' || p.category === 'ram' || (p.specs?.vram && p.specs.vram.includes('16GB')) || p.category === 'prebuilt_pcs');
    } else if (userGoal === 'laptops') {
      pool = pool.filter(p => p.category === 'laptops');
    } else if (userGoal === 'budget') {
      pool = pool.filter(p => p.priceUSD < 600);
    } else if (userGoal === 'accessories') {
      pool = pool.filter(p => p.category === 'accessories' || p.category === 'monitors');
    }

    if (activeTab === 'personalized') {
      // Prioritize recently viewed categories or saved favorite category
      let items = pool.map(p => {
        let score = 0;
        let badge = 'مقترح حسب تصفحك 🎯';
        let color = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';

        if (favoriteCategory && p.category === favoriteCategory) {
          score += 50;
          badge = 'بناءً على اهتمامك الأخير 🎯';
          color = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
        }

        if (recentlyViewedIds.includes(p.id)) {
          score += 30;
          badge = 'شاهدته مؤخراً 👁️';
          color = 'bg-purple-500/15 text-purple-400 border-purple-500/30';
        }

        if (p.isBestSeller) {
          score += 20;
          badge = badge === 'مقترح حسب تصفحك 🎯' ? 'الأكثر طلباً + مناسب لك 🔥' : badge;
        }

        if (p.featured) {
          score += 15;
        }

        return { product: p, score, reasonBadge: badge, reasonColor: color };
      });

      items.sort((a, b) => b.score - a.score);
      return items.slice(0, 8).map(i => ({ product: i.product, reasonBadge: i.reasonBadge, reasonColor: i.reasonColor }));
    }

    if (activeTab === 'bestsellers') {
      const bests = pool
        .filter(p => p.isBestSeller || p.reviewsCount > 15 || p.rating >= 4.8)
        .sort((a, b) => (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating))
        .slice(0, 8);

      return bests.map(p => ({
        product: p,
        reasonBadge: '🔥 الأكثر مبيعاً بشارع الصناعة',
        reasonColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
      }));
    }

    if (activeTab === 'top_gaming') {
      const topGaming = pool
        .filter(p => p.gamingScore)
        .sort((a, b) => (b.gamingScore || 0) - (a.gamingScore || 0))
        .slice(0, 8);

      return topGaming.map(p => ({
        product: p,
        reasonBadge: `⚡ أداء ألعاب ${p.gamingScore}/100`,
        reasonColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      }));
    }

    if (activeTab === 'top_deals') {
      const deals = pool
        .filter(p => p.originalPriceUSD && p.originalPriceUSD > p.priceUSD)
        .sort((a, b) => {
          const discA = (a.originalPriceUSD || 0) - a.priceUSD;
          const discB = (b.originalPriceUSD || 0) - b.priceUSD;
          return discB - discA;
        })
        .slice(0, 8);

      return deals.map(p => ({
        product: p,
        reasonBadge: '🏷️ أقوى نسبة توفير',
        reasonColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      }));
    }

    return pool.slice(0, 8).map(p => ({
      product: p,
      reasonBadge: '⭐ تجميعة مختارة',
      reasonColor: 'bg-slate-800 text-slate-300 border-slate-700'
    }));
  };

  const recommendations = getFilteredRecommendations();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const formatPrice = (usd: number, iqd: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    return `${iqd.toLocaleString()} د.ع`;
  };

  if (recommendations.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none my-2">
      
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        
        {/* Glow Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          
          {/* Title & Description */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                منتجات مقترحة لك خصيصاً
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              توصيات ذكية تم تحليلها بناءً على اهتماماتك وتصفحك الأخير والمنتجات الأكثر طلباً في شارع الصناعة.
            </p>
          </div>

          {/* Dynamic Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('personalized')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'personalized'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>مقترحة لك 🎯</span>
            </button>

            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'bestsellers'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>الأكثر مبيعاً 🔥</span>
            </button>

            <button
              onClick={() => setActiveTab('top_gaming')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'top_gaming'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>أعلى أداء قيمنق ⚡</span>
            </button>

            <button
              onClick={() => setActiveTab('top_deals')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'top_deals'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>أقوى العروض 🏷️</span>
            </button>
          </div>

        </div>

        {/* Quick Goal Selector Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold ml-2">تخصيص اقتراحك:</span>
          
          <button
            onClick={() => setUserGoal('all')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              userGoal === 'all'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            الجميع
          </button>

          <button
            onClick={() => setUserGoal('4k_gaming')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              userGoal === '4k_gaming'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🎮 ألعاب 4K و Ultra
          </button>

          <button
            onClick={() => setUserGoal('editing')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              userGoal === 'editing'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🎬 مونتاج ورندر 8K
          </button>

          <button
            onClick={() => setUserGoal('laptops')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              userGoal === 'laptops'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            💻 لابتوبات محمولة
          </button>

          <button
            onClick={() => setUserGoal('budget')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              userGoal === 'budget'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            💰 ميزانية اقتصادية
          </button>
        </div>

      </div>

      {/* Recommended Products Horizontal Scroll Container */}
      <div className="relative group/carousel">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          aria-label="تمرير لليسامر"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 shadow-2xl transition-all duration-200 opacity-90 group-hover/carousel:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          aria-label="تمرير لليمين"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 shadow-2xl transition-all duration-200 opacity-90 group-hover/carousel:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {recommendations.map(({ product, reasonBadge, reasonColor }) => {
            const fav = isWishlisted(product.id);
            const isAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="w-[280px] sm:w-[310px] shrink-0 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer group/card relative"
              >
                {/* Recommendation Reason Tag */}
                <div className="mb-2.5 flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${reasonColor}`}>
                    {reasonBadge}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product);
                    }}
                    title={fav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                    className={`p-1.5 rounded-lg border transition-all ${
                      fav
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Image Frame */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-3">
                  <img 
                    src={product.image} 
                    alt={product.nameAr}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {product.gamingScore && (
                    <div className="absolute top-2 left-2 bg-amber-500/90 text-slate-950 text-[10px] font-black font-tech px-2 py-0.5 rounded shadow">
                      FPS {product.gamingScore}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-1 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>عرض التفاصيل</span>
                    </span>
                  </div>
                </div>

                {/* Title & Brand */}
                <div className="space-y-1 mb-3 text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-tech">
                    {product.brand}
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover/card:text-amber-400 transition-colors">
                    {product.nameAr}
                  </h3>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold font-tech text-white">{product.rating}</span>
                  </div>
                  <span className="text-[11px]">({product.reviewsCount} تقييم)</span>
                  <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mr-auto">
                    متوفر بالفرع
                  </span>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-amber-400 font-tech">
                      {formatPrice(product.priceUSD, product.priceIQD)}
                    </div>
                    {product.originalPriceUSD && (
                      <div className="text-[10px] text-slate-500 line-through font-tech">
                        {formatPrice(product.originalPriceUSD, product.originalPriceIQD || product.originalPriceUSD * 1520)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCartClick(e, product)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تمت الإضافة!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>شراء</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
