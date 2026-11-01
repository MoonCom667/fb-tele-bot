import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, X, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { CartItem, Product, StoreInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: 'IQD' | 'USD';
  storeInfo: StoreInfo;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  storeInfo,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const totalIQD = items.reduce((sum, item) => sum + item.product.priceIQD * item.quantity, 0);

  const formattedTotal = currency === 'IQD'
    ? `${totalIQD.toLocaleString()} د.ع`
    : `$${totalUSD.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-right">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">سلة المشتريات</h3>
            <span className="text-xs text-slate-400">({items.length} منتجات)</span>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-300">سلتك فارغة حالياً</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                تصفح قطع الهاردوير، اللابتوبات، أو استخدم أداة تجميع البي سي لإضافة القطع.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = currency === 'IQD'
                ? `${(item.product.priceIQD * item.quantity).toLocaleString()} د.ع`
                : `$${item.product.priceUSD * item.quantity}`;

              return (
                <div 
                  key={item.product.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex gap-3 items-center justify-between"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    <img src={item.product.image} alt={item.product.nameAr} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 text-right space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.nameAr}</h4>
                    <div className="text-[11px] text-amber-400 font-tech font-bold">{itemPrice}</div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white font-tech px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-3">
            <div className="flex items-center justify-between text-right">
              <span className="text-xs text-slate-400">الإجمالي النهائي:</span>
              <span className="text-xl font-black text-amber-400 font-tech">{formattedTotal}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ضمان محلي معتمد وفحص مباشر في شارع الصناعة</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <span>متابعة إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
