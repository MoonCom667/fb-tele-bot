import React from 'react';
import { 
  Home, 
  Grid, 
  Wrench, 
  Heart, 
  ShoppingCart, 
  Sparkles,
  Search,
  Bot
} from 'lucide-react';

interface MobileBottomDockProps {
  activeTab: 'store' | 'pc-builder' | 'prebuilt' | 'laptops' | 'admin';
  setActiveTab: (tab: 'store' | 'pc-builder') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIAdvisor: () => void;
  onScrollToCategories: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIAdvisor,
  onScrollToCategories
}) => {
  return (
    <>
      {/* Mobile Floating AI Advisor Trigger (Above Dock) */}
      <div className="fixed bottom-18 left-3 z-40 md:hidden animate-in zoom-in-90 duration-300">
        <button
          onClick={onOpenAIAdvisor}
          className="p-2.5 bg-blue-600 text-white rounded-full shadow-2xl border border-blue-400/40 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          title="مستشار القمر الذكي"
        >
          <Sparkles className="w-4 h-4 fill-white animate-pulse" />
          <span className="text-[11px] font-bold pl-1">مستشار AI</span>
        </button>
      </div>

      {/* Main Sticky Bottom Navigation Dock */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#070a12]/95 backdrop-blur-xl border-t border-slate-800/90 px-1.5 py-1.5 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.9)] w-full max-w-full overflow-hidden"
        aria-label="شريط التنقل السريع للهواتف"
      >
        <div className="w-full max-w-md mx-auto flex items-center justify-around text-center">
          
          {/* Store / Home */}
          <button
            onClick={() => {
              setActiveTab('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all flex-1 justify-center active:scale-95 cursor-pointer ${
              activeTab === 'store'
                ? 'text-blue-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === 'store' ? 'text-blue-400 scale-110' : ''}`} />
            <span className="text-[10px] leading-tight">الرئيسية</span>
          </button>

          {/* Categories */}
          <button
            onClick={() => {
              setActiveTab('store');
              onScrollToCategories();
            }}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1 justify-center active:scale-95 cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span className="text-[10px] leading-tight">الأقسام</span>
          </button>

          {/* Centerpiece: PC Builder Button */}
          <button
            onClick={() => setActiveTab('pc-builder')}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all flex-1 justify-center active:scale-95 -mt-2.5 border cursor-pointer ${
              activeTab === 'pc-builder'
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-bold'
                : 'bg-slate-900 text-blue-400 border-blue-500/30 hover:border-blue-400'
            }`}
          >
            <Wrench className={`w-4 h-4 ${activeTab === 'pc-builder' ? 'animate-bounce' : ''}`} />
            <span className="text-[10px] font-bold leading-tight">تجميع PC</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1 justify-center active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] leading-tight">المفضلة</span>
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1 justify-center active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className={`w-4 h-4 ${cartCount > 0 ? 'text-blue-400' : ''}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] leading-tight">السلة</span>
          </button>

        </div>
      </nav>
    </>
  );
};
