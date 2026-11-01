import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Truck, 
  Wrench, 
  Clock, 
  MapPin, 
  MessageCircle,
  Maximize2
} from 'lucide-react';

import { StoreVideoItem } from '../types';

export const DEFAULT_STORE_VIDEOS: StoreVideoItem[] = [
  {
    id: 'chap-1',
    titleAr: 'جولة داخل صالة عرض مكتب القمر بفرع شارع الصناعة',
    durationAr: '1:45 دقيقة',
    descriptionAr: 'تفقّد أحدث كروت الشاشة، اللابتوبات، والشاشات المعروضة في صالتنا الرئيسية ببغداد.',
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'chap-2',
    titleAr: 'كيف نقوم بتجميع واختبار حاسوبك الشخصي قبل التسليم؟',
    durationAr: '2:10 دقيقة',
    descriptionAr: 'شاهد خطوط التجميع الاحترافية، ترتيب الأسلاك (Cable Management)، واختبار الضغط والتبريد.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  },
  {
    id: 'chap-3',
    titleAr: 'سياسة ضمان مكتب القمر الحقيقية المسجلة بالسيريال',
    durationAr: '1:15 دقيقة',
    descriptionAr: 'تعرّف على كيفية تسجيل السيريال الخاص بقطعتك لضمان الاستبدال الفوري بدون تعقيد.',
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  },
  {
    id: 'chap-4',
    titleAr: 'خدمة التوصيل السريع والآمن لجميع المحافظات 18',
    durationAr: '1:30 دقيقة',
    descriptionAr: 'آلية التغليف الآمن المقاوم للصدمات والشحن مع الشركاء المعتمدين لضمان وصول حاسوبك سليماً.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    videoUrl: ''
  }
];

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (longMatch && longMatch[1]) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  return null;
}

export const StoreIntroVideoSection: React.FC<{ 
  videos?: StoreVideoItem[]; 
  onOpenAIAdvisor?: () => void 
}> = ({ videos, onOpenAIAdvisor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters: StoreVideoItem[] = (videos && videos.length > 0) ? videos : DEFAULT_STORE_VIDEOS;
  const currentChapter = chapters[activeChapterIndex] || chapters[0] || DEFAULT_STORE_VIDEOS[0];
  const youtubeEmbedUrl = getYouTubeEmbedUrl(currentChapter.videoUrl);
  const isDirectVideo = Boolean(currentChapter.videoUrl && (currentChapter.videoUrl.endsWith('.mp4') || currentChapter.videoUrl.endsWith('.webm')));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Box Container */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Play className="w-5 h-5 fill-slate-950" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>تعرّف على مكتب القمر لتكنولوجيا الحاسوب</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-tech">
                  فيديو تعريفي
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              شاهد كيف نضمن لك أفضل جودة تجميع، تبريد احترافي، وضمان استبدال حقيقي مسجل بالسيريال نمبر.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-2xl shrink-0">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>شارع الصناعة - بغداد</span>
          </div>

        </div>

        {/* Video Player & Chapters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 relative z-10">
          
          {/* Main Video Screen */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative group shadow-2xl flex flex-col justify-between">
            
            {/* Aspect Ratio Video Stage */}
            <div className="aspect-video relative overflow-hidden bg-slate-950 flex items-center justify-center">
              {isPlaying && youtubeEmbedUrl ? (
                <div className="absolute inset-0 z-20 bg-black flex flex-col">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={currentChapter.titleAr}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 left-3 z-30 px-3 py-1 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 backdrop-blur-md cursor-pointer transition-all flex items-center gap-1 shadow-lg"
                  >
                    <span>إيقاف الفيديو</span>
                  </button>
                </div>
              ) : isPlaying && isDirectVideo ? (
                <div className="absolute inset-0 z-20 bg-black">
                  <video
                    src={currentChapter.videoUrl}
                    autoPlay
                    controls
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 left-3 z-30 px-3 py-1 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 backdrop-blur-md cursor-pointer transition-all flex items-center gap-1 shadow-lg"
                  >
                    <span>إيقاف الفيديو</span>
                  </button>
                </div>
              ) : (
                <>
                  <img 
                    src={currentChapter.thumbnail} 
                    alt={currentChapter.titleAr}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : ''}`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Central Big Play / Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group/play cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-slate-950" />
                    ) : (
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    )}
                    <span className="absolute -inset-2 rounded-full border-2 border-amber-500/50 animate-ping pointer-events-none" />
                  </button>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 text-[11px] font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{isPlaying ? 'جاري العرض الآن' : 'انقر للتشغيل'}</span>
                  </div>

                  {/* Sound Toggle Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute top-4 left-4 z-10 p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-800 transition-colors cursor-pointer"
                    title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {/* Bottom Video Progress Bar Simulator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-all duration-1000 ${
                        isPlaying ? 'w-3/4 animate-pulse' : 'w-1/4'
                      }`}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Video Info Footer */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 text-right space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold font-tech">
                <span>الفصل {activeChapterIndex + 1} من {chapters.length}</span>
                <span>{currentChapter.durationAr}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {currentChapter.titleAr}
              </h3>
              <p className="text-xs text-slate-300">
                {currentChapter.descriptionAr}
              </p>
            </div>

          </div>

          {/* Chapters Sidebar Menu */}
          <div className="lg:col-span-4 space-y-3 text-right">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-tech flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>فصول الفيديو والخدمات:</span>
            </h4>

            <div className="space-y-2.5">
              {chapters.map((chap, idx) => {
                const isActive = idx === activeChapterIndex;

                return (
                  <div
                    key={chap.id}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
                      <img src={chap.thumbnail} alt={chap.titleAr} className="w-full h-full object-cover" />
                      {isActive && (
                        <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-white text-white" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-tech">
                        <span>فصل {idx + 1}</span>
                        <span>{chap.durationAr}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white line-clamp-1">
                        {chap.titleAr}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Advisor Assistant Trigger */}
            {onOpenAIAdvisor && (
              <button
                onClick={onOpenAIAdvisor}
                className="w-full mt-3 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>استشر مهندس القمر الذكي لتجميع حاسوبك</span>
              </button>
            )}

          </div>

        </div>

        {/* 4 Pillars Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-800/80 text-right">
          
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">ضمان مسجل بالسيريال</h5>
              <p className="text-[10px] text-slate-400">استبدال رسمي فوري بدون تأخير</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">تجميع واختبار حراري</h5>
              <p className="text-[10px] text-slate-400">فحص الأداء تحت أقصى ضغط</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">توصيل لكل المحافظات</h5>
              <p className="text-[10px] text-slate-400">تغليف آمن ومقاوم للصدمات</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">10+ سنوات خبرة</h5>
              <p className="text-[10px] text-slate-400">بشارع الصناعة - بغداد</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
