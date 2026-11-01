import React, { useState } from 'react';
import { 
  Instagram, 
  Video, 
  Heart, 
  MessageCircle, 
  Eye, 
  ExternalLink, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Flame, 
  Users, 
  Award,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  authorHandle: string;
  authorNameAr: string;
  verified: boolean;
  captionAr: string;
  thumbnail: string;
  videoUrl?: string;
  viewsCount: string;
  likesCount: string;
  commentsCount: string;
  postUrl: string;
  dateAr: string;
  featuredProductAr?: string;
}

export const SocialMediaFeedSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'all' | 'instagram' | 'tiktok'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<SocialPost | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const posts: SocialPost[] = [
    {
      id: 'post-1',
      platform: 'instagram',
      authorHandle: '@alqamar_pc_iq',
      authorNameAr: 'مكتب القمر لتكنولوجيا البي سي',
      verified: true,
      captionAr: 'تجميعة الأحلام النيون بيضاء بالكامل! معالج i9-14900K + كرت RTX 4090 ASUS ROG White 🔥 فحص درجات الحرارة بالألعاب التقيلة!',
      thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
      viewsCount: '185K',
      likesCount: '16.4K',
      commentsCount: '920',
      postUrl: 'https://instagram.com',
      dateAr: 'قبل يومين',
      featuredProductAr: 'RTX 4090 ROG Strix White'
    },
    {
      id: 'post-2',
      platform: 'tiktok',
      authorHandle: '@alqamar_tech',
      authorNameAr: 'Al Qamar PC Iraq',
      verified: true,
      captionAr: 'فتح صندوق وتجميع لابتوب القيمنق ROG Strix SCAR 18 بصالة العرض بشارع الصناعة! شوف الشاشة السريعة 240Hz OLED 😱🎮',
      thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      viewsCount: '240K',
      likesCount: '28.1K',
      commentsCount: '1.4K',
      postUrl: 'https://tiktok.com',
      dateAr: 'أمس',
      featuredProductAr: 'ROG Strix SCAR 18'
    },
    {
      id: 'post-3',
      platform: 'instagram',
      authorHandle: '@alqamar_pc_iq',
      authorNameAr: 'مكتب القمر لتكنولوجيا البي سي',
      verified: true,
      captionAr: 'كيف تختار التبريد المائي المناسب لمعالجك؟ مقارنة حقيقية بالفرع بين التبريد المائي 360mm والتبريد الهوائي ❄️',
      thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
      viewsCount: '112K',
      likesCount: '9.8K',
      commentsCount: '410',
      postUrl: 'https://instagram.com',
      dateAr: 'قبل 4 أيام',
      featuredProductAr: 'Lian Li Galahad II Trinity'
    },
    {
      id: 'post-4',
      platform: 'tiktok',
      authorHandle: '@alqamar_tech',
      authorNameAr: 'Al Qamar PC Iraq',
      verified: true,
      captionAr: 'تجهيز أسرع تجميعة بي سي اقتصادية للألعاب والدراسة بسعر مناسب جداً! مع كفالة سنة كاملة مسجلة بالسيريال 🚀',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      viewsCount: '310K',
      likesCount: '34.5K',
      commentsCount: '2.1K',
      postUrl: 'https://tiktok.com',
      dateAr: 'قبل أسبوع',
      featuredProductAr: 'تجميعة القمر الاقتصادية'
    }
  ];

  const filteredPosts = activePlatform === 'all' 
    ? posts 
    : posts.filter(p => p.platform === activePlatform);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* Box Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/20">
                <Instagram className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>تغطيات القمر على إنستغرام وتيك توك</span>
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-tech">
                  <Flame className="w-3.5 h-3.5" />
                  <span>تفاعل حي</span>
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              شاهد فتح الصناديق، التجميعات الاحترافية، واختبارات الأداء المباشرة بفرع شارع الصناعة.
            </p>
          </div>

          {/* Social Stats & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            
            <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setActivePlatform('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activePlatform === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                الكل
              </button>

              <button
                onClick={() => setActivePlatform('instagram')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                  activePlatform === 'instagram' ? 'bg-rose-500 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram Reels</span>
              </button>

              <button
                onClick={() => setActivePlatform('tiktok')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                  activePlatform === 'tiktok' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </button>
            </div>

          </div>

        </div>

        {/* Social Channel Identity Bar */}
        <div className="my-4 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-black text-amber-400 text-xs">
                قمر
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-white text-xs sm:text-sm">
                  Al Qamar PC Official
                </span>
                <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              </div>
              <span className="text-[11px] text-slate-400 font-tech">
                 أكثر من 180K متابع • تغطيات يومية بشارع الصناعة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>متابعة على إنستغرام</span>
            </a>

            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>تيك توك</span>
            </a>
          </div>
        </div>

        {/* Posts & Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group/card relative"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div 
                onClick={() => setActiveVideoModal(post)}
                className="aspect-[9/12] relative overflow-hidden bg-slate-900 cursor-pointer group/img"
              >
                <img 
                  src={post.thumbnail} 
                  alt={post.captionAr} 
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Platform Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black shadow-md flex items-center gap-1 ${
                    post.platform === 'instagram' 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-cyan-400 text-slate-950'
                  }`}>
                    {post.platform === 'instagram' ? <Instagram className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    <span>{post.platform === 'instagram' ? 'Reels' : 'TikTok'}</span>
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-950/80 border border-white/30 flex items-center justify-center text-amber-400 shadow-2xl group-hover/img:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-amber-400 ml-0.5" />
                  </div>
                </div>

                {/* Views Badge */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-[11px] font-tech font-bold text-white bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-slate-800">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{post.viewsCount} مشاهدة</span>
                </div>

              </div>

              {/* Card Footer Content */}
              <div className="p-4 space-y-3 text-right">
                
                {post.featuredProductAr && (
                  <span className="inline-block text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-tech">
                    🔥 {post.featuredProductAr}
                  </span>
                )}

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {post.captionAr}
                </p>

                {/* Social Metrics & Action Link */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3 font-tech text-[11px]">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>

                  <a 
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="فتح المنشور"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Video Preview Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-500 text-white">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="font-bold text-xs text-white">
                  {activeVideoModal.authorNameAr}
                </span>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Simulated Player */}
            <div className="aspect-[9/16] max-h-[480px] bg-slate-950 relative flex items-center justify-center overflow-hidden">
              <img 
                src={activeVideoModal.thumbnail} 
                alt={activeVideoModal.captionAr} 
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
              </div>

              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 left-3 p-2 rounded-full bg-slate-950/80 text-white border border-slate-800"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Caption & External Button */}
            <div className="p-4 space-y-3 text-right">
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeVideoModal.captionAr}
              </p>

              <a
                href={activeVideoModal.postUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
              >
                <span>مشاهدة الفيديو الأصلي على التطبيق</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
