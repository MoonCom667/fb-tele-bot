import React, { useRef } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Eye, 
  Flame, 
  Check, 
  ArrowLeft,
  Clock
} from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsCarouselProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds?: string[];
  onToggleFavorite?: (product: Product) => void;
}

export const NewArrivalsCarousel: React.FC<NewArrivalsCarouselProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart,
  wishlistIds = [],
  onToggleFavorite
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products that are marked new or take the newest items
  const newArrivals = products.filter(p => p.isNewArrival || p.badgeAr?.includes('جديد')).slice(0, 8);
  const displayProducts = newArrivals.length >= 4 ? newArrivals : products.slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const formatPrice = (usdPrice: number, iqdPrice: number) => {
    if (currency === 'IQD') {
      return `${iqdPrice.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usdPrice.toLocaleString()}`;
  };

  if (displayProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 select-none">
      
      {/* Container Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>أحدث المنتجات الواصلة حديثاً</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  وجبة الأسبوع
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              تجمّعات وكروت شاشة ولابتوبات وصلت للتو إلى مخازن مكتب القمر بفرع شارع الصناعة.
            </p>
          </div>

          {/* Scroll Arrows Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500/50 transition-all active:scale-95 shadow-md"
              title="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500/50 transition-all active:scale-95 shadow-md"
              title="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Scrollable Horizontal Track */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto pt-6 pb-2 scrollbar-none scroll-smooth"
        >
          {displayProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="w-[260px] sm:w-[290px] shrink-0 bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-3 text-right group relative"
              >
                
                {/* NEW Badge */}
                <div className="absolute top-3 right-3 z-10 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  <span>وصل حديثاً</span>
                </div>

                {/* Stock Tag */}
                <div className="absolute top-3 left-3 z-10 bg-slate-900/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                  متوفر بالفرع
                </div>

                {/* Product Image Stage */}
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
                  <span className="text-[10px] font-tech text-amber-400 font-bold uppercase">
                    {product.brand}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
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
                    <span>شراء</span>
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
