import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Clock, 
  Zap, 
  ShoppingBag, 
  Check, 
  Tag, 
  ArrowLeft, 
  Percent, 
  ShieldAlert, 
  Eye, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';

interface FlashSaleSectionProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products,
  currency,
  onAddToCart,
  onSelectProduct
}) => {
  // Target duration: e.g. 14 hours 35 minutes 42 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  const [copiedCode, setCopiedCode] = useState(false);

  // Countdown timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter flash deal products (products with originalPriceUSD > priceUSD or marked best seller)
  const flashSaleProducts = products.filter(
    p => (p.originalPriceUSD && p.originalPriceUSD > p.priceUSD) || p.isBestSeller
  ).slice(0, 4);

  const formatPrice = (usdPrice: number, iqdPrice: number) => {
    if (currency === 'IQD') {
      return `${iqdPrice.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usdPrice.toLocaleString()}`;
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('QAMAR_FLASH');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Flash Sale Outer Box */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group/box">
        
        {/* Animated Background Rays / Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Live Countdown Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80 relative z-10">
          
          {/* Title & Badge */}
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 animate-pulse">
                <Flame className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    تخفيضات القمر السريعة (Flash Sale)
                  </h2>
                  <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    كميات محدودة جداً
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  أسعار خصم حصرية مباشرة من فرع شارع الصناعة - تنتهي صلاحية العرض عند انتهاء العداد!
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Clock Unit */}
          <div className="flex items-center gap-3 bg-slate-950/90 border border-amber-500/40 p-3.5 sm:p-4 rounded-2xl shrink-0 shadow-inner">
            <div className="text-right pl-3 border-l border-slate-800">
              <span className="text-[11px] text-amber-400 font-bold block">وينتهي العرض خلال:</span>
              <span className="text-[10px] text-slate-400 font-tech">ساعات : دقائق : ثواني</span>
            </div>

            {/* Timer Digits Display */}
            <div className="flex items-center gap-2 font-tech font-black text-white">
              
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-12 sm:w-12 sm:h-13 bg-slate-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400 shadow-md">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-slate-400 mt-1">ساعة</span>
              </div>

              <span className="text-amber-400 text-xl font-black animate-ping">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-12 sm:w-12 sm:h-13 bg-slate-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400 shadow-md">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-slate-400 mt-1">دقيقة</span>
              </div>

              <span className="text-amber-400 text-xl font-black animate-ping">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-12 sm:w-12 sm:h-13 bg-rose-500 text-white rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-lg shadow-rose-500/30">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-slate-400 mt-1">ثانية</span>
              </div>

            </div>
          </div>

        </div>

        {/* Promo Coupon Bar */}
        <div className="my-4 bg-slate-950/60 border border-slate-800 p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
          <div className="flex items-center gap-2 text-xs">
            <Tag className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300 font-bold">
              استخدم كود التخفيض المباشر للخصم عند إتمام الطلب:
            </span>
            <span className="font-tech text-amber-300 font-black px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              QAMAR_FLASH
            </span>
          </div>

          <button
            onClick={handleCopyCoupon}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
              copiedCode 
                ? 'bg-emerald-500 text-slate-950 font-black' 
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md'
            }`}
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'تم نسخ كود الخصم!' : 'نسخ كود الخصم'}</span>
          </button>
        </div>

        {/* Flash Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {flashSaleProducts.map((product, idx) => {
            const hasDiscount = product.originalPriceUSD && product.originalPriceUSD > product.priceUSD;
            const discountPercent = hasDiscount 
              ? Math.round(((product.originalPriceUSD! - product.priceUSD) / product.originalPriceUSD!) * 100)
              : 15;

            // Simulated stock level for urgency
            const stockLeft = Math.max(2, 7 - idx * 2);
            const stockPercent = Math.round((stockLeft / 10) * 100);

            return (
              <div 
                key={product.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl space-y-3 text-right group relative"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  <span>خصم {discountPercent}%</span>
                </div>

                {/* Image Container */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="aspect-square rounded-xl bg-slate-900 p-3 overflow-hidden cursor-pointer relative group/img border border-slate-800/80 flex items-center justify-center"
                >
                  <img 
                    src={product.image} 
                    alt={product.nameAr}
                    className="max-h-full max-w-full object-contain group-hover/img:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white gap-1">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>معاينة المواصفات</span>
                  </div>
                </div>

                {/* Title & Brand */}
                <div className="space-y-1">
                  <span className="text-[10px] font-tech text-amber-400 uppercase font-bold">
                    {product.brand}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {product.nameAr}
                  </h3>
                </div>

                {/* Urgency Stock Progress Bar */}
                <div className="space-y-1 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-rose-400 flex items-center gap-1">
                      <Flame className="w-3 h-3 animate-bounce" />
                      <span>متبقي {stockLeft} قطع فقط!</span>
                    </span>
                    <span className="text-slate-500">تم بيع {10 - stockLeft}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${100 - stockPercent}%` }}
                    />
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-1 flex items-baseline justify-between">
                  <div>
                    <div className="text-sm sm:text-base font-black text-amber-400 font-tech">
                      {formatPrice(product.priceUSD, product.priceIQD)}
                    </div>
                    {hasDiscount && (
                      <div className="text-[11px] text-slate-500 line-through font-tech">
                        {formatPrice(product.originalPriceUSD!, product.originalPriceIQD || (product.originalPriceUSD! * 1320))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ضمان سنة
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>شراء الآن بسعر العرض</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
