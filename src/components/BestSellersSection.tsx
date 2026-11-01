import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Eye, 
  ArrowLeft,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface BestSellersSectionProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'prebuilt' | 'gpu' | 'laptop'>('all');

  // Filter bestsellers
  const bestSellerProducts = products.filter(p => p.isBestSeller);

  const filteredProducts = bestSellerProducts.filter(p => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'prebuilt') return p.category === 'prebuilt_pcs' || p.category === 'cpus';
    if (activeCategoryFilter === 'gpu') return p.category === 'gpus';
    if (activeCategoryFilter === 'laptop') return p.category === 'laptops';
    return true;
  }).slice(0, 6);

  const formatPrice = (usdPrice: number, iqdPrice: number) => {
    if (currency === 'IQD') {
      return `${iqdPrice.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usdPrice.toLocaleString()}`;
  };

  if (filteredProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Main Container */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Trophy className="w-5 h-5 fill-slate-950" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>القطع والأجهزة الأكثر مبيعاً ورغبةً</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  الأعلى تقييماً ★ 4.9
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              الأجهزة والقطع التي حازت على أعلى نسبة طلب وثقة من زبائننا في بغداد وجميع المحافظات.
            </p>
          </div>

          {/* Category Pills Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1.5 rounded-2xl text-xs overflow-x-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏆 جميع الأبطال
            </button>
            <button
              onClick={() => setActiveCategoryFilter('prebuilt')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === 'prebuilt' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              🖥️ التجميعات
            </button>
            <button
              onClick={() => setActiveCategoryFilter('gpu')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === 'gpu' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 كروت الشاشة
            </button>
            <button
              onClick={() => setActiveCategoryFilter('laptop')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === 'laptop' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              💻 اللابتوبات
            </button>
          </div>

        </div>

        {/* Bestseller Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredProducts.map((product, idx) => {
            const rank = idx + 1;
            const salesCount = 85 + (idx * 17);

            return (
              <div 
                key={product.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-4 text-right group relative"
              >
                {/* Rank Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center gap-1 font-tech">
                    <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                    <span>المركز #{rank} بالأعلى مبيعاً</span>
                  </span>

                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 font-tech">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>تم بيع {salesCount}+ قطعة</span>
                  </span>
                </div>

                {/* Product Image Stage */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="aspect-[16/10] rounded-xl bg-slate-900 p-4 overflow-hidden cursor-pointer relative group/img border border-slate-800/80 flex items-center justify-center"
                >
                  <img 
                    src={product.image} 
                    alt={product.nameAr}
                    className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-2 right-2 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-bold text-amber-400 flex items-center gap-1 font-tech">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 (120+ تقييم)</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-tech text-cyan-400 font-bold uppercase">
                      {product.brand}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ضمان استبدال حقيقي</span>
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {product.nameAr}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-amber-400 font-tech">
                      {formatPrice(product.priceUSD, product.priceIQD)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                      title="المعاينة السريعة"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5 text-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>شراء الآن</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
