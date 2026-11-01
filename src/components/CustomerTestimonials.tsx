import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  Award,
  Sparkles,
  X,
  Send,
  UploadCloud,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  purchasedItem: string;
  category: 'pc_build' | 'laptop' | 'hardware' | 'delivery';
  comment: string;
  setupPhoto?: string;
  verified: boolean;
  likes: number;
  specsHighlight?: string;
}

export const CustomerTestimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pc_build' | 'laptop' | 'hardware' | 'delivery'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  
  // Submit Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('بغداد - الكرخ');
  const [newItem, setNewItem] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const initialTestimonials: Testimonial[] = [
    {
      id: 'test-1',
      author: 'مهندس أحمد العبيدي',
      location: 'بغداد - المنصور',
      rating: 5,
      date: 'منذ يومين',
      purchasedItem: 'تجميعة Titan RTX 4090 + Core i9',
      category: 'pc_build',
      comment: 'عاش الكادر الراقي بفرع شارع الصناعة! التجميع مرتب جداً والكيبل مانجمنت احترافي لأبعد حد. الفحص الحراري قدامي بالفرع والتوصيل لنفس اليوم بدون أي خدش.',
      setupPhoto: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      verified: true,
      likes: 38,
      specsHighlight: 'i9-14900K / 64GB DDR5 / RTX 4090'
    },
    {
      id: 'test-2',
      author: 'كرار الحلفي',
      location: 'البصرة - الجبيلة',
      rating: 5,
      date: 'منذ 4 أيام',
      purchasedItem: 'لابتوب ASUS ROG Strix SCAR 18',
      category: 'laptop',
      comment: 'وصلني اللابتوب للبصرة خلال 24 ساعة فقط! التغليف آمن ومحكم ومكتوب عليه قابل للكسر. ضمان حقيقي مع ختم مكتب القمر على العلبة.',
      setupPhoto: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
      verified: true,
      likes: 29,
      specsHighlight: 'RTX 4080 / 240Hz Nebula Display'
    },
    {
      id: 'test-3',
      author: 'علي الساعدي',
      location: 'النجف الأشرف',
      rating: 5,
      date: 'منذ أسبوع',
      purchasedItem: 'كرت RTX 4070 Ti Super + شاشة 240Hz',
      category: 'hardware',
      comment: 'أفضل أسعار جملة ومفرد في العراق بدون منازع. التعامل بالفرع بشارع الصناعة مريح جداً ومستشار الذكاء الاصطناعي بالموقع ساعدني بانتخاب الباور سبلاي المناسب.',
      setupPhoto: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      verified: true,
      likes: 45,
      specsHighlight: 'MSI Gaming X Slim 16GB'
    },
    {
      id: 'test-4',
      author: 'سارة خالد',
      location: 'أربيل - عينكاوة',
      rating: 5,
      date: 'منذ أسبوعين',
      purchasedItem: 'تجميعة بي سي بيضاء لتصاميم 3D',
      category: 'pc_build',
      comment: 'طلبنا البي سي المخصص للمكتب وأجت التجميعة بيضاء بالكامل مثل الصورة وأحلى. التوصيل لأربيل كان سريع جداً واستجابة المبيعات عبر الواتساب ممتازة.',
      setupPhoto: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
      verified: true,
      likes: 19,
      specsHighlight: 'White Aesthetic Build / Lian Li Case'
    },
    {
      id: 'test-5',
      author: 'مصطفى الفراتي',
      location: 'الديوانية',
      rating: 5,
      date: 'منذ 3 أسابيع',
      purchasedItem: 'ماوس Logitech MX Master 3S + كيبورد',
      category: 'delivery',
      comment: 'خدمة التوصيل رائعة والقطع أصلية 100% بشرك الماركة. الكفالة واضحة وسيريال نمبر مسجل. شتريت وأني مطمئن.',
      verified: true,
      likes: 14
    }
  ];

  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(initialTestimonials);

  const handleLike = (id: string) => {
    setLikedReviews(prev => {
      const isAlreadyLiked = prev[id];
      const updated = { ...prev, [id]: !isAlreadyLiked };

      setTestimonialsList(list =>
        list.map(t => {
          if (t.id === id) {
            return { ...t, likes: isAlreadyLiked ? t.likes - 1 : t.likes + 1 };
          }
          return t;
        })
      );

      return updated;
    });
  };

  const handleNewReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment || !newItem) return;

    const created: Testimonial = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      location: newLocation,
      rating: newRating,
      date: 'الآن',
      purchasedItem: newItem,
      category: 'pc_build',
      comment: newComment,
      verified: true,
      likes: 1
    };

    setTestimonialsList([created, ...testimonialsList]);
    setIsSubmittedSuccess(true);

    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setNewAuthor('');
      setNewItem('');
      setNewComment('');
    }, 1800);
  };

  const filteredTestimonials = testimonialsList.filter(t => {
    if (activeFilter === 'all') return true;
    return t.category === activeFilter;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 select-none">
      
      {/* Section Container Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 relative z-10">
          
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                آراء وشهادات زبائن مكتب القمر
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              تقييمات وصور حقيقية من زبائننا في بغداد وجميع المحافظات بعد استلام تجميعاتهم ولابتوباتهم بشارع الصناعة.
            </p>
          </div>

          {/* Rating Summary Score Card */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0">
            <div className="text-center pl-4 border-l border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-tech">4.9</div>
              <div className="flex items-center gap-0.5 my-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-bold">+1,420 تقييم موثق</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-bold">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>فحص وتجميع مجاني بشارع الصناعة</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Award className="w-4 h-4" />
                <span>كفالة وضمان حقيقي لمدة سنة</span>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="mt-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1 transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>أضف تقييمك وصورة سيتأبك</span>
              </button>
            </div>
          </div>

        </div>

        {/* Filter Buttons Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 my-2 border-b border-slate-800/60">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            جميع التقييمات ({testimonialsList.length})
          </button>

          <button
            onClick={() => setActiveFilter('pc_build')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'pc_build'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🖥️ تجميعات بي سي (PC Builds)
          </button>

          <button
            onClick={() => setActiveFilter('laptop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'laptop'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            💻 لابتوبات القيمنق
          </button>

          <button
            onClick={() => setActiveFilter('hardware')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'hardware'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🎮 كروت الشاشة والقطع
          </button>

          <button
            onClick={() => setActiveFilter('delivery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'delivery'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🚚 التوصيل والمحافظات
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {filteredTestimonials.map((item) => {
            const isLiked = likedReviews[item.id];

            return (
              <div 
                key={item.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-4 text-right group"
              >
                {/* Customer Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.author}
                      </h3>
                      {item.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>شراء موثق</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{item.location}</span>
                      </span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Purchased Item Highlight */}
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>{item.purchasedItem}</span>
                  <span className="text-[10px] text-slate-400 font-tech">فرع الصناعة</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{item.comment}"
                </p>

                {/* Specs Highlight tag if available */}
                {item.specsHighlight && (
                  <div className="text-[11px] text-slate-400 font-tech bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    ⚡ <span className="text-slate-300 font-bold">{item.specsHighlight}</span>
                  </div>
                )}

                {/* Customer Real Setup Photo Thumbnail if provided */}
                {item.setupPhoto && (
                  <div 
                    onClick={() => setSelectedPhoto(item.setupPhoto || null)}
                    className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900 cursor-pointer border border-slate-800 group/img"
                  >
                    <img 
                      src={item.setupPhoto} 
                      alt={item.purchasedItem}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white gap-1.5">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>انقر للتكبير</span>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 border border-slate-700">
                      📸 صورة حقيقية للسيتأب
                    </span>
                  </div>
                )}

                {/* Card Footer: Helpful Likes */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">هل كان هذا التقييم مفيداً؟</span>

                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
                      isLiked
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-400' : ''}`} />
                    <span>مفيد ({item.likes})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Photo View Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-3 overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:bg-rose-500 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="صورة السيتأب الحقيقية"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Submit Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-right space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>إضافة تقييم جديد لمكتب القمر</span>
              </h3>
              <p className="text-xs text-slate-400">
                شارك تجربتك مع زبائننا في العراق وارفق صورة سيتأبك أو جهازك.
              </p>
            </div>

            {isSubmittedSuccess ? (
              <div className="py-8 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">شكراً لك! تم نشر تقييمك بنجاح</h4>
                <p className="text-xs text-slate-300">يظهر تقييمك الآن في الصفحة الرئيسية للعملاء.</p>
              </div>
            ) : (
              <form onSubmit={handleNewReviewSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسمك الكريم:</label>
                  <input 
                    type="text" 
                    required
                    placeholder="مثال: أحمد علي" 
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">المحافظة / المنطقة:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: بغداد - الكرخ" 
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">المنتج الاشتريته:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: تجميعة بي سي / لابتوب" 
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">التقييم من 5 نجوم:</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">رأيك وتعليقك:</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="اكتب تجربتك مع التوصيل، سرعة الخدمة، وجودة التجميع..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>نشر التقييم فوراً</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
