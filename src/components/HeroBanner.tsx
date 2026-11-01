import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft,
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Wrench,
  Award
} from 'lucide-react';
import { StoreInfo, HeroSlide } from '../types';

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-geforce-rtx',
    kicker: 'تجميعات وكروت الشاشة الاحترافية · GEFORCE RTX 40 SERIES',
    titleMain: 'أداء استثنائي للألعاب وصناعة المحتوى',
    titleSub: 'كروت RTX 4090 / 4080 Super وتجميعات الجيل الرابع عشر',
    description: 'نجهز لك أقوى الحواسيب المكتبية بقطع أصلية 100% مع فحص حراري شامل وضمان استبدال محلي معتمد من معرضنا في شارع الصناعة.',
    primaryCtaText: 'تصفح التجميعات الجاهزة',
    primaryCtaAction: 'prebuilts',
    secondaryCtaText: 'ابنِ تجميعتك الخاصة',
    secondaryCtaAction: 'builder',
    priceTag: {
      usd: 1450,
      iqd: 2204000,
      label: 'تبدأ التجميعات الاحترافية من'
    },
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'slide-pc-builder',
    kicker: 'أداة التجميع الذكية · PC BUILDER',
    titleMain: 'صمّم حاسوبك خطوة بخطوة بتوافقية مضمونة',
    titleSub: 'فحص تلقائي للمقبس والطاقة والذواكر DDR5',
    description: 'اختر المعالج، اللوحة الأم، وكرت الشاشة، وسيقوم النظام بالتحقق من التوافقية وحساب استهلاك الطاقة الفعلي مع تركيب مجاني.',
    primaryCtaText: 'ابدأ تجميع حاسوبك الآن',
    primaryCtaAction: 'builder',
    secondaryCtaText: 'تصفح جميع القطع',
    secondaryCtaAction: 'products',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'slide-gaming-laptops',
    kicker: 'أجهزة الألعاب المحمولة · ASUS ROG & LENOVO LEGION',
    titleMain: 'قوة الألعاب والهندسة في جهاز محمول',
    titleSub: 'شاشات 240Hz OLED مع معالجات Core i9 و Ryzen 9',
    description: 'تشكيلة واسعة من أحدث اللابتوبات المخصصة للألعاب الثقيلة، التصميم الهندسي، والمونتاج بضمان محلي حقيقي لمدة سنة.',
    primaryCtaText: 'استعراض اللابتوبات',
    primaryCtaAction: 'laptops',
    secondaryCtaText: 'تصفح جميع المنتجات',
    secondaryCtaAction: 'products',
    priceTag: {
      usd: 1150,
      iqd: 1748000,
      label: 'تبدأ أسعار اللابتوبات من'
    },
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=85'
  }
];

interface HeroBannerProps {
  storeInfo: StoreInfo;
  currency: 'IQD' | 'USD';
  onOpenBuilder: () => void;
  onOpenAI: () => void;
  onExploreProducts: () => void;
  onOpenPrebuilts?: () => void;
  onOpenLaptops?: () => void;
  slides?: HeroSlide[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  storeInfo,
  currency,
  onOpenBuilder,
  onOpenAI,
  onExploreProducts,
  onOpenPrebuilts,
  onOpenLaptops,
  slides: propSlides
}) => {
  const activeSlides = propSlides && propSlides.length > 0 ? propSlides : DEFAULT_HERO_SLIDES;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset index if slides list changes
  useEffect(() => {
    if (currentSlideIndex >= activeSlides.length) {
      setCurrentSlideIndex(0);
    }
  }, [activeSlides.length, currentSlideIndex]);

  const formatPrice = (usd: number, iqd: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    return `${iqd.toLocaleString()} د.ع`;
  };

  const resolveAction = (actionKey?: string) => {
    switch (actionKey) {
      case 'builder':
        return onOpenBuilder;
      case 'prebuilts':
        return onOpenPrebuilts || onExploreProducts;
      case 'laptops':
        return onOpenLaptops || onExploreProducts;
      case 'whatsapp':
        return () => window.open(`https://wa.me/${storeInfo.whatsapp}`, '_blank');
      case 'products':
      default:
        return onExploreProducts;
    }
  };

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeSlides.length]);

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
  };

  if (!currentSlide) return null;

  return (
    <div className="w-full bg-[#090d16] border-b border-slate-800/80">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-2xl overflow-hidden bg-[#111827] border border-slate-800/90 grid grid-cols-1 lg:grid-cols-12 min-h-[360px] lg:min-h-[400px]">
          
          {/* TEXT CONTENT COLUMN */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 text-right">
            
            <div className="space-y-3">
              {currentSlide.kicker && (
                <div className="text-xs font-medium text-blue-400 tracking-wide">
                  {currentSlide.kicker}
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug">
                {currentSlide.titleMain}
              </h1>

              {currentSlide.titleSub && (
                <p className="text-sm sm:text-base font-bold text-slate-200">
                  {currentSlide.titleSub}
                </p>
              )}

              {currentSlide.description && (
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                  {currentSlide.description}
                </p>
              )}

              {currentSlide.priceTag && (
                <div className="pt-1 flex items-center gap-2.5 text-xs text-slate-400">
                  <span>{currentSlide.priceTag.label}:</span>
                  <span className="text-base font-black text-white font-mono tabular-nums">
                    {formatPrice(currentSlide.priceTag.usd, currentSlide.priceTag.iqd)}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-6 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={resolveAction(currentSlide.primaryCtaAction)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{currentSlide.primaryCtaText || 'تصفح العرض'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {currentSlide.secondaryCtaText && (
                  <button
                    onClick={resolveAction(currentSlide.secondaryCtaAction)}
                    className="px-5 py-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    {currentSlide.secondaryCtaText}
                  </button>
                )}
              </div>

              {/* Slide Controls */}
              {activeSlides.length > 1 && (
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        aria-label={`شريحة ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentSlideIndex === idx
                            ? 'w-6 bg-blue-500'
                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      aria-label="السابق"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="التالي"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* VISUAL COLUMN */}
          <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-slate-950">
            {activeSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  idx === currentSlideIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.titleMain}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111827] via-transparent to-transparent opacity-90 lg:opacity-80" />
              </div>
            ))}
          </div>

        </div>

        {/* Quick Trust Strip Under Banner */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111827]/60 border border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">ضمان محلي معتمد بالسيريال</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111827]/60 border border-slate-800/80">
            <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">تركيب وفحص حراري مجاني</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111827]/60 border border-slate-800/80">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">توصيل سريع لكافة المحافظات</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111827]/60 border border-slate-800/80">
            <Award className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">بغداد - شارع الصناعة</span>
          </div>
        </div>

      </div>
    </div>
  );
};
