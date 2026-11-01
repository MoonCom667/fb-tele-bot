import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  PackageCheck, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  Search, 
  Box, 
  Navigation,
  MessageCircle,
  Zap,
  Info
} from 'lucide-react';

interface DeliveryZone {
  id: string;
  nameAr: string;
  provinces: string[];
  estimatedTimeAr: string;
  costIQD: number;
  costUSD: number;
  expressAvailable: boolean;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  badgeAr: string;
  featuresAr: string[];
}

export const InteractiveDeliveryMap: React.FC<{ storePhone?: string }> = ({ storePhone = '07708732185' }) => {
  const deliveryZones: DeliveryZone[] = [
    {
      id: 'zone-baghdad',
      nameAr: 'بغداد العاصمة (توصيل سريع)',
      provinces: ['بغداد - الرصافة', 'بغداد - الكرخ', 'المدائن', 'أبو غريب', 'التاجي', 'المحمودية'],
      estimatedTimeAr: 'نفس اليوم (خلال 2 - 5 ساعات)',
      costIQD: 5000,
      costUSD: 3.5,
      expressAvailable: true,
      colorClass: 'text-amber-400',
      borderClass: 'border-amber-500/50',
      bgClass: 'bg-amber-500/10',
      badgeAr: '⚡ توصيل فوري VIP',
      featuresAr: [
        'توصيل بسيارات المتجر المجهزة',
        'إمكانية الفحص والتشغيل قبل التسليم',
        'شحن مجاني للتجميعات الاحترافية'
      ]
    },
    {
      id: 'zone-central',
      nameAr: 'محافظات الوسط والفرات الأوسط',
      provinces: ['بابل (الحلة)', 'كربلاء المقدسة', 'النجف الأشرف', 'الأنبار (الرمادي/الفلوجة)', 'واسط (الكوت)', 'القادسية (الديوانية)', 'صلاح الدين (تكريت/سامراء)', 'ديالى (بعقوبة)'],
      estimatedTimeAr: '24 - 48 ساعة كحد أقصى',
      costIQD: 6000,
      costUSD: 4,
      expressAvailable: true,
      colorClass: 'text-cyan-400',
      borderClass: 'border-cyan-500/50',
      bgClass: 'bg-cyan-500/10',
      badgeAr: '🚚 شحن آمن وسريع',
      featuresAr: [
        'تغليف مقوى ضد الصدمات',
        'تتبع الشحنة برقم المانفيست',
        'ضمان سلامة الشاشة والزجاج البانورامي'
      ]
    },
    {
      id: 'zone-south',
      nameAr: 'محافظات الجنوب',
      provinces: ['البصرة (الفاروق/الجبيلة)', 'ذي قار (الناصرية)', 'ميسان (العمارة)', 'المثنى (السماوة)'],
      estimatedTimeAr: '24 - 48 ساعة كحد أقصى',
      costIQD: 8000,
      costUSD: 5.5,
      expressAvailable: false,
      colorClass: 'text-emerald-400',
      borderClass: 'border-emerald-500/50',
      bgClass: 'bg-emerald-500/10',
      badgeAr: '🛡️ تغليف هيدروليكي آمن',
      featuresAr: [
        'فوم حماية خاص لكروت الشاشة المجهزة',
        'تسليم باب المنزل أو مقر الشركة',
        'تأمين شامل ضد أضرار الشحن'
      ]
    },
    {
      id: 'zone-north',
      nameAr: 'محافظات الشمال وإقليم كوردستان',
      provinces: ['أربيل', 'السليمانية', 'دهوك', 'كركوك', 'نينوى (الموصل)'],
      estimatedTimeAr: '24 - 48 ساعة كحد أقصى',
      costIQD: 8000,
      costUSD: 5.5,
      expressAvailable: false,
      colorClass: 'text-purple-400',
      borderClass: 'border-purple-500/50',
      bgClass: 'bg-purple-500/10',
      badgeAr: '🏔️ شحن موثوق للكوردستان',
      featuresAr: [
        'تنسيق مع كبرى شركات الناقل المعتمدة',
        'خدمة دعم باللغة العربية والكردية',
        'إمكانية الاستلام من المكتب الفرعي'
      ]
    }
  ];

  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-baghdad');
  const [searchProvinceQuery, setSearchProvinceQuery] = useState<string>('');

  const activeZone = deliveryZones.find(z => z.id === selectedZoneId) || deliveryZones[0];

  // Quick lookup
  const matchedProvinceZone = searchProvinceQuery.trim()
    ? deliveryZones.find(z => z.provinces.some(p => p.toLowerCase().includes(searchProvinceQuery.toLowerCase())))
    : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Box Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>خريطة ودليل الشحن والتوصيل لجميع المحافظات 🇮🇶</span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  18 محافظة
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              اختر محافظتك أو منطقتك لمعرفة المدة الزمنية المتوقعة، تكلفة التوصيل، ونوع التغليف المحمي لقطعك.
            </p>
          </div>

          {/* Direct Store Pick-Up Badge */}
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-3 shrink-0 text-right">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">استلام مباشر مجاني</span>
              <span className="text-[11px] text-slate-400">شارع الصناعة - مجمع النعمان التجاري</span>
            </div>
          </div>

        </div>

        {/* Quick Search Governorates Bar */}
        <div className="pt-6 relative">
          <div className="max-w-md mx-auto relative">
            <input 
              type="text"
              value={searchProvinceQuery}
              onChange={(e) => setSearchProvinceQuery(e.target.value)}
              placeholder="اكتب اسم محافظتك أو منطقتك (مثلاً: النجف، أربيل، البصرة، الكرخ)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 pr-10 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-right shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {matchedProvinceZone && (
            <div className="max-w-md mx-auto mt-2 bg-slate-950 border border-cyan-500/50 p-3 rounded-xl text-right text-xs text-white flex items-center justify-between">
              <div>
                <span>منطقتك تتبع إلى: </span>
                <span className="font-bold text-cyan-400">{matchedProvinceZone.nameAr}</span>
              </div>
              <button 
                onClick={() => {
                  setSelectedZoneId(matchedProvinceZone.id);
                  setSearchProvinceQuery('');
                }}
                className="px-2.5 py-1 bg-cyan-500 text-slate-950 font-black rounded-lg text-[10px]"
              >
                عرض التفاصيل
              </button>
            </div>
          )}
        </div>

        {/* Interactive Zone Tabs & Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          
          {/* Zone Selector Column */}
          <div className="lg:col-span-5 space-y-3 text-right">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-tech flex items-center gap-1">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>اختر إقليم التوصيل:</span>
            </h4>

            <div className="space-y-2.5">
              {deliveryZones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;

                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? `${zone.bgClass} ${zone.borderClass} shadow-xl`
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1 text-right flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {zone.nameAr}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${zone.bgClass} ${zone.colorClass} border ${zone.borderClass}`}>
                          {zone.badgeAr}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-tech">
                        ⏱️ {zone.estimatedTimeAr}
                      </p>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-xs font-black text-amber-400 font-tech block">
                        {zone.costIQD === 0 ? 'مجاني' : `${zone.costIQD.toLocaleString()} د.ع`}
                      </span>
                      <span className="text-[10px] text-slate-500 font-tech">
                        (${zone.costUSD})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Zone Full Details Panel */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 text-right shadow-2xl relative">
            
            {/* Header */}
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-black ${activeZone.bgClass} ${activeZone.colorClass} border ${activeZone.borderClass}`}>
                  {activeZone.badgeAr}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-tech">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>مدة الوصول: {activeZone.estimatedTimeAr}</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white">
                تفاصيل الشحن والتوصيل لـ {activeZone.nameAr}
              </h3>
            </div>

            {/* Provinces Pills List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">
                المحافظات والمناطق المشمولة في هذا النطاق:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeZone.provinces.map((prov) => (
                  <span 
                    key={prov}
                    className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{prov}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Shipping Specs & Packing Features */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 block">
                مميزات ومعايير السلامة أثناء التوصيل:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {activeZone.featuresAr.map((feat, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost & Direct Tracking Callout */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-tech">أجور الشحن الثابتة:</span>
                <span className="text-xl font-black text-amber-400 font-tech">
                  {activeZone.costIQD.toLocaleString()} د.ع
                  <span className="text-xs text-slate-400 font-normal mr-2">({activeZone.costUSD}$)</span>
                </span>
              </div>

              <a
                href={`https://wa.me/964${storePhone}?text=${encodeURIComponent(`السلام عليكم مكتب القمر، استفسار بخصوص تكلفة ومدة الشحن إلى محافظة (${activeZone.nameAr})`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>تأكيد موعد الشحن عبر الواتساب</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
