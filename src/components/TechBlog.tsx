import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  Cpu, 
  Thermometer, 
  Zap, 
  Laptop, 
  HelpCircle, 
  X, 
  Share2, 
  CheckCircle2, 
  Bot,
  Bookmark,
  Eye
} from 'lucide-react';

export interface Article {
  id: string;
  titleAr: string;
  summaryAr: string;
  category: 'guides' | 'gpus' | 'cooling' | 'laptops' | 'ram_psu';
  categoryLabelAr: string;
  readTimeMin: number;
  difficultyAr: 'مبتدئ' | 'متوسط' | 'متقدم';
  author: string;
  date: string;
  image: string;
  contentAr: {
    intro: string;
    keyPoints: string[];
    detailedSteps: { title: string; desc: string }[];
    conclusion: string;
    recommendedProductType?: string;
  };
  viewsCount: number;
}

interface TechBlogProps {
  onOpenAIAdvisor?: () => void;
  onSelectCategoryFilter?: (category: string) => void;
}

export const TechBlog: React.FC<TechBlogProps> = ({
  onOpenAIAdvisor,
  onSelectCategoryFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticles, setSavedArticles] = useState<{ [key: string]: boolean }>({});

  const articles: Article[] = [
    {
      id: 'art-1',
      titleAr: 'كيف تختار كرت الشاشة (GPU) المناسب لدقة شاشتك دون تبذير؟',
      summaryAr: 'دليل شامل لربط كروت Nvidia RTX 40 و AMD RX بفرق الدقة (1080p, 2K, 4K) واختيار حجم الـ VRAM المطلوب للألعاب الحديثة.',
      category: 'gpus',
      categoryLabelAr: 'كروت الشاشة والأداء',
      readTimeMin: 3,
      difficultyAr: 'مبتدئ',
      author: 'مهندس التجميع بفرع الصناعة',
      date: 'سبتمبر 2026',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
      viewsCount: 1240,
      contentAr: {
        intro: 'اختيار كرت الشاشة هو القرار الأهم والأعلى تكلفة في تجميعة الحاسوب. الخطأ الشائع هو شراء كرت خارق جداً لشاشة 1080p عادية، أو العكس شراء كرت متوسط لشاشة 4K.',
        keyPoints: [
          'دقة 1080p (FHD): تحتاج كروت مثل RTX 4060 أو RX 7600 بحجم ذاكرة 8GB إلى 12GB.',
          'دقة 1440p (2K): المنطقة الذهبية للقيمنق! تتطلب كروت RTX 4070 Super أو RX 7800 XT بذاكرة 12GB - 16GB.',
          'دقة 4K Ultra: تتطلب كروت الفئة العليا مثل RTX 4080 Super أو RTX 4090 بذاكرة لا تقل عن 16GB إلى 24GB.'
        ],
        detailedSteps: [
          {
            title: '1. حدد دقة ومعدل تحديث شاشتك (Hz)',
            desc: 'إذا كانت شاشتك 1080p 144Hz، فإن كرت RTX 4060 يعطيك الأداء الأقصى ولن تستفيد من كرت 4080 بدون ترقية الشاشة أولاً.'
          },
          {
            title: '2. أهمية VRAM في ألعاب 2026',
            desc: 'الألعاب الحديثة ذات القوام الفائق (Ultra Textures) تستهلك أكثر من 10GB VRAM، لذا نوصي بـ 12GB كحد أدنى للتجميعات المتوسطة والعليا.'
          },
          {
            title: '3. تقنيات التكبير الذكي (DLSS 3.5 & FSR 3)',
            desc: 'تتيح لك كروت RTX 40 مضاعفة الفريمات عبر مولد الإطارات (Frame Generation) بسلاسة عالية جداً.'
          }
        ],
        conclusion: 'يمكنك تجربة حاسبة التجميع الذكي في موقعنا لضمان توافق الكرت مع الباور سبلاي والمعالج بدقة.',
        recommendedProductType: 'gpus'
      }
    },
    {
      id: 'art-2',
      titleAr: 'كيف تتجنب عنق الزجاجة (Bottleneck) بين المعالج وكرت الشاشة؟',
      summaryAr: 'شرح مبسط لمفهوم عنق الزجاجة الحراري والبرمجي وكيفية تحقيق التوازن المثالي بين Intel Core و AMD Ryzen مع كروت الشاشة.',
      category: 'guides',
      categoryLabelAr: 'أدلة التجميع الاحترافي',
      readTimeMin: 4,
      difficultyAr: 'متوسط',
      author: 'قسم الدعم الفني - مكتب القمر',
      date: 'أغسطس 2026',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      viewsCount: 980,
      contentAr: {
        intro: 'عنق الزجاجة يحدث عندما يكون أحد الأجزاء (مثل المعالج) أبطأ بكثير من الجزء الآخر (كرت الشاشة)، مما يجبر الكرت على الانتظار ويقلل الفريمات الفعلية.',
        keyPoints: [
          'عنق زجاجة المعالج (CPU Bottleneck): يحدث غالباً على دقة 1080p مع كروت قوية جداً.',
          'عنق زجاجة كرت الشاشة (GPU Bottleneck): هذا هو الوضع الطبيعي والمرغوب في الألعاب!',
          'التوازن الأمثل: دمج معالج مثل Ryzen 7 7800X3D أو Core i7-14700K مع كروت الفئة العليا.'
        ],
        detailedSteps: [
          {
            title: '1. لا تدمج معالج قديم مع كرت حديث',
            desc: 'معالج من الجيل التاسع مثلاً سيعوق كرت RTX 4070 بنسبة تصل إلى 35% من أدائه الفعلي.'
          },
          {
            title: '2. دقة الشاشة تغير المعادلة',
            desc: 'كلما زادت الدقة إلى 4K، انتقل الحمل بأكمله على كرت الشاشة وقل الاعتماد على سرعة النواة الواحدة للمواصفات.'
          }
        ],
        conclusion: 'استشر مهندسينا في شارع الصناعة أو استخدم المساعد الذكي بالموقع للتحقق من نسبة التوافق.',
        recommendedProductType: 'cpus'
      }
    },
    {
      id: 'art-3',
      titleAr: 'نصائح حماية البي سي من حرارة الصيف العالي في العراق',
      summaryAr: 'طرق مجربة لخفض حرارة المعالج وكرت الشاشة 10 درجات مئوية من خلال ضبط الضغط الهوائي داخل الكيس والتبريد المائي.',
      category: 'cooling',
      categoryLabelAr: 'التبريد والصيانة',
      readTimeMin: 3,
      difficultyAr: 'مبتدئ',
      author: 'فريق الصيانة والتجميع',
      date: 'يوليو 2026',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      viewsCount: 1560,
      contentAr: {
        intro: 'مع ارتفاع درجات الحرارة المحيطة في الصيف، تنخفض كفاءة التبريد داخل الكيس مما يسبب ظاهرة Thermal Throttling وانخفاض الفريمات المفاجئ.',
        keyPoints: [
          'مفهوم الضغط الهوائي الموجب (Positive Airflow): مروحتي إدخال أكثر من مراوح الإخراج لتجنب الأتربة.',
          'استبدال المعجون الحراري (Thermal Paste) كل 12 إلى 18 شهراً.',
          'التبريد المائي المغلق (AIO Liquid Cooling) لـ معالجات i9 و Ryzen 9.'
        ],
        detailedSteps: [
          {
            title: '1. تنظيف الفلاتر الشبكية دورياً',
            desc: 'تراكم الغبار على فلتر الكيس الأمامي يقلل كمية الهواء البارد الداخل بنسبة 50%.'
          },
          {
            title: '2. تعديل منحنى المروحة (Fan Curve)',
            desc: 'عبر برامج مثل BIOS أو MSI Afterburner لتشغيل المراوح بـ 80% عند وصول الحرارة لـ 65 مئوية.'
          }
        ],
        conclusion: 'نوفر خدمة تنظيف وفحص حراري مع استبدال المعجون الأصلي مجاناً مع التجميعات.',
        recommendedProductType: 'cooling'
      }
    },
    {
      id: 'art-4',
      titleAr: 'DDR4 أم DDR5؟ هل حان وقت الترقية في 2026؟',
      summaryAr: 'مقارنة الفروق الحقيقية في الفريمات وسرعة نقل البيانات وزمن التأخير (Latency) بين ذواكر DDR4 و DDR5.',
      category: 'ram_psu',
      categoryLabelAr: 'الذواكر والتغدية الكهربائية',
      readTimeMin: 2,
      difficultyAr: 'متوسط',
      author: 'قسم الهاردوير - القمر',
      date: 'يونيو 2026',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
      viewsCount: 840,
      contentAr: {
        intro: 'أصبحت ذواكر DDR5 هي المعيار القياسي لجميع منصات Intel LGA1700/1851 و AMD AM5 بفضل انخفاض أسعارها وزيادة النطاق الترددي.',
        keyPoints: [
          'ترددات DDR5 تبدأ من 5600MHz وتصل إلى 7200MHz+ مقارنة بـ 3200MHz لـ DDR4.',
          'تحسن ملحوظ في ألعاب العالم المفتوح وبرامج البرمجة والرندر.',
          'سعة 32GB (2x16GB) هي الحجم المثالي لتجميعات الألعاب الحديثة.'
        ],
        detailedSteps: [
          {
            title: 'تفعيل ملف XMP أو EXPO',
            desc: 'تذكر دائماً دخول الـ BIOS وتفعيل ملف السرعة للحصول على التردد الكامل المدفوع ثمنه.'
          }
        ],
        conclusion: 'تتوفر كافة ذواكر Corsair, G.Skill, Kingston الأصلية بفرع الصناعة مع كفالة استبدال.',
        recommendedProductType: 'ram'
      }
    }
  ];

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredArticles = articles.filter(art => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 select-none">
      
      {/* Container Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background Ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 relative z-10">
          
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                مدونة القمر التقنية والنصائح الإرشادية
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              مقالات ودليل مبسط من مهندسينا بشارع الصناعة لمساعدتك في التجميع، اختيار القطع، وتفادي أخطاء الحرارة وعنق الزجاجة.
            </p>
          </div>

          {/* AI Advisor Callout Box */}
          {onOpenAIAdvisor && (
            <button
              onClick={onOpenAIAdvisor}
              className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-slate-950 to-slate-950 border border-amber-500/40 p-4 rounded-2xl text-right hover:border-amber-400 transition-all group shrink-0"
            >
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-black shadow-md group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black text-amber-400 flex items-center gap-1">
                  <span>هل تحتاج استشارة فورية؟</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-slate-300">اسأل خبير القمر الذكي لترشيح أفضل قطع لبجتك</div>
              </div>
            </button>
          )}

        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 my-2 border-b border-slate-800/60">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            جميع المقالات ({articles.length})
          </button>

          <button
            onClick={() => setActiveCategory('gpus')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'gpus'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🎮 كروت الشاشة والأداء
          </button>

          <button
            onClick={() => setActiveCategory('guides')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'guides'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🛠️ أدلة التجميع الاحترافي
          </button>

          <button
            onClick={() => setActiveCategory('cooling')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'cooling'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ❄️ التبريد والحرارة
          </button>

          <button
            onClick={() => setActiveCategory('ram_psu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'ram_psu'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ⚡ الذواكر والتغذية
          </button>
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
          {filteredArticles.map((article) => {
            const isSaved = savedArticles[article.id];

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group text-right space-y-3"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img 
                    src={article.image} 
                    alt={article.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 px-2 py-0.5 rounded-md border border-slate-800">
                    {article.categoryLabelAr}
                  </div>

                  <button
                    onClick={(e) => handleToggleSave(article.id, e)}
                    title="حفظ المقال"
                    className={`absolute top-2 left-2 p-1.5 rounded-lg border backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                        : 'bg-black/60 hover:bg-black/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-cyan-300' : ''}`} />
                  </button>
                </div>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMin} دقائق قراءة</span>
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    مستوى: {article.difficultyAr}
                  </span>
                </div>

                {/* Article Title & Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                    {article.titleAr}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.summaryAr}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-amber-400 transition-colors">
                  <span className="flex items-center gap-1">
                    <span>قراءة المقال الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 font-tech">
                    <Eye className="w-3 h-3" />
                    <span>{article.viewsCount}</span>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Full Article Modal View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right space-y-5 shadow-2xl relative my-8 my-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 left-5 p-2 rounded-full bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <span className="bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                  {selectedArticle.categoryLabelAr}
                </span>
                <span>•</span>
                <span>بقلم: {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedArticle.titleAr}
              </h2>
            </div>

            {/* Main Image */}
            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.titleAr}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 italic font-medium">
                "{selectedArticle.contentAr.intro}"
              </p>

              {/* Key Takeaways */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>النقاط الأساسية والموجز:</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pr-1">
                  {selectedArticle.contentAr.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Detailed Steps */}
              <div className="space-y-3 pt-2">
                {selectedArticle.contentAr.detailedSteps.map((step, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <h5 className="font-bold text-amber-400 text-sm">{step.title}</h5>
                    <p className="text-slate-300 text-xs sm:text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>

              <p className="pt-2 text-slate-400 text-xs border-t border-slate-800">
                {selectedArticle.contentAr.conclusion}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {onOpenAIAdvisor && (
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenAIAdvisor();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Bot className="w-4 h-4" />
                  <span>استشر الذكاء الاصطناعي حول هذه القطع</span>
                </button>
              )}

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors"
              >
                إغلاق المقال
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
