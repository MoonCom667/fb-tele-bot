import React, { useState } from 'react';
import { ShoppingCart, Wrench, Star, Check, Eye, Heart, Scale, Cpu } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'IQD' | 'USD';
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToBuilder?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onSelectProduct,
  onAddToBuilder,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare
}) => {
  const [isAddedAnimating, setIsAddedAnimating] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(product);
    }
  };

  const handleCartClick = () => {
    setIsAddedAnimating(true);
    setTimeout(() => setIsAddedAnimating(false), 1000);
    onAddToCart(product);
  };

  // Collect up to 3 key specs to display cleanly as inline metadata
  const specItems = [
    product.specs.vram,
    product.specs.socket ? `مقبس ${product.specs.socket}` : undefined,
    product.specs.capacity,
    product.specs.refreshRate,
    product.specs.wattage ? `${product.specs.wattage}W` : undefined
  ].filter(Boolean).slice(0, 3);

  return (
    <div className="group bg-[#111827] hover:bg-[#141d2f] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5">
      
      <div>
        {/* Image Container (4:3 aspect ratio) */}
        <div 
          onClick={() => onSelectProduct(product)}
          className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#0a0e17] border border-slate-800/60 cursor-pointer mb-3.5"
        >
          {!imgError && product.image ? (
            <img 
              src={product.image} 
              alt={product.nameAr}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-4 text-center">
              <Cpu className="w-10 h-10 mb-2 text-slate-700" />
              <span className="text-xs font-tech">{product.brand}</span>
            </div>
          )}

          {/* Top-Left Quick Actions (Favorite & Compare) */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {onToggleFavorite && (
              <button
                onClick={handleHeartClick}
                title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                className={`p-2 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/90 border-rose-400 text-white'
                    : 'bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            )}

            {onToggleCompare && (
              <button
                onClick={handleCompareClick}
                title={isCompared ? 'إزالة من المقارنة' : 'مقارنة المنتج'}
                className={`p-2 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
                  isCompared
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-blue-400'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Clean Unboxed Metadata Line: Brand · Availability */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-tech font-semibold uppercase tracking-wider text-slate-300">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            {product.inStock ? (
              <span className="text-emerald-400 font-medium">
                متوفر ({product.stockCount})
              </span>
            ) : (
              <span className="text-rose-400 font-medium">
                نفذت الكمية
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-300 shrink-0 tabular-nums">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-xs">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onSelectProduct(product)}
          className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {product.nameAr}
        </h3>

        {/* Technical Specs as Clean Unboxed Text */}
        {specItems.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-slate-400 font-tech mt-1.5">
            {specItems.map((spec, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                <span>{spec}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Price & Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-base sm:text-lg font-black text-white font-tech tabular-nums">
            {formattedPrice}
          </div>
          {formattedOriginalPrice && (
            <div className="text-xs text-slate-500 line-through font-tech tabular-nums">
              {formattedOriginalPrice}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCartClick}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              product.inStock 
                ? isAddedAnimating 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isAddedAnimating ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>تمت الإضافة</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>إضافة للسلة</span>
              </>
            )}
          </button>

          {isPcComponent && onAddToBuilder ? (
            <button
              onClick={() => onAddToBuilder(product)}
              title="إضافة لأداة بناء التجميعة"
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-400" />
              <span>في التجميعة</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectProduct(product)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>التفاصيل</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
