import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  X, 
  Sparkles, 
  MapPin, 
  Clock, 
  ExternalLink,
  Eye
} from 'lucide-react';
import { Product } from '../types';

interface LivePurchaseActivityNotifierProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onSelectProduct: (product: Product) => void;
}

interface PurchaseNotification {
  id: string;
  buyerName: string;
  cityAr: string;
  product: Product;
  timeAgoAr: string;
}

export const LivePurchaseActivityNotifier: React.FC<LivePurchaseActivityNotifierProps> = ({
  products,
  currency,
  onSelectProduct
}) => {
  const [currentNotification, setCurrentNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Sample buyer personas across Iraqi governorates
  const buyersList = [
    { name: 'حيدر العبيدي', city: 'بغداد - الكرخ' },
    { name: 'عمر الكردي', city: 'أربيل - عينكاوة' },
    { name: 'مصطفى الحلي', city: 'بابل - الحلة' },
    { name: 'أحمد البصري', city: 'البصرة - الجبيلة' },
    { name: 'سجاد النجفي', city: 'النجف الأشرف' },
    { name: 'كرار الكربلائي', city: 'كربلاء المقدسة' },
    { name: 'يوسف الموصلي', city: 'نينوى - الموصل' },
    { name: 'محمد الأنباري', city: 'الأنبار - الرمادي' },
    { name: 'سامر الكركوكي', city: 'كركوك' },
    { name: 'حمزة الواسطي', city: 'واسط - الكوت' }
  ];

  const timesList = [
    'قبل دقيقة واحدة',
    'قبل دقيقتين',
    'قبل 3 دقائق',
    'الآن',
    'قبل 5 دقائق'
  ];

  useEffect(() => {
    if (isDisabled || products.length === 0) return;

    // Trigger initial notification after 4 seconds
    const initialTimer = setTimeout(() => {
      triggerRandomNotification();
    }, 4000);

    // Repeat every 14 seconds
    const intervalTimer = setInterval(() => {
      triggerRandomNotification();
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [products, isDisabled]);

  const triggerRandomNotification = () => {
    if (products.length === 0) return;

    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomBuyer = buyersList[Math.floor(Math.random() * buyersList.length)];
    const randomTime = timesList[Math.floor(Math.random() * timesList.length)];

    const notification: PurchaseNotification = {
      id: `notif-${Date.now()}`,
      buyerName: randomBuyer.name,
      cityAr: randomBuyer.city,
      product: randomProduct,
      timeAgoAr: randomTime
    };

    setCurrentNotification(notification);
    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (isDisabled || !currentNotification || !isVisible) return null;

  const formatPrice = (usd: number, iqd: number) => {
    if (currency === 'IQD') {
      return `${iqd.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300 select-none">
      <div 
        className="bg-slate-900/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 relative text-right text-slate-100 group hover:border-amber-400 transition-all cursor-pointer"
        onClick={() => onSelectProduct(currentNotification.product)}
      >
        
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute -top-2 -left-2 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700 shadow-md transition-colors"
          title="إغلاق الإشعار"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Product Thumbnail with Glow */}
        <div className="w-14 h-14 rounded-xl bg-slate-950 p-1 border border-slate-800 shrink-0 overflow-hidden relative flex items-center justify-center group-hover:scale-105 transition-transform">
          <img 
            src={currentNotification.product.image} 
            alt={currentNotification.product.nameAr} 
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute top-0 right-0 p-0.5 bg-amber-500 text-slate-950 rounded-bl-md">
            <ShoppingBag className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Buyer & Purchase Info */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-white flex items-center gap-1">
              <span>{currentNotification.buyerName}</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            </span>
            <span className="text-[10px] text-slate-400 font-tech">
              {currentNotification.timeAgoAr}
            </span>
          </div>

          <p className="text-[11px] text-amber-300 font-bold line-clamp-1">
            قام بشراء {currentNotification.product.nameAr}
          </p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{currentNotification.cityAr}</span>
            </span>

            <span className="font-tech font-black text-amber-400">
              {formatPrice(currentNotification.product.priceUSD, currentNotification.product.priceIQD)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
