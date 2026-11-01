import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Gift, 
  Moon, 
  Tag, 
  Clock, 
  Check, 
  Copy, 
  ShoppingBag, 
  ArrowLeft, 
  GraduationCap, 
  Calendar, 
  Percent, 
  Zap,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { ProductCategory } from '../types';

export type SeasonalOccasion = 'auto' | 'ramadan' | 'black_friday' | 'back_to_school' | 'new_year';

interface SeasonalEventBannerProps {
  onSelectCategory?: (cat: ProductCategory) => void;
  onSelectTab?: (tab: 'store' | 'pc-builder' | 'prebuilt' | 'laptops') => void;
  currency: 'IQD' | 'USD';
}

interface OccasionTheme {
  id: SeasonalOccasion;
  nameAr: string;
  badgeAr: string;
  icon: string;
  titleAr: string;
  subtitleAr: string;
  discountTextAr: string;
  couponCode: string;
  bgGradient: string;
  borderColor: string;
  accentTextColor: string;
  badgeBg: string;
  bannerImage: string;
  targetCategory?: ProductCategory;
  targetTab?: 'store' | 'pc-builder' | 'prebuilt' | 'laptops';
}

export const SeasonalEventBanner: React.FC<SeasonalEventBannerProps> = ({
  onSelectCategory,
  onSelectTab,
  currency
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<SeasonalOccasion>('auto');
  const [activeOccasionKey, setActiveOccasionKey] = useState<SeasonalOccasion>('black_friday');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Live timer for the seasonal event
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 11, minutes: 24, seconds: 45 });

  // Themes database for all seasons
  const occasions: Record<string, OccasionTheme> = {
    ramadan: {
      id: 'ramadan',
      nameAr: 'موسم رمضان المبارك',
      badgeAr: '🌙 عروض الشهر الكريم بفرع الصناعة',
      icon: '🌙',
      titleAr: 'تجهيزات وسيتأبات رمضان المبارك - خصومات حصرية!',
      subtitleAr: 'احصل على هدايا مجانية وتوصيل مجاني لكافة المحافظات مع كل تجميعة بي سي أو لابتوب خلال شهر رمضان الكريم.',
      discountTextAr: 'خصم يصل إلى 35,000 د.ع عند الشراء بكود التخفيض',
      couponCode: 'RAMADAN_QAMAR',
      bgGradient: 'from-emerald-950 via-slate-950 to-amber-950',
      borderColor: 'border-amber-500/50',
      accentTextColor: 'text-amber-400',
      badgeBg: 'bg-amber-400 text-slate-950',
      bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      targetTab: 'prebuilt'
    },
    black_friday: {
      id: 'black_friday',
      nameAr: 'موسم الجمعة السوداء (Black Friday)',
      badgeAr: '🔥 أقوى عروض السنة - الجمعة السوداء',
      icon: '⚡',
      titleAr: 'تخفيضات الجمعة السوداء الكبرى - أسعار التكلفة!',
      subtitleAr: 'خصومات تصل إلى 40% على كروت الشاشة الحديثة، الشاشات السريعة، ولابتوبات ROG & Legion مع هدايا فورية.',
      discountTextAr: 'تخفيضات حقيقية بأسعار التكلفة المباشرة',
      couponCode: 'BLACK_FRIDAY',
      bgGradient: 'from-rose-950 via-slate-950 to-purple-950',
      borderColor: 'border-rose-500/50',
      accentTextColor: 'text-rose-400',
      badgeBg: 'bg-rose-500 text-white',
      bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      targetCategory: 'gpus'
    },
    back_to_school: {
      id: 'back_to_school',
      nameAr: 'عروض العودة للمدارس والجامعات',
      badgeAr: '🎓 خصم الطلاب والمصممين',
      icon: '🎓',
      titleAr: 'عروض العودة للمدارس والجامعات - جهّز حاسوبك الآن!',
      subtitleAr: 'خصومات خاصة لطلاب الهندسة، البرمجة، والذكاء الاصطناعي على اللابتوبات والتجميعات المجهزة للمونتاج والدراسة.',
      discountTextAr: 'خصم خاص للطلاب والمصممين',
      couponCode: 'STUDENT_POWER',
      bgGradient: 'from-cyan-950 via-slate-950 to-blue-950',
      borderColor: 'border-cyan-500/50',
      accentTextColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-400 text-slate-950',
      bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      targetTab: 'laptops'
    },
    new_year: {
      id: 'new_year',
      nameAr: 'موسم ألعاب رأس السنة (New Year Gaming)',
      badgeAr: '🎉 عروض نهاية السنة للقيمرز',
      icon: '🎮',
      titleAr: 'تخفيضات ألعاب رأس السنة - ارتقِ بسيتأبك للجيل الجديد!',
      subtitleAr: 'أقوى تجميعات RTX 4090 & Ryzen 7 7800X3D بأسعار تنافسية مع كفالة استبدال مسجلة بالسيريال.',
      discountTextAr: 'هدايا ملحقات قيمنق مع كل بي سي',
      couponCode: 'GAMING_2026',
      bgGradient: 'from-purple-950 via-slate-950 to-indigo-950',
      borderColor: 'border-purple-500/50',
      accentTextColor: 'text-purple-400',
      badgeBg: 'bg-purple-500 text-white',
      bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      targetTab: 'pc-builder'
    }
  };

  // Determine occasion automatically based on current month if 'auto' is selected
  useEffect(() => {
    if (selectedOccasion !== 'auto') {
      setActiveOccasionKey(selectedOccasion);
      return;
    }

    const month = new Date().getMonth(); // 0 to 11
    if (month === 2 || month === 3) { // March/April
      setActiveOccasionKey('ramadan');
    } else if (month === 8 || month === 9) { // Sept/Oct
      setActiveOccasionKey('back_to_school');
    } else if (month === 10 || month === 11) { // Nov/Dec
      setActiveOccasionKey('black_friday');
    } else {
      setActiveOccasionKey('black_friday'); // Default exciting theme
    }
  }, [selectedOccasion]);

  // Countdown timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 3, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const theme = occasions[activeOccasionKey] || occasions.black_friday;

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(theme.couponCode);
    setCopiedCoupon(theme.couponCode);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const handleActionClick = () => {
    if (theme.targetTab && onSelectTab) {
      onSelectTab(theme.targetTab);
    } else if (theme.targetCategory && onSelectCategory) {
      onSelectCategory(theme.targetCategory);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 select-none">
      
      {/* Outer Banner Card with Dynamic Background */}
      <div className={`bg-gradient-to-r ${theme.bgGradient} border-2 ${theme.borderColor} rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-700`}>
        
        {/* Decorative Light Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-4 text-right">
            
            {/* Occasion Switcher Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>المناسبة الحالية:</span>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setSelectedOccasion('auto')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedOccasion === 'auto' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  تلقائي (حسب التاريخ)
                </button>
                <button
                  onClick={() => setSelectedOccasion('ramadan')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedOccasion === 'ramadan' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌙 رمضان
                </button>
                <button
                  onClick={() => setSelectedOccasion('black_friday')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedOccasion === 'black_friday' ? 'bg-rose-500 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔥 الجمعة السوداء
                </button>
                <button
                  onClick={() => setSelectedOccasion('back_to_school')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedOccasion === 'back_to_school' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎓 للجامعات
                </button>
              </div>
            </div>

            {/* Event Badge */}
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-md ${theme.badgeBg}`}>
                <span>{theme.icon}</span>
                <span>{theme.badgeAr}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {theme.titleAr}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {theme.subtitleAr}
            </p>

            {/* Timer & Coupon Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              
              {/* Event Expiry Countdown */}
              <div className="bg-slate-950/90 border border-slate-800 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-tech font-bold text-white shadow-inner">
                <Clock className={`w-4 h-4 ${theme.accentTextColor} animate-pulse`} />
                <span className="text-[11px] text-slate-400">ينتهي المهرجان بعد:</span>
                <span className={`${theme.accentTextColor} text-sm font-black`}>
                  {theme.id === 'black_friday' ? `${timeLeft.days} يوم : ${timeLeft.hours}س : ${timeLeft.minutes}د` : 'العرض ساري حالياً'}
                </span>
              </div>

              {/* Promo Coupon Button */}
              <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3.5 py-2 rounded-2xl text-xs">
                <Tag className={`w-4 h-4 ${theme.accentTextColor}`} />
                <span className="text-slate-300 font-bold">كود العرض:</span>
                <span className={`font-tech font-black ${theme.accentTextColor}`}>
                  {theme.couponCode}
                </span>

                <button
                  onClick={handleCopyCoupon}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mr-1"
                  title="نسخ الكود"
                >
                  {copiedCoupon === theme.couponCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

            </div>

            {/* CTA Action Button */}
            <div className="pt-2">
              <button
                onClick={handleActionClick}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح كافة عروض هذا الموسم</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Banner Image Preview Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl group/image">
              <img 
                src={theme.bannerImage} 
                alt={theme.titleAr}
                className="w-full h-56 sm:h-64 object-cover group-hover/image:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-3 right-3 left-3 p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-right space-y-0.5">
                <div className="text-[10px] text-amber-400 font-bold uppercase font-tech">
                  ضمان مكتب القمر الرسمي • شارع الصناعة
                </div>
                <div className="text-xs font-black text-white">
                  {theme.discountTextAr}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
