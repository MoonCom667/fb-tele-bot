import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CreditCard, 
  MapPin, 
  MessageCircle, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'warranty' | 'shipping' | 'building' | 'payment' | 'location';
  questionAr: string;
  answerAr: string;
  badgeAr?: string;
}

export const FAQSection: React.FC<{
  onOpenAIAdvisor?: () => void;
  onOpenLocation?: () => void;
  storePhone?: string;
  storeWhatsapp?: string;
}> = ({
  onOpenAIAdvisor,
  onOpenLocation,
  storePhone = '07708732185',
  storeWhatsapp = '9647708732185'
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'warranty' | 'shipping' | 'building' | 'payment' | 'location'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqList: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'warranty',
      questionAr: 'ما هي مدة ونوع الضمان المقدم على القطع والتجميعات الجاهزة؟',
      answerAr: 'جميع القطع الجديدة (معالجات، كروت شاشة، لوحات أم، رامات، هاردات، شاشات) تأتي بضمان استبدال حقيقي مدفوع لمدة سنة كاملة مسجلة بالرقم التسلسلي (Serial Number) بالمنظومة الإلكترونية للمتجر. في حال وجود خلل مصنعي، يتم فحص وتغيير القطعة فوراً بدون تأخير.',
      badgeAr: '🛡️ ضمان استبدال حقيقي'
    },
    {
      id: 'faq-2',
      category: 'shipping',
      questionAr: 'كم تستغرق مدة توصيل الشحنة داخل بغداد ولجميع المحافظات؟',
      answerAr: 'التوصيل داخل مناطق بغداد يكون بنفس اليوم (خلال 2 إلى 5 ساعات عبر سيارات المتجر المجهزة). أما لباقي المحافظات (الوسط، الجنوب، والشمال وإقليم كوردستان) فيتم الشحن عبر شركات التوصيل المعتمدة بتغليف هيدروليكي محمي للزجاج والقطع واستلام الشحنة خلال 24 - 48 ساعة كحد أقصى.',
      badgeAr: '🚚 توصيل سريع لكل العراق'
    },
    {
      id: 'faq-3',
      category: 'building',
      questionAr: 'هل يضمن مجمع البي سي التفاعلي بالمتجر التوافقية التامة للقطع والحرارة؟',
      answerAr: 'نعم! مجمع البي سي يعتمد خوارزميات ذكية لمنع تركيب أي معالج مع سوكيت غير مطابق، أو تبريد غير كافٍ للـ TDP، أو مزود طاقة (PSU) بواتية أقل من حاجة كرت الشاشة. كما يمكنك الاستعانة بمستشار القمر (AI) للحصول على اقتراحات متكافئة بالأداء مع عدم وجود اختناق (Bottleneck).',
      badgeAr: '⚡ خالي من الاختناق'
    },
    {
      id: 'faq-4',
      category: 'payment',
      questionAr: 'ما هي طرق الدفع المتاحة للطلب من المتجر؟',
      answerAr: 'نوفر الدفع عند الاستلام (Cash on Delivery) بعد معانية شحنتك، بالإضافة إلى الدفع الإلكتروني المباشر عبر زين كاش (ZainCash)، الماستر كارد، والفيزا كارد، مع تحويل الفاتورة الرسمية الصادرة من المتجر.',
      badgeAr: '💳 دفع عند الاستلام وزين كاش'
    },
    {
      id: 'faq-5',
      category: 'location',
      questionAr: 'أين يقع معرض ومحل مكتب القمر للحاسبات في بغداد؟',
      answerAr: 'يقع الفرع الرئيسي في بغداد - شارع الصناعة - مجمع النعمان التجاري (مقابل الجامعة التكنولوجية). نرحب بزيارتكم طيلة أيام الأسبوع من السبت إلى الخميس (من الساعة 9:30 صباحاً وحتى 8:30 مساءً) للاستلام المباشر أو المعاينة والتركيب الفوري.',
      badgeAr: '📍 شارع الصناعة - بغداد'
    },
    {
      id: 'faq-6',
      category: 'building',
      questionAr: 'هل تأتي التجميعات الجاهزة مع تنصيب الويندوز والتعريفات مجاناً؟',
      answerAr: 'بالتأكيد! جميع التجميعات والبي سي الجاهزة والمجمعة خصيصاً تسلم جاهزة للعمل مباشرة (Plug & Play) مع تنصيب نظام Windows 11 الأصلي المحدث، وتحديث أحدث تعريفات كروت الشاشة (NVIDIA Game Ready / AMD Adrenalin)، واختبار درجة الحرارة بالفرع.',
      badgeAr: '🖥️ جاهزة للتشغيل مباشرة'
    }
  ];

  const filteredFaqs = faqList.filter(faq => {
    if (activeTab !== 'all' && faq.category !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.questionAr.toLowerCase().includes(q) || faq.answerAr.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Outer Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>الأسئلة الشائعة وإجابات الضمان والتوصيل ❓</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              إجابات مباشرة ودقيقة على أكثر استفسارات العملاء حول الضمان، الشحن، التجميعات، والدفع.
            </p>
          </div>

          {/* AI Advisor Direct Ask CTA */}
          {onOpenAIAdvisor && (
            <button
              onClick={onOpenAIAdvisor}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs hover:border-cyan-400 transition-all flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>عندك سؤال خاص؟ اسأل مستشار الذكاء الاصطناعي</span>
            </button>
          )}

        </div>

        {/* Live Search & Category Tabs Bar */}
        <div className="pt-6 space-y-4">
          
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة (مثلاً: ضمان، توصيل، زين كاش، ويندوز)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 pr-10 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all text-right shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              جميع الأسئلة
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'warranty' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>الضمان والكفالة</span>
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'shipping' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>الشحن والتوصيل</span>
            </button>
            <button
              onClick={() => setActiveTab('building')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'building' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>التجميعات والتركيب</span>
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'payment' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>طرق الدفع</span>
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'location' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>الموقع والفرع</span>
            </button>
          </div>

        </div>

        {/* Accordions List */}
        <div className="space-y-3 pt-6">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              لم نجد إجابة تطابق البحث "{searchQuery}". يمكنك التواصل مباشرة معنا عبر الواتساب!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div 
                  key={faq.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200 text-right"
                >
                  {/* Header / Question */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4.5 sm:p-5 flex items-center justify-between gap-4 text-right hover:bg-slate-900/50 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.questionAr}
                      </span>
                      {faq.badgeAr && (
                        <span className="hidden sm:inline-block text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {faq.badgeAr}
                        </span>
                      )}
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                  </button>

                  {/* Body / Answer */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/80 animate-in fade-in duration-200 space-y-2">
                      <p>{faq.answerAr}</p>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Footer Support Banner */}
        <div className="mt-8 p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-right">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">لم تجد إجابة على سؤالك؟</span>
            <span className="text-[11px] text-slate-400">فريق مبيعات مكتب القمر جاهز للإجابة الفورية عبر الواتساب والهاتف.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${storeWhatsapp}?text=${encodeURIComponent('السلام عليكم مكتب القمر، عندي استفسار خاص قبل الطلب')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>استفسر عبر الواتساب</span>
            </a>

            <a
              href={`tel:${storePhone}`}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span className="font-tech">{storePhone}</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
