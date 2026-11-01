import React from 'react';
import { 
  LayoutGrid, 
  Cpu, 
  Layers, 
  HardDrive, 
  Zap, 
  Fan, 
  Box, 
  Laptop, 
  Monitor, 
  Headphones, 
  Flame,
  CircuitBoard,
  Tag,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { ProductCategory } from '../types';

interface CategorySidebarProps {
  categories: { id: string; name: string; nameAr: string; count: number }[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  brands: string[];
  inStockOnly: boolean;
  onToggleInStock: () => void;
  onResetFilters: () => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  brands,
  inStockOnly,
  onToggleInStock,
  onResetFilters
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'gpus': return <Cpu className="w-4 h-4" />;
      case 'cpus': return <Cpu className="w-4 h-4" />;
      case 'motherboards': return <CircuitBoard className="w-4 h-4" />;
      case 'ram': return <Layers className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      case 'power_supplies': return <Zap className="w-4 h-4" />;
      case 'cooling': return <Fan className="w-4 h-4" />;
      case 'cases': return <Box className="w-4 h-4" />;
      case 'laptops': return <Laptop className="w-4 h-4" />;
      case 'monitors': return <Monitor className="w-4 h-4" />;
      case 'accessories': return <Headphones className="w-4 h-4" />;
      case 'prebuilt_pcs': return <Flame className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-4 text-right select-none sticky top-28 self-start">
      
      <div className="bg-[#111827] border border-slate-800/90 rounded-2xl p-4 space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-400" />
            <span>الأقسام والفلاتر</span>
          </h3>
          <button
            onClick={onResetFilters}
            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            title="إعادة ضبط الفلاتر"
          >
            <RotateCcw className="w-3 h-3" />
            <span>إعادة ضبط</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold'
                    : 'hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {getIcon(cat.id)}
                  </span>
                  <span className="truncate">{cat.nameAr}</span>
                </div>

                <span className={`text-[11px] font-tech tabular-nums ${
                  isActive ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Brand Filter */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            <span>الشركة المصنعة</span>
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => onSelectBrand(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-tech focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">جميع الشركات</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* In Stock Filter */}
        <div className="pt-3 border-t border-slate-800/80">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white">
            <input 
              type="checkbox"
              checked={inStockOnly}
              onChange={onToggleInStock}
              className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>المتوفر في المعرض فقط</span>
          </label>
        </div>

      </div>

      {/* Store Warranty Note */}
      <div className="bg-[#111827]/60 border border-slate-800/70 rounded-2xl p-3.5 text-right space-y-1.5">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>ضمان مكتب القمر المعتمد</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          جميع القطع أصلية 100% ومشمولة بضمان الاستبدال بالسيريال نمبر.
        </p>
      </div>

    </aside>
  );
};
