import React, { useState } from 'react';
import { 
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryFilterBarProps {
  categories: { id: string; name: string; nameAr: string; count: number }[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  brands: string[];
  sortOption: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  brands,
  sortOption,
  onSortChange,
  inStockOnly,
  onToggleInStock
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="space-y-3 mb-5">
      
      {/* Compact Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#111827] border border-slate-800/90 rounded-xl text-xs">
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors border border-slate-700"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span>الأقسام والفلاتر</span>
        </button>

        {/* Active Filter Summary (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-slate-400">
          <span>
            القسم الحالي: <strong className="text-white">{categories.find(c => c.id === activeCategory)?.nameAr || 'جميع الأقسام'}</strong>
          </span>
          {selectedBrand !== 'all' && (
            <>
              <span>·</span>
              <span>
                الشركة: <strong className="text-blue-400 font-tech">{selectedBrand}</strong>
              </span>
            </>
          )}
        </div>

        {/* Sort & Stock Controls */}
        <div className="flex items-center gap-4 mr-auto lg:mr-0">
          <label className="hidden sm:flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
            <input 
              type="checkbox"
              checked={inStockOnly}
              onChange={onToggleInStock}
              className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
            />
            <span>المتوفر فقط</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>الترتيب:</span>
            </span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="featured">الأكثر طلباً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="gaming-score">أعلى أداء ألعاب</option>
            </select>
          </div>
        </div>

      </div>

      {/* Horizontal Category Bar (Mobile & Tablet Only — Desktop uses Sidebar) */}
      <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-[#111827] text-slate-300 border border-slate-800'
              }`}
            >
              <span>{cat.nameAr}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-[#111827] h-full p-5 overflow-y-auto space-y-5 text-right border-r border-slate-800 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <span>تصفية المنتجات</span>
              </h3>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block pb-1">الأقسام:</span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id as ProductCategory);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                      isActive ? 'bg-blue-600 text-white font-bold' : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.nameAr}</span>
                    <span className="text-[11px] font-tech tabular-nums opacity-80">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <span className="text-xs font-medium text-slate-400 block">الشركة المصنعة:</span>
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-tech"
              >
                <option value="all">جميع الشركات</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              تطبيق الفلاتر
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
