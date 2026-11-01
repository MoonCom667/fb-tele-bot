import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  Flame, 
  Sparkles, 
  ShoppingBag, 
  TrendingUp, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Activity
} from 'lucide-react';
import { Product } from '../types';

interface CurrentlyViewingSectionProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface LiveActivityFeed {
  id: string;
  locationAr: string;
  actionAr: string;
  productNameAr: string;
  timeAgoAr: string;
  viewersCount: number;
}

export const CurrentlyViewingSection: React.FC<CurrentlyViewingSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart
}) => {
  // Generate random live viewer counts for products
  const [viewerCounts, setViewerCounts] = useState<{ [key: string]: number }>({});

  // Simulated live activity feed items
  const [recentActivities, setRecentActivities] = useState<LiveActivityFeed[]>([
    {
      id: 'act-1',
      locationAr: 'بغداد - الكرخ',
      actionAr: 'يشاهد الآن',
      productNameAr: 'Intel Core i9-14900K',
      timeAgoAr: 'قبل 4 ثوانٍ',
      viewersCount: 22
    },
    {
      id: 'act-2',
      locationAr: 'البصرة - الجزائر',
      actionAr: 'أضاف السلة',
      productNameAr: 'ASUS ROG Strix RTX 4080 Super',
      timeAgoAr: 'قبل 18 ثانية',
      viewersCount: 31
    },
    {
      id: 'act-3',
      locationAr: 'أربيل - عنكاوا',
      actionAr: 'يشاهد الآن',
      productNameAr: 'AMD Ryzen 7 7800X3D',
      timeAgoAr: 'قبل 32 ثانية',
      viewersCount: 19
    }
  ]);

  // Active top viewed products (e.g. best sellers or high gaming scores)
  const topViewedProducts = products.filter(p => p.isBestSeller || p.gamingScore && p.gamingScore >= 85).slice(0, 4);

  // Initialize and update viewer counts with natural random fluctuation
  useEffect(() => {
    const initialCounts: { [key: string]: number } = {};
    topViewedProducts.forEach((p, idx) => {
      initialCounts[p.id] = 12 + ((idx * 7 + 5) % 19);
    });
    setViewerCounts(initialCounts);

    const interval = setInterval(() => {
      setViewerCounts(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          // Small random shift between -2 and +3
          const change = Math.floor(Math.random() * 6) - 2;
          next[id] = Math.max(6, Math.min(48, next[id] + change));
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (usdPrice: number, iqdPrice: number) => {
    if (currency === 'IQD') {
      return `${iqdPrice.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usdPrice.toLocaleString()}`;
  };

  if (topViewedProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Box Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center relative">
                <Eye className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>القطع والأجهزة الأكثر مشاهدة الآن</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-tech">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>نشاط حي</span>
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              تابع مع الزوار الآخرين أكثر القطع الشائعة والمطلوبة حالياً في فرع شارع الصناعة والمحافظات.
            </p>
          </div>

          {/* Live Global Counter Badge */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-300 shrink-0">
            <Users className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>يتصفح المتجر الآن:</span>
            <span className="text-amber-400 font-tech font-black text-sm">142 زبوناً</span>
          </div>

        </div>

        {/* Live Ticker Banner */}
        <div className="my-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs overflow-hidden">
          <div className="flex items-center gap-2 text-cyan-300 font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>نشاط المبيعات والتصفح الحي:</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap text-[11px] text-slate-300">
              {recentActivities.map((act) => (
                <div key={act.id} className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span className="font-bold text-white">{act.locationAr}</span>
                  <span className="text-slate-400">{act.actionAr}</span>
                  <span className="font-bold text-cyan-300 font-tech">{act.productNameAr}</span>
                  <span className="text-[10px] text-slate-500 font-tech">({act.timeAgoAr})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid with "يشاهد الآن" Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {topViewedProducts.map((product) => {
            const currentViewers = viewerCounts[product.id] || 15;

            return (
              <div
                key={product.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-3 text-right group relative"
              >
                {/* Currently Viewing Badge */}
                <div className="absolute top-3 right-3 z-10 bg-slate-950/90 border border-cyan-500/40 text-cyan-300 font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>يشاهد الآن <strong className="text-amber-400 font-tech">{currentViewers}</strong> زبوناً</span>
                </div>

                {/* Product Image */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="aspect-square rounded-xl bg-slate-900 p-3 overflow-hidden cursor-pointer relative group/img border border-slate-800/80 flex items-center justify-center mt-6"
                >
                  <img 
                    src={product.image} 
                    alt={product.nameAr}
                    className="max-h-full max-w-full object-contain group-hover/img:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-tech text-cyan-400 font-bold uppercase">
                    {product.brand}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {product.nameAr}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-amber-400 font-tech">
                      {formatPrice(product.priceUSD, product.priceIQD)}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all shadow-md active:scale-95 flex items-center gap-1 text-xs"
                    title="إضافة السلة"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">شراء</span>
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
