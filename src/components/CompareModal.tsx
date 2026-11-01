import React from 'react';
import { X, Scale, Trash2, ShoppingCart, Check, Zap, Cpu, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product) => void;
  currency: 'IQD' | 'USD';
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
  currency
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-right">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                مقارنة المنتجات والمواصفات التقنية ({compareList.length})
              </h2>
              <p className="text-xs text-slate-400">
                قارن بين أسعار، مواصفات، وأداء الألعاب للقطع المختارة جنباً إلى جنب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح القائمة</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-x-auto flex-1 no-scrollbar">
          {compareList.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Scale className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-bold">لم تقم بإضافة أي منتجات للمقارنة بعد</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                قم بتمرير الماوس فوق أي بطاقة منتج واضغط على زر "مقارنة المنتج" لإضافتها هنا.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px] grid grid-cols-1 gap-6">
              <div className={`grid grid-cols-${compareList.length + 1} gap-4 border-b border-slate-800 pb-4`}>
                
                {/* Labels Column */}
                <div className="font-bold text-slate-400 text-xs space-y-6 pt-24">
                  <div>الشركة والبراند</div>
                  <div>السعر الرسمي</div>
                  <div>تقييم الزبائن</div>
                  <div>مؤشر أداء الألعاب</div>
                  <div>المقبس / الـ Socket</div>
                  <div>سعة الذاكرة / VRAM</div>
                  <div>حالة التوفر بالفرع</div>
                  <div>إضافة للشراء</div>
                </div>

                {/* Compared Products Columns */}
                {compareList.map((product) => {
                  const priceStr = currency === 'IQD'
                    ? `${product.priceIQD.toLocaleString()} د.ع`
                    : `$${product.priceUSD.toLocaleString()}`;

                  return (
                    <div key={product.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-5 text-center relative group">
                      
                      <button
                        onClick={() => onRemoveFromCompare(product.id)}
                        className="absolute top-2 left-2 p-1.5 bg-rose-500/20 text-rose-400 rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                        title="إزالة من المقارنة"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Image & Title */}
                      <div className="space-y-2">
                        <img 
                          src={product.image} 
                          alt={product.nameAr}
                          className="w-24 h-24 object-cover rounded-xl mx-auto border border-slate-800"
                        />
                        <h4 className="text-xs font-bold text-white line-clamp-2 h-8">
                          {product.nameAr}
                        </h4>
                      </div>

                      {/* Brand */}
                      <div className="text-xs font-bold text-slate-300 font-tech uppercase bg-slate-900 py-1 rounded-lg">
                        {product.brand}
                      </div>

                      {/* Price */}
                      <div className="text-sm font-black text-amber-400 font-tech">
                        {priceStr}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 text-xs text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{product.rating}</span>
                      </div>

                      {/* Gaming Score */}
                      <div className="text-xs font-black text-cyan-400 font-tech bg-cyan-950/50 border border-cyan-500/30 py-1 rounded-lg flex items-center justify-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                        <span>{product.gamingScore || 'N/A'}</span>
                      </div>

                      {/* Socket */}
                      <div className="text-xs text-slate-300 font-tech">
                        {product.specs.socket || 'غير محدد'}
                      </div>

                      {/* VRAM / Capacity */}
                      <div className="text-xs text-slate-300 font-tech">
                        {product.specs.vram || product.specs.capacity || 'غير محدد'}
                      </div>

                      {/* Stock Status */}
                      <div>
                        {product.inStock ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            متوفر بالفرع
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                            غير متوفر
                          </span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>إضافة للسلة</span>
                      </button>

                    </div>
                  );
                })}

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
