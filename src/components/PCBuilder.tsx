import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Trash2, 
  Plus, 
  ShoppingCart, 
  MessageCircle, 
  Sparkles, 
  Gauge, 
  RotateCcw,
  ChevronRight,
  Info
} from 'lucide-react';
import { Product, PCBuildParts, CompatibilityReport, ProductCategory, StoreInfo } from '../types';

interface PCBuilderProps {
  products: Product[];
  currentBuild: PCBuildParts;
  onUpdateBuild: (parts: PCBuildParts) => void;
  currency: 'IQD' | 'USD';
  storeInfo: StoreInfo;
  onAddAllToCart: (items: Product[]) => void;
  onOpenProductModal: (product: Product) => void;
}

export const PCBuilder: React.FC<PCBuilderProps> = ({
  products,
  currentBuild,
  onUpdateBuild,
  currency,
  storeInfo,
  onAddAllToCart,
  onOpenProductModal
}) => {
  const [activeCategoryModal, setActiveCategoryModal] = useState<ProductCategory | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityReport>({
    isCompatible: true,
    totalWattage: 70,
    recommendedPsuWattage: 550,
    estimatedFps: [],
    issues: []
  });
  const [loadingCompatibility, setLoadingCompatibility] = useState(false);

  // Check compatibility via server API whenever build changes
  useEffect(() => {
    async function checkServerCompatibility() {
      setLoadingCompatibility(true);
      try {
        const res = await fetch('/api/pc-builder/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ parts: currentBuild })
        });
        const data = await res.json();
        if (data.success) {
          setCompatibility(data.data);
        }
      } catch (err) {
        console.error('Failed to check compatibility:', err);
      } finally {
        setLoadingCompatibility(false);
      }
    }

    checkServerCompatibility();
  }, [currentBuild]);

  // Apply Preset Builds
  const handleApplyPreset = async (tier: 'budget' | 'mid' | 'ultra') => {
    try {
      const res = await fetch('/api/pc-builder/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });
      const data = await res.json();
      if (data.success && data.data?.parts) {
        onUpdateBuild(data.data.parts);
      }
    } catch (err) {
      console.error('Failed to load preset:', err);
    }
  };

  const handleSelectPart = (category: ProductCategory, product: Product) => {
    const updated = { ...currentBuild };
    if (category === 'cpus') updated.cpu = product;
    if (category === 'gpus') updated.gpu = product;
    if (category === 'motherboards') updated.motherboard = product;
    if (category === 'ram') updated.ram = product;
    if (category === 'storage') updated.storage = product;
    if (category === 'cooling') updated.cooler = product;
    if (category === 'power_supplies') updated.powerSupply = product;
    if (category === 'cases') updated.pcCase = product;
    onUpdateBuild(updated);
    setActiveCategoryModal(null);
  };

  const handleRemovePart = (key: keyof PCBuildParts) => {
    const updated = { ...currentBuild };
    delete updated[key];
    onUpdateBuild(updated);
  };

  const handleClearAll = () => {
    onUpdateBuild({});
  };

  // Build items array
  const selectedPartsList = Object.values(currentBuild).filter((p): p is Product => Boolean(p));

  const totalUSD = selectedPartsList.reduce((sum, p) => sum + p.priceUSD, 0);
  const totalIQD = selectedPartsList.reduce((sum, p) => sum + p.priceIQD, 0);

  const formattedTotal = currency === 'IQD' 
    ? `${totalIQD.toLocaleString()} د.ع` 
    : `$${totalUSD.toLocaleString()}`;

  // Slot definitions
  const slots: { key: keyof PCBuildParts; category: ProductCategory; labelAr: string; labelEn: string; icon: string }[] = [
    { key: 'cpu', category: 'cpus', labelAr: 'المعالج (CPU)', labelEn: 'Processor', icon: '🧠' },
    { key: 'motherboard', category: 'motherboards', labelAr: 'اللوحة الأم (Motherboard)', labelEn: 'Motherboard', icon: '🎛️' },
    { key: 'ram', category: 'ram', labelAr: 'الذاكرة العشوائية (RAM)', labelEn: 'Memory', icon: '⚡' },
    { key: 'gpu', category: 'gpus', labelAr: 'كرت الشاشة (GPU)', labelEn: 'Graphics Card', icon: '🎮' },
    { key: 'storage', category: 'storage', labelAr: 'التخزين السريع (SSD)', labelEn: 'Solid State Drive', icon: '💾' },
    { key: 'cooler', category: 'cooling', labelAr: 'تبريد المعالج (Cooler)', labelEn: 'CPU Cooler', icon: '❄️' },
    { key: 'powerSupply', category: 'power_supplies', labelAr: 'مزود الطاقة (PSU)', labelEn: 'Power Supply', icon: '🔌' },
    { key: 'pcCase', category: 'cases', labelAr: 'كيس الحاسوب (Case)', labelEn: 'Chassis', icon: '🖥️' },
  ];

  // Send Build to WhatsApp
  const handleWhatsAppBuild = () => {
    if (selectedPartsList.length === 0) return;
    const partsSummary = selectedPartsList
      .map(p => `• ${p.nameAr} ($${p.priceUSD} / ${p.priceIQD.toLocaleString()} د.ع)`)
      .join('\n');

    const msg = `*طلب تجميعة بي سي مخصصة من موقع مكتب القمر*\n\n` +
      `🛠️ *القطع المختارة:*\n${partsSummary}\n\n` +
      `⚡ *الاستهلاك التقديري:* ${compatibility.totalWattage}W\n` +
      `💰 *السعر الإجمالي:* ${currency === 'IQD' ? `${totalIQD.toLocaleString()} دينار عراقي` : `$${totalUSD.toLocaleString()} دولار`}\n\n` +
      `أرجو تأكيد توفر القطع وموعد التجميع والفحص في فرع شارع الصناعة.`;

    window.open(`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title & Presets Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="text-right space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
              <Wrench className="w-3.5 h-3.5" />
              <span>مجمع بي سي تفاعلي مع فحص توافقية واستهلاك طاقة فوري</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ابنِ تجميعة البي سي الاحترافية الخاصة بك
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              اختر القطع وستقوم الأداة بفحص توافق المقابس والمقاسات ومعدل الإطارات التقديري فوراً.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">تجميعات مقترحة جاهزة:</span>
            <button
              onClick={() => handleApplyPreset('budget')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              🎮 اقتصادية 1080p ($890)
            </button>
            <button
              onClick={() => handleApplyPreset('mid')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              ⚡ احترافية 2K ($1,890)
            </button>
            <button
              onClick={() => handleApplyPreset('ultra')}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all"
            >
              🔥 تايتان 4K ($3,650)
            </button>
            {selectedPartsList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                title="إفراغ التجميعة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left/Main Column: Parts Selection Slots */}
        <div className="lg:col-span-8 space-y-4">
          {slots.map((slot) => {
            const selected = currentBuild[slot.key];

            return (
              <div 
                key={slot.key}
                className={`rounded-2xl border transition-all p-4 ${
                  selected 
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-md' 
                    : 'bg-slate-950/60 border-slate-800/80 border-dashed hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  
                  {/* Slot Icon & Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{slot.icon}</span>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-400">{slot.labelAr}</div>
                      <div className="text-[11px] text-slate-500 font-tech">{slot.labelEn}</div>
                    </div>
                  </div>

                  {/* Selected Part Details OR Add Button */}
                  {selected ? (
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <div className="text-right max-w-xs sm:max-w-md">
                        <div className="text-sm font-bold text-white line-clamp-1">
                          {selected.nameAr}
                        </div>
                        <div className="text-xs text-amber-400 font-black font-tech">
                          {currency === 'IQD' 
                            ? `${selected.priceIQD.toLocaleString()} د.ع` 
                            : `$${selected.priceUSD.toLocaleString()}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenProductModal(selected)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                          title="تفاصيل القطعة"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveCategoryModal(slot.category)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                        >
                          تغيير
                        </button>
                        <button
                          onClick={() => handleRemovePart(slot.key)}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs"
                          title="حذف القطعة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveCategoryModal(slot.category)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded-xl text-xs font-bold transition-all border border-slate-700 hover:border-amber-400"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>اختيار {slot.labelAr.split(' ')[0]}</span>
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Compatibility, Power, Benchmark & Checkout Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live System Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">ملخص التجميعة</span>
              <span className="text-xs text-slate-400 font-tech">
                {selectedPartsList.length} / 8 قطع مختارة
              </span>
            </div>

            {/* Total Price */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-right">
              <div className="text-xs text-slate-400 mb-1">المجموع الكلي للقطع:</div>
              <div className="text-2xl font-black text-amber-400 font-tech">
                {formattedTotal}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                يشمل التجميع الاحترافي والكابل مانجمنت والفحص الشامل مجاناً
              </div>
            </div>

            {/* Power & Wattage Meter */}
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>استهلاك الطاقة المقدر:</span>
                </span>
                <span className="font-tech font-bold text-amber-400">
                  {compatibility.totalWattage}W
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    compatibility.totalWattage > 850 ? 'bg-red-500' : compatibility.totalWattage > 500 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (compatibility.totalWattage / 1200) * 100)}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>الباور سبلاي المنصوح به:</span>
                <span className="font-tech text-white font-bold">{compatibility.recommendedPsuWattage}W أو أعلى</span>
              </div>
            </div>

            {/* Compatibility Status & Issues */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                {compatibility.isCompatible ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>جميع القطع متوافقة ومثالية للتركيب</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                    <XCircle className="w-4 h-4" />
                    <span>يوجد تعارض في بعض القطع!</span>
                  </span>
                )}
              </div>

              {compatibility.issues.length > 0 && (
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
                  {compatibility.issues.map((issue, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded-lg text-right text-[11px] leading-relaxed border ${
                        issue.type === 'error' 
                          ? 'bg-rose-950/40 border-rose-500/40 text-rose-300' 
                          : issue.type === 'warning'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-bold mb-0.5">{issue.component}</div>
                      <div>{issue.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Benchmark Estimations */}
            {compatibility.estimatedFps.length > 0 && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>معدل الإطارات التقديري للألعاب (FPS):</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {compatibility.estimatedFps.slice(0, 3).map((item, i) => (
                    <div key={i} className="bg-slate-950 p-2 rounded-lg flex items-center justify-between border border-slate-800">
                      <span className="text-slate-300 font-medium truncate max-w-[140px]">{item.game}</span>
                      <div className="flex items-center gap-2 font-tech font-bold">
                        <span className="text-emerald-400">{item.fps1080p} FPS <span className="text-[9px] text-slate-500">(1080p)</span></span>
                        <span className="text-amber-400">{item.fps1440p} FPS <span className="text-[9px] text-slate-500">(2K)</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => onAddAllToCart(selectedPartsList)}
                disabled={selectedPartsList.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedPartsList.length > 0 
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>إضافة كامل التجميعة للسلة</span>
              </button>

              <button
                onClick={handleWhatsAppBuild}
                disabled={selectedPartsList.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-colors border ${
                  selectedPartsList.length > 0
                    ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800/40 text-slate-600 border-slate-800 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>إرسال التجميعة لفرع الصناعة عبر واتساب</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Part Selection Modal */}
      {activeCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  اختر قطعة متوافقة من متجر مكتب القمر
                </h3>
                <p className="text-xs text-slate-400">
                  جميع القطع جديدة ومشمولة بضمان استبدال محلي
                </p>
              </div>

              <button
                onClick={() => setActiveCategoryModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Modal List */}
            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter(p => p.category === activeCategoryModal)
                .map((prod) => {
                  const isSelected = (Object.values(currentBuild) as (Product | undefined)[]).some(p => p?.id === prod.id);

                  return (
                    <div 
                      key={prod.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500' 
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2 text-right">
                        <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                          <img src={prod.image} alt={prod.nameAr} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-slate-400">{prod.brand}</div>
                        <h4 className="text-sm font-bold text-white line-clamp-2">{prod.nameAr}</h4>
                        <div className="text-xs text-slate-400 font-tech">{prod.specs.vram || prod.specs.socket || prod.specs.capacity}</div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div className="text-sm font-black text-amber-400 font-tech">
                          {currency === 'IQD' ? `${prod.priceIQD.toLocaleString()} د.ع` : `$${prod.priceUSD}`}
                        </div>

                        <button
                          onClick={() => handleSelectPart(activeCategoryModal, prod)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
                        >
                          {isSelected ? 'مختارة حالياً' : 'اختيار القطعة'}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
