import React, { useState } from 'react';
import { X, Sparkles, ArrowLeft } from 'lucide-react';
import { ProductCategory } from '../types';

interface DynamicNotificationBarProps {
  onSelectCategory?: (cat: ProductCategory) => void;
  onSelectTab?: (tab: 'store' | 'pc-builder' | 'prebuilt' | 'laptops') => void;
  onOpenBuilder?: () => void;
  customText?: string;
}

export const DynamicNotificationBar: React.FC<DynamicNotificationBarProps> = ({
  onOpenBuilder,
  customText
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-950/80 border-b border-blue-500/20 text-slate-100 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-medium truncate">
            {customText || 'عروض مكتب القمر الحصرية على كروت الشاشة والمعالجات والتجميعات الاحترافية مع فحص وتركيب مجاني'}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onOpenBuilder && (
            <button
              onClick={onOpenBuilder}
              className="hidden sm:flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
            >
              <span>تجميع حاسوب</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => setIsVisible(false)}
            title="إغلاق"
            className="p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
