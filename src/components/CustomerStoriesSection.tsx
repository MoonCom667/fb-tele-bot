import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Video, 
  Sparkles, 
  ThumbsUp, 
  Quote, 
  Monitor, 
  Cpu, 
  ShieldCheck, 
  X,
  Volume2,
  VolumeX,
  MessageCircle
} from 'lucide-react';

interface CustomerStory {
  id: string;
  customerName: string;
  cityAr: string;
  avatar: string;
  buildTitleAr: string;
  specSummaryAr: string;
  rating: number;
  reviewDateAr: string;
  quoteAr: string;
  fullStoryAr: string;
  buildImage: string;
  hasVideo: boolean;
  videoThumbnail?: string;
  likesCount: number;
  verifiedPurchase: boolean;
}

export const CustomerStoriesSection: React.FC<{ onOpenAIAdvisor?: () => void }> = ({ onOpenAIAdvisor }) => {
  const [activeStoryModal, setActiveStoryModal] = useState<CustomerStory | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likedStoryIds, setLikedStoryIds] = useState<string[]>([]);

  const stories: CustomerStory[] = [
    {
      id: 'story-1',
      customerName: 'م. مهند الفتلاوي',
      cityAr: 'بغداد - الكرادة',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      buildTitleAr: 'تجميعة الذكاء الاصطناعي والمونتاج الثقيل (RTX 4090 + i9)',
      specSummaryAr: 'Core i9-14900K • RTX 4090 24GB • 64GB DDR5 • 2TB NVMe Gen4',
      rating: 5,
      reviewDateAr: 'قبل 3 أيام',
      quoteAr: 'الترتيب والتبريد بالفرع شيء غير طبيعي! حاسوب كامل مجهز خلال 4 ساعات مع الضمان.',
      fullStoryAr: 'كنت أبحث عن مكتب يقدم لي تجميعة مخصصة لتدريب نماذج الذكاء الاصطناعي والرندر. شباب مكتب القمر بشارع الصناعة نصحوني بالتوليفة الأنسب، ورتبوا الكابلات بنظافة فائقة، وتم فحص الحرارة لمدة ساعتين تحت أقصى ضغط قبل الاستلام.',
      buildImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80',
      hasVideo: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
      likesCount: 142,
      verifiedPurchase: true
    },
    {
      id: 'story-2',
      customerName: 'دانيال كوردستاني',
      cityAr: 'أربيل - عينكاوة',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      buildTitleAr: 'سيتأب القيمنق الأبيض البانورامي (Ryzen 7800X3D + 4070 Ti Super)',
      specSummaryAr: 'Ryzen 7 7800X3D • RTX 4070 Ti Super White • 32GB RGB RAM • OLED 240Hz',
      rating: 5,
      reviewDateAr: 'قبل أسبوع',
      quoteAr: 'وصلت الشحنة لأربيل بتغليف حماية هيدروليكي آمن بدون أي خدش بالزجاج البانورامي!',
      fullStoryAr: 'طلبت البي سي من أربيل وكان عندي تخوف من كسر الزجاج أو كرت الشاشة أثناء الشحن، لكن التغليف كان خرافي ومحاط بأسفنج صلب كاستوم. البي سي يشتغل بسلاسة 240 هرتز على ألعاب العصر!',
      buildImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&auto=format&fit=crop&q=80',
      hasVideo: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&auto=format&fit=crop&q=80',
      likesCount: 98,
      verifiedPurchase: true
    },
    {
      id: 'story-3',
      customerName: 'علي الحسيني (ستريمر)',
      cityAr: 'النجف الأشرف',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      buildTitleAr: 'تجميعة البث المباشر المزدوج والمحتوى (Dual PC Setup)',
      specSummaryAr: 'RTX 4080 Super • Ryzen 9 7900X • Elgato 4K60 Pro • Lian Li Case',
      rating: 5,
      reviewDateAr: 'قبل 10 أيام',
      quoteAr: 'خدمة الدعم الفني بعد البيع ممتازة، ساعدوني بتعديل إعدادات الـ OBS بالكامل عبر الواتساب!',
      fullStoryAr: 'أنا أقدم بث مباشر يومي وأحتاج استقرار تام بدون دبات بالفريمات. شباب القمر اختاروا لي تجميعة متوازنة واستجابتهم سريعة جداً لأي استفسار.',
      buildImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80',
      hasVideo: false,
      likesCount: 115,
      verifiedPurchase: true
    }
  ];

  const handleToggleLike = (storyId: string) => {
    setLikedStoryIds(prev => 
      prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Box Container */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Quote className="w-5 h-5 fill-slate-950" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>قصص وتجارب عملاء مكتب القمر الحقيقية</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  فيديوهات وصور حية 🎥
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              شاهد استعراضات وتجارب زبائننا الواقعية بعد استلام وتجربة تجميعاتهم في مختلف المحافظات.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-2xl shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% تقييمات موثقة بالشراء</span>
          </div>

        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative z-10">
          {stories.map((story) => {
            const isLiked = likedStoryIds.includes(story.id);

            return (
              <div 
                key={story.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-4 text-right group relative"
              >
                
                {/* Media Stage (Build Photo or Video Reel) */}
                <div 
                  onClick={() => {
                    setActiveStoryModal(story);
                    setIsVideoPlaying(true);
                  }}
                  className="aspect-video rounded-xl bg-slate-900 overflow-hidden relative cursor-pointer group/img border border-slate-800 flex items-center justify-center"
                >
                  <img 
                    src={story.buildImage} 
                    alt={story.buildTitleAr}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Play Video Overlay Badge */}
                  {story.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all group-hover/img:scale-110">
                        <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Video Badge Tag */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Video className="w-3 h-3 text-amber-400" />
                    <span>{story.hasVideo ? 'فيديو استعراض التجميعة' : 'صورة السيتأب المكتمل'}</span>
                  </div>

                  <div className="absolute bottom-2 right-2 text-[10px] text-slate-300 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-800 font-tech">
                    📍 {story.cityAr}
                  </div>
                </div>

                {/* Customer Info Header */}
                <div className="flex items-center gap-3">
                  <img 
                    src={story.avatar} 
                    alt={story.customerName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/50 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-white">
                        {story.customerName}
                      </h3>
                      {story.verifiedPurchase && (
                        <span title="مشتري مؤكد">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-slate-400 font-tech mr-1">{story.reviewDateAr}</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold text-amber-300 line-clamp-1">
                    {story.buildTitleAr}
                  </h4>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{story.quoteAr}"
                  </p>
                </div>

                {/* Specs Summary Pill */}
                <div className="text-[10px] font-tech text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="line-clamp-1">{story.specSummaryAr}</span>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleLike(story.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      isLiked 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-400' : ''}`} />
                    <span>{story.likesCount + (isLiked ? 1 : 0)} إعجاب</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveStoryModal(story);
                      setIsVideoPlaying(true);
                    }}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>قراءة التجربة الكاملة</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* STORY DETAIL & VIDEO MODAL */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-6 text-right relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setActiveStoryModal(null);
                setIsVideoPlaying(false);
              }}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <img src={activeStoryModal.avatar} alt={activeStoryModal.customerName} className="w-12 h-12 rounded-full object-cover border-2 border-amber-500" />
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>{activeStoryModal.customerName}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </h3>
                <p className="text-xs text-amber-400 font-bold font-tech">
                  📍 {activeStoryModal.cityAr} • تجربة موثقة بالشراء
                </p>
              </div>
            </div>

            {/* Video Stage or Image */}
            <div className="aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 relative flex items-center justify-center">
              <img src={activeStoryModal.buildImage} alt={activeStoryModal.buildTitleAr} className="w-full h-full object-cover" />
            </div>

            {/* Full Story Content */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-400">
                تفاصيل تجربة بناء واختبار التجميعة:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                "{activeStoryModal.fullStoryAr}"
              </p>
            </div>

            {/* Build Specs List */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-tech text-cyan-400">
              <span className="text-slate-400 font-bold block mb-1">مواصفات حاسوب الزبون:</span>
              <span>{activeStoryModal.specSummaryAr}</span>
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              {onOpenAIAdvisor && (
                <button
                  onClick={() => {
                    setActiveStoryModal(null);
                    onOpenAIAdvisor();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:from-amber-400"
                >
                  اطلب تجميعة مماثلة من مستشار القمر (AI)
                </button>
              )}

              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
