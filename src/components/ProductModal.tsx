import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  MessageCircle, 
  X, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Check, 
  Heart, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Product, StoreInfo } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  currency: 'IQD' | 'USD';
  storeInfo: StoreInfo;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToBuilder?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  currency,
  storeInfo,
  onAddToCart,
  onAddToBuilder,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoomLevel, setLightboxZoomLevel] = useState(1);
  const [liveViewers, setLiveViewers] = useState(16);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Compile all images: main image + gallery
  const allImages = React.useMemo(() => {
    if (!product) return [];
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800'];
  }, [product]);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsHoverZooming(false);
    setIsLightboxOpen(false);
    setLightboxZoomLevel(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const base = 12 + (product.id.length * 3) % 15;
    setLiveViewers(base);

    const timer = setInterval(() => {
      setLiveViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(7, Math.min(36, prev + change));
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [product]);

  if (!product) return null;

  const currentImage = allImages[activeImageIndex] || allImages[0];

  const formattedPrice = currency === 'IQD'
    ? `${product.priceIQD.toLocaleString()} د.ع`
    : `$${product.priceUSD.toLocaleString()}`;

  const formattedOriginalPrice = product.originalPriceUSD
    ? (currency === 'IQD'
        ? `${product.originalPriceIQD?.toLocaleString()} د.ع`
        : `$${product.originalPriceUSD.toLocaleString()}`)
    : null;

  const isPcComponent = [
    'cpus', 'gpus', 'motherboards', 'ram', 'storage', 'power_supplies', 'cooling', 'cases'
  ].includes(product.category);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleWhatsAppInquiry = () => {
    const msg = `مرحباً مكتب القمر، أود الاستفسار عن توفر وسعر القطعة التالية:\n` +
      `📦 *${product.nameAr}*\n` +
      `Model: ${product.name}\n` +
      `السعر: ${formattedPrice}\n` +
      `شارع الصناعة - بغداد`;
    window.open(`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-right">
          
          {/* Top Controls: Close & Heart */}
          <div className="sticky top-0 z-20 bg-gradient-to-b from-[#111827] via-[#111827]/90 to-transparent p-4 pb-2 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {product.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(product)}
                  title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                      : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 sm:p-8 pt-4">
            
            {/* LEFT COLUMN: INTERACTIVE IMAGE GALLERY WITH ZOOM */}
            <div className="space-y-4">
              
              {/* Main Image Container with Interactive Zoom */}
              <div 
                ref={imageContainerRef}
                onMouseEnter={() => setIsHoverZooming(true)}
                onMouseLeave={() => setIsHoverZooming(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#090d16] border border-slate-800 cursor-crosshair group select-none shadow-inner"
              >
                {/* Main Image with Zoom Transform */}
                <img 
                  src={currentImage} 
                  alt={product.nameAr}
                  style={{
                    transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    transform: isHoverZooming ? 'scale(2.2)' : 'scale(1)',
                    transition: isHoverZooming ? 'none' : 'transform 0.3s ease-out'
                  }}
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* Gaming Score Badge */}
                {product.gamingScore && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-black bg-blue-600 text-white px-2.5 py-1 rounded-lg shadow-md pointer-events-none">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>{product.gamingScore} GAMING SCORE</span>
                  </div>
                )}

                {/* Zoom Hint Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 text-[11px] font-bold shadow-lg pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isHoverZooming ? 'عدسة التكبير نشطة' : 'حرك الماوس للزوم | انقر للتكبير الكامل'}</span>
                </div>

                {/* Open Fullscreen Lightbox Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/80 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 transition-colors shadow-md cursor-pointer"
                  title="تكبير الصورة بالشاشة الكاملة"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Strip (When Multiple Images Exist) */}
              {allImages.length > 1 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 block font-medium">
                    معرض الصور ({allImages.length} صور) - انقر للاستعراض:
                  </span>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#090d16] cursor-pointer ${
                          activeImageIndex === idx 
                            ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/20' 
                            : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`صورة ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust & Guarantee Box */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-2.5 text-right">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>توصيل سريع لبغداد وكافة المحافظات | فحص واستلام بفرع شارع الصناعة</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS, SPECS, AND PURCHASING */}
            <div className="space-y-5 text-right flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-400 uppercase tracking-wider bg-blue-600/10 px-3 py-1 rounded-lg border border-blue-500/20">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">
                    رمز القطعة: <span className="font-mono text-slate-300">{product.id}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
                  {product.nameAr}
                </h2>

                <p className="text-xs text-slate-400 font-mono mt-1">
                  {product.name}
                </p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                    {formattedPrice}
                  </div>
                  {formattedOriginalPrice && (
                    <div className="text-sm text-slate-500 line-through font-mono">
                      {formattedOriginalPrice}
                    </div>
                  )}
                </div>

                {/* Stock Status & Live Viewers */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 bg-[#090d16] p-3 rounded-2xl border border-slate-800">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span>متوفر في فرع الصناعة ({product.stockCount} قطع جاهزة)</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400">غير متوفر حالياً</span>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-300 bg-blue-600/10 px-2.5 py-1 rounded-lg border border-blue-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>يشاهد هذا المنتج الآن <strong className="text-white font-mono">{liveViewers}</strong> زبوناً</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed bg-[#090d16]/70 p-3.5 rounded-2xl border border-slate-800">
                  {product.descriptionAr}
                </p>

                {/* Technical Specifications */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400">المواصفات التقنية:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).map(([k, v]) => (
                        <div key={k} className="p-2.5 rounded-xl bg-[#090d16] border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase">{k}</div>
                          <div className="font-bold text-slate-200 font-mono truncate">{String(v)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      onAddToCart(product, 1);
                      onClose();
                    }}
                    disabled={!product.inStock}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      product.inStock 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>إضافة إلى السلة</span>
                  </button>

                  {isPcComponent && onAddToBuilder && (
                    <button
                      onClick={() => {
                        onAddToBuilder(product);
                        onClose();
                      }}
                      className="flex items-center justify-center gap-1.5 py-3 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>استخدم في مجمع البي سي</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>طلب مباشر عبر واتساب (07708732185)</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX WITH ZOOM CONTROLS */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-between p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between py-2 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">{product.nameAr}</span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ({activeImageIndex + 1} / {allImages.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoomLevel(prev => Math.min(3, prev + 0.5))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white transition-colors cursor-pointer"
                title="تكبير +"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxZoomLevel(prev => Math.max(1, prev - 0.5))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white transition-colors cursor-pointer"
                title="تصغير -"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxZoomLevel(1)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white transition-colors cursor-pointer"
                title="إعادة ضبط الحجم"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image Canvas */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto p-4 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)}
                  className="absolute right-4 p-3 rounded-2xl bg-slate-900/80 hover:bg-blue-600 text-white transition-colors cursor-pointer z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(prev => (prev + 1) % allImages.length)}
                  className="absolute left-4 p-3 rounded-2xl bg-slate-900/80 hover:bg-blue-600 text-white transition-colors cursor-pointer z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}

            <img 
              src={currentImage} 
              alt={product.nameAr}
              style={{
                transform: `scale(${lightboxZoomLevel})`,
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-[75vh] max-w-full object-contain cursor-zoom-in"
              onClick={() => setLightboxZoomLevel(prev => prev > 1.5 ? 1 : prev + 0.75)}
            />
          </div>

          {/* Lightbox Footer Thumbnail Bar */}
          {allImages.length > 1 && (
            <div 
              className="flex gap-2 p-2 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-lg overflow-x-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
