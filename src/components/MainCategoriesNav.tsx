import React from 'react';
import { 
  Laptop, 
  Cpu, 
  Flame, 
  Monitor, 
  Headphones, 
  HardDrive, 
  CircuitBoard, 
  Zap
} from 'lucide-react';
import { ProductCategory } from '../types';

interface MainCategoriesNavProps {
  onSelectCategory: (category: ProductCategory) => void;
  onSelectTab: (tab: 'store' | 'prebuilt' | 'laptops' | 'pc-builder') => void;
  categoryCounts?: { [key: string]: number };
}

interface MainCategoryItem {
  id: ProductCategory;
  tab?: 'store' | 'prebuilt' | 'laptops';
  titleAr: string;
  subtitleAr: string;
  icon: React.ReactNode;
}

export const MainCategoriesNav: React.FC<MainCategoriesNavProps> = ({
  onSelectCategory,
  onSelectTab,
  categoryCounts = {}
}) => {
  const mainCategories: MainCategoryItem[] = [
    {
      id: 'gpus',
      tab: 'store',
      titleAr: 'كروت الشاشة',
      subtitleAr: 'RTX 40 & RX 7000',
      icon: <Cpu className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'cpus',
      tab: 'store',
      titleAr: 'المعالجات',
      subtitleAr: 'Intel 14th & Ryzen',
      icon: <Zap className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'prebuilt_pcs',
      tab: 'prebuilt',
      titleAr: 'التجميعات الجاهزة',
      subtitleAr: 'مختبرة وجاهزة للتسليم',
      icon: <Flame className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 'laptops',
      tab: 'laptops',
      titleAr: 'لابتوبات الألعاب',
      subtitleAr: 'ROG & Legion',
      icon: <Laptop className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'motherboards',
      tab: 'store',
      titleAr: 'اللوحات الأم',
      subtitleAr: 'Z790 & B650 DDR5',
      icon: <CircuitBoard className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'monitors',
      tab: 'store',
      titleAr: 'شاشات الألعاب',
      subtitleAr: '240Hz & OLED',
      icon: <Monitor className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 'ram',
      tab: 'store',
      titleAr: 'الذواكر والتخزين',
      subtitleAr: 'DDR5 & NVMe Gen4',
      icon: <HardDrive className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'accessories',
      tab: 'store',
      titleAr: 'الملحقات والإكسسوارات',
      subtitleAr: 'ماوس، كيبورد، سماعات',
      icon: <Headphones className="w-5 h-5 text-sky-400" />
    }
  ];

  const handleCategoryClick = (item: MainCategoryItem) => {
    if (item.tab) {
      onSelectTab(item.tab);
    }
    onSelectCategory(item.id);

    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-2 select-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-black text-white">
          تصفح حسب القسم
        </h2>
        <span className="text-xs text-slate-400">
          اختر القسم للانتقال المباشر إلى المنتجات
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {mainCategories.map((cat) => {
          const count = categoryCounts[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group text-right p-3.5 rounded-xl bg-[#111827] hover:bg-slate-800/90 border border-slate-800/90 hover:border-blue-500/40 transition-all flex flex-col justify-between gap-2.5 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                  {cat.icon}
                </div>
                {count !== undefined && count > 0 && (
                  <span className="text-[11px] text-slate-400 font-tech tabular-nums">
                    {count}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                  {cat.titleAr}
                </h3>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-tech">
                  {cat.subtitleAr}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
