import React from 'react';
import { Heart, Trash2, ShoppingCart, X, ArrowLeft, Eye, ShieldCheck } from 'lucide-react';
import { Product, StoreInfo } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  currency: 'IQD' | 'USD';
  storeInfo: StoreInfo;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onClearWishlist,
  onAddToCart,
  onSelectProduct,
  currency,
  storeInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-right">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">المفضلة وقائمة الرغبات</h3>
              <p className="text-xs text-slate-400">({wishlist.length} منتجات محفوظة)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlist.length > 0 && (
              <button
                onClick={onClearWishlist}
                className="text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 transition-colors"
              >
                مسح الكل
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                <Heart className="w-8 h-8 text-rose-500/40" />
              </div>
              <h4 className="text-base font-bold text-slate-300">قائمة المفضلة فارغة</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                اضغط على أيقونة القلب ❤️ على أي كرت شاشة، معالج، لابتوب، أو قطعة تفضلها لحفظها ومقارنتها لاحقاً.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                تصفح المنتجات والقطع
              </button>
            </div>
          ) : (
            wishlist.map((product) => {
              const formattedPrice = currency === 'IQD'
                ? `${product.priceIQD.toLocaleString()} د.ع`
                : `$${product.priceUSD.toLocaleString()}`;

              return (
                <div 
                  key={product.id}
                  className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 flex gap-3 items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div 
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 cursor-pointer border border-slate-800"
                  >
                    <img src={product.image} alt={product.nameAr} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 text-right space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {product.brand}
                    </span>
                    <h4 
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs font-bold text-white line-clamp-1 cursor-pointer hover:text-amber-400"
                    >
                      {product.nameAr}
                    </h4>
                    <div className="text-[11px] text-amber-400 font-tech font-bold">{formattedPrice}</div>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          product.inStock
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>نقل للسلة</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="p-1 px-2 text-[11px] text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                      >
                        معاينة
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    title="حذف من المفضلة"
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-2 text-right">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>يتم حفظ المفضلة محلياً ويمكنك مراجعتها في أي وقت</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
