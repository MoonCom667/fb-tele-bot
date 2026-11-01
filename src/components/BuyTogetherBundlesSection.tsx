import React, { useState } from 'react';
import { 
  PackageCheck, 
  Plus, 
  Equal, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Percent, 
  ShieldCheck, 
  ArrowLeft,
  Flame,
  Layers
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface BundleItem {
  id: string;
  nameAr: string;
  categoryAr: string;
  priceUSD: number;
  priceIQD: number;
  image: string;
}

interface BundlePackage {
  id: string;
  titleAr: string;
  subtitleAr: string;
  discountPercentage: number;
  badgeAr: string;
  items: BundleItem[];
}

interface BuyTogetherBundlesSectionProps {
  products: Product[];
  currency: 'IQD' | 'USD';
  onAddMultipleToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const BuyTogetherBundlesSection: React.FC<BuyTogetherBundlesSectionProps> = ({
  products,
  currency,
  onAddMultipleToCart,
  onSelectProduct
}) => {
  // Pre-configured curated bundles based on real PC hardware synergy
  const initialBundles: BundlePackage[] = [
    {
      id: 'bundle-gaming-setup',
      titleAr: 'حزمة السيتأب الاحترافي المكتمل (Pro Gaming Combo)',
      subtitleAr: 'اشترِ كرت الشاشة الشاشة السريعة والكيبورد معاً واحصل على خصم حزمة فوري وتوصيل مجاني!',
      discountPercentage: 8,
      badgeAr: '🔥 الأكثر طلباً للقيمرز',
      items: [
        {
          id: 'b1-gpu',
          nameAr: 'كرت شاشة ASUS ROG Strix RTX 4070 Ti Super 16GB White',
          categoryAr: 'كارت شاشة',
          priceUSD: 980,
          priceIQD: 1470000,
          image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: 'b1-monitor',
          nameAr: 'شاشة ASUS ROG Swift 27" OLED 240Hz 0.03ms QHD',
          categoryAr: 'شاشة ألعاب',
          priceUSD: 720,
          priceIQD: 1080000,
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: 'b1-kbd',
          nameAr: 'كيبورد ميكانيكي ASUS ROG Azoth Wireless OLED',
          categoryAr: 'ملحقات',
          priceUSD: 190,
          priceIQD: 285000,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'
        }
      ]
    },
    {
      id: 'bundle-cooling-power',
      titleAr: 'حزمة التبريد العالي ومزود الطاقة الكفؤ (Thermal & Power Bundle)',
      subtitleAr: 'التوليفة المثالية لتأمين حرارة معالجك واستقرار الطاقة أثناء أعتى الألعاب والمونتاج.',
      discountPercentage: 10,
      badgeAr: '❄️ أداء واستقرار حراري',
      items: [
        {
          id: 'b2-cooler',
          nameAr: 'تبريد مائي Lian Li Galahad II Trinity SL-INF 360mm RGB',
          categoryAr: 'تبريد مائي',
          priceUSD: 185,
          priceIQD: 277500,
          image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: 'b2-psu',
          nameAr: 'مزود طاقة Seasonic PRIME 1000W 80+ Titanium Full Modular',
          categoryAr: 'مزود طاقة',
          priceUSD: 240,
          priceIQD: 360000,
          image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: 'b2-fans',
          nameAr: 'مجموعة مراوح Lian Li UNI FAN SL-Infinity 120 (طقم 3 مراوح)',
          categoryAr: 'مراوح نيون',
          priceUSD: 95,
          priceIQD: 142500,
          image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'
        }
      ]
    }
  ];

  // Selected items state per bundle
  const [selectedItemIds, setSelectedItemIds] = useState<Record<string, string[]>>({
    'bundle-gaming-setup': initialBundles[0].items.map(i => i.id),
    'bundle-cooling-power': initialBundles[1].items.map(i => i.id)
  });

  const [addedSuccessBundleId, setAddedSuccessBundleId] = useState<string | null>(null);

  const toggleItemSelection = (bundleId: string, itemId: string) => {
    setSelectedItemIds(prev => {
      const currentList = prev[bundleId] || [];
      if (currentList.includes(itemId)) {
        // Keep at least 2 items
        if (currentList.length <= 2) return prev;
        return { ...prev, [bundleId]: currentList.filter(id => id !== itemId) };
      } else {
        return { ...prev, [bundleId]: [...currentList, itemId] };
      }
    });
  };

  const handleAddBundleToCart = (bundle: BundlePackage) => {
    const selectedIds = selectedItemIds[bundle.id] || bundle.items.map(i => i.id);
    const selectedItems = bundle.items.filter(item => selectedIds.includes(item.id));

    // Convert to Product structure
    const convertedProducts: Product[] = selectedItems.map(item => ({
      id: item.id,
      name: item.nameAr,
      nameAr: item.nameAr,
      category: 'accessories' as ProductCategory,
      priceUSD: Math.round(item.priceUSD * (1 - bundle.discountPercentage / 100)),
      priceIQD: Math.round(item.priceIQD * (1 - bundle.discountPercentage / 100)),
      originalPriceUSD: item.priceUSD,
      originalPriceIQD: item.priceIQD,
      image: item.image,
      brand: 'AlQamar Bundle',
      description: `عنصر مشمول ضمن ${bundle.titleAr}`,
      descriptionAr: `عنصر مشمول ضمن ${bundle.titleAr}`,
      inStock: true,
      stockCount: 10,
      rating: 5,
      reviewsCount: 42,
      specs: {},
      warranty: 'سنة كاملة مسجلة بالسيريال'
    }));

    onAddMultipleToCart(convertedProducts);

    setAddedSuccessBundleId(bundle.id);
    setTimeout(() => setAddedSuccessBundleId(null), 3000);
  };

  const formatPrice = (usd: number, iqd: number) => {
    if (currency === 'IQD') {
      return `${iqd.toLocaleString('ar-IQ')} د.ع`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Outer Container Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <PackageCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>عروض "اشترِ معاً ووفر أكثر"</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  حزم الملحقات المتوافقة
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              قم بشراء حزم القطع والملحقات المترابطة معاً واحصل على خصم خصيصاً للتجميعة الكاملة.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-2xl shrink-0">
            <Percent className="w-4 h-4" />
            <span>خصم يصل إلى 10% عند الشراء كحزمة</span>
          </div>

        </div>

        {/* Bundles Display List */}
        <div className="space-y-8 pt-6">
          {initialBundles.map((bundle) => {
            const activeIds = selectedItemIds[bundle.id] || bundle.items.map(i => i.id);
            const activeItems = bundle.items.filter(i => activeIds.includes(i.id));

            // Calculate Totals
            const rawUSD = activeItems.reduce((acc, i) => acc + i.priceUSD, 0);
            const rawIQD = activeItems.reduce((acc, i) => acc + i.priceIQD, 0);

            const finalUSD = Math.round(rawUSD * (1 - bundle.discountPercentage / 100));
            const finalIQD = Math.round(rawIQD * (1 - bundle.discountPercentage / 100));

            const savingsUSD = rawUSD - finalUSD;
            const savingsIQD = rawIQD - finalIQD;

            const isSuccess = addedSuccessBundleId === bundle.id;

            return (
              <div 
                key={bundle.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 text-right"
              >
                {/* Bundle Title & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {bundle.badgeAr}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {bundle.titleAr}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {bundle.subtitleAr}
                    </p>
                  </div>

                  <div className="text-left bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl shrink-0">
                    <span className="text-[10px] text-slate-400 block font-tech">نسبة الخصم المباشرة:</span>
                    <span className="text-sm font-black text-emerald-400 font-tech">
                      خصم {bundle.discountPercentage}%
                    </span>
                  </div>
                </div>

                {/* Items Row with '+' Indicators */}
                <div className="flex flex-col md:flex-row items-center gap-4 overflow-x-auto pb-2">
                  {bundle.items.map((item, idx) => {
                    const isChecked = activeIds.includes(item.id);

                    return (
                      <React.Fragment key={item.id}>
                        {idx > 0 && (
                          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-black shrink-0">
                            <Plus className="w-4 h-4" />
                          </div>
                        )}

                        <div 
                          onClick={() => toggleItemSelection(bundle.id, item.id)}
                          className={`flex-1 min-w-[220px] max-w-[280px] p-3.5 rounded-2xl border transition-all cursor-pointer relative space-y-2 ${
                            isChecked
                              ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/5'
                              : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                          }`}
                        >
                          {/* Checkbox */}
                          <div className="flex items-center justify-between">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-amber-500 border-amber-500 text-slate-950 font-black' : 'border-slate-700'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>

                            <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                              {item.categoryAr}
                            </span>
                          </div>

                          {/* Image */}
                          <div className="aspect-video rounded-xl bg-slate-950 p-2 overflow-hidden flex items-center justify-center border border-slate-800/80">
                            <img src={item.image} alt={item.nameAr} className="max-h-full max-w-full object-contain" />
                          </div>

                          {/* Name */}
                          <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                            {item.nameAr}
                          </h4>

                          {/* Price */}
                          <div className="text-xs font-black text-amber-400 font-tech">
                            {formatPrice(item.priceUSD, item.priceIQD)}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Bundle Summary & One-Click Add Button */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  
                  {/* Price Calculation */}
                  <div className="space-y-0.5 text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">السعر الأصلي للقطع:</span>
                      <span className="text-xs text-slate-500 line-through font-tech">
                        {formatPrice(rawUSD, rawIQD)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">سعر الحزمة بعد الخصم:</span>
                      <span className="text-lg font-black text-amber-400 font-tech">
                        {formatPrice(finalUSD, finalIQD)}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>توفير صافي قدره {formatPrice(savingsUSD, savingsIQD)} مع هذه الحزمة!</span>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div>
                    <button
                      onClick={() => handleAddBundleToCart(bundle)}
                      className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xl ${
                        isSuccess
                          ? 'bg-emerald-500 text-slate-950 scale-105'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-95'
                      }`}
                    >
                      {isSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تمت إضافة الحزمة بنجاح للسلة!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>إضافة الحزمة بالكامل إلى السلة ({activeItems.length} قطع)</span>
                        </>
                      )}
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
