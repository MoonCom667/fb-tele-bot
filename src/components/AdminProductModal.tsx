import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Save, 
  Image as ImageIcon, 
  DollarSign, 
  Upload, 
  Trash2, 
  Check, 
  Star, 
  Zap, 
  Layers, 
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { Product, ProductCategory, ProductSpec } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct?: (product: Product) => void;
  onSave?: (product: Product) => void;
  editingProduct?: Product | null;
  productToEdit?: Product | null;
  categories?: { id: string; name: string; nameAr: string; icon?: string; badge?: string }[];
  brands?: string[];
  exchangeRate?: number;
}

// Guaranteed 12 store hardware departments
export const STORE_HARDWARE_DEPARTMENTS: { 
  id: ProductCategory; 
  nameAr: string; 
  nameEn: string; 
  icon: string;
  badge: string;
}[] = [
  { id: 'gpus', nameAr: 'كروت الشاشة', nameEn: 'Graphics Cards', icon: '🎮', badge: 'RTX / RX' },
  { id: 'cpus', nameAr: 'المعالجات', nameEn: 'Processors', icon: '🧠', badge: 'Intel / AMD' },
  { id: 'motherboards', nameAr: 'اللوحات الأم', nameEn: 'Motherboards', icon: '🎛️', badge: 'ATX / AM5 / LGA' },
  { id: 'ram', nameAr: 'الذاكرة العشوائية', nameEn: 'RAM Memory', icon: '⚡', badge: 'DDR5 / DDR4' },
  { id: 'storage', nameAr: 'وحدات التخزين SSD / HDD', nameEn: 'Storage NVMe', icon: '💾', badge: 'Gen4 / Gen5' },
  { id: 'power_supplies', nameAr: 'مزودات الطاقة', nameEn: 'Power Supplies', icon: '🔌', badge: 'Gold / Platinum' },
  { id: 'cooling', nameAr: 'التبريد المائي والهوائي', nameEn: 'Cooling & AIO', icon: '❄️', badge: '360mm / 240mm' },
  { id: 'cases', nameAr: 'كيسات الحاسوب', nameEn: 'PC Cases', icon: '🖥️', badge: 'Panoramic / Mesh' },
  { id: 'laptops', nameAr: 'لابتوبات الألعاب والمونتاج', nameEn: 'Gaming Laptops', icon: '💻', badge: '240Hz / OLED' },
  { id: 'monitors', nameAr: 'شاشات الألعاب والاحترافية', nameEn: 'Monitors', icon: '📺', badge: '2K / 4K / OLED' },
  { id: 'accessories', nameAr: 'الملحقات والإكسسوارات', nameEn: 'Accessories', icon: '🎧', badge: 'Mice / Headsets' },
  { id: 'prebuilt_pcs', nameAr: 'تجميعات بي سي جاهزة', nameEn: 'Prebuilt PCs', icon: '🔥', badge: 'Ready to Play' },
];

// Preset hardware sample images
const PRESET_HARDWARE_IMAGES: { label: string; url: string; cat: ProductCategory }[] = [
  { label: 'RTX 4090 ROG Strix (أمامية)', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=85', cat: 'gpus' },
  { label: 'RTX 4080 Super MSI (زاوية ثلاثية)', url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=85', cat: 'gpus' },
  { label: 'AMD Ryzen 7 7800X3D Box', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=85', cat: 'cpus' },
  { label: 'ROG X670E Hero Motherboard', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=85', cat: 'motherboards' },
  { label: 'Corsair Dominator Titanium DDR5', url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=85', cat: 'ram' },
  { label: 'Samsung 990 PRO 2TB NVMe', url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=85', cat: 'storage' },
  { label: 'Lian Li O11 Dynamic EVO Case', url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=85', cat: 'cases' },
  { label: 'ROG SCAR 18 Gaming Laptop', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=85', cat: 'laptops' },
  { label: 'Samsung Odyssey OLED 49" Monitor', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=85', cat: 'monitors' },
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  onSave,
  editingProduct,
  productToEdit,
  categories = [],
  brands = ['ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Kingston', 'NZXT', 'Lian Li', 'Intel', 'AMD', 'NVIDIA', 'Samsung'],
  exchangeRate = 1520
}) => {
  const activeProduct = editingProduct !== undefined ? editingProduct : (productToEdit || null);
  const handleSave = onSaveProduct || onSave || (() => {});
  const safeBrands = brands && brands.length > 0 ? brands : ['ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Kingston', 'NZXT', 'Lian Li', 'Intel', 'AMD', 'NVIDIA', 'Samsung'];

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameAr: '',
    category: 'gpus',
    brand: safeBrands[0] || 'ASUS',
    priceUSD: 0,
    priceIQD: 0,
    originalPriceUSD: 0,
    originalPriceIQD: 0,
    image: '',
    gallery: [],
    description: '',
    descriptionAr: '',
    inStock: true,
    stockCount: 5,
    featured: false,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5.0,
    reviewsCount: 12,
    warranty: 'ضمان سنة واحدة استبدال فوري',
    gamingScore: 90,
    specs: {}
  });

  const [specs, setSpecs] = useState<ProductSpec>({});
  const [autoCalculateIQD, setAutoCalculateIQD] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagesList, setImagesList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeProduct) {
      setFormData(activeProduct);
      setSpecs(activeProduct.specs || {});
      const allImgs: string[] = [];
      if (activeProduct.image) allImgs.push(activeProduct.image);
      if (activeProduct.gallery && Array.isArray(activeProduct.gallery)) {
        activeProduct.gallery.forEach(url => {
          if (url && !allImgs.includes(url)) allImgs.push(url);
        });
      }
      setImagesList(allImgs);
    } else {
      // New Product Template
      const defaultImg = PRESET_HARDWARE_IMAGES[0].url;
      setFormData({
        id: `prod-custom-${Date.now()}`,
        name: '',
        nameAr: '',
        category: 'gpus',
        brand: safeBrands[0] || 'ASUS',
        priceUSD: 250,
        priceIQD: 250 * exchangeRate,
        image: defaultImg,
        gallery: [],
        description: '',
        descriptionAr: '',
        inStock: true,
        stockCount: 5,
        featured: false,
        isNewArrival: true,
        isBestSeller: false,
        rating: 5.0,
        reviewsCount: 1,
        warranty: 'ضمان سنة واحدة استبدال مباشر من المعرض',
        gamingScore: 85,
        specs: {}
      });
      setImagesList([defaultImg]);
      setSpecs({
        vram: '16GB GDDR6X',
        socket: 'AM5 / LGA1700',
        wattage: 750
      });
    }
  }, [activeProduct, isOpen, exchangeRate, safeBrands]);

  if (!isOpen) return null;

  const handleUSDPriceChange = (usd: number) => {
    setFormData(prev => ({
      ...prev,
      priceUSD: usd,
      priceIQD: autoCalculateIQD ? Math.round(usd * exchangeRate) : prev.priceIQD
    }));
  };

  // Image Gallery Handlers
  const handleAddImageUrl = (urlToAdd?: string) => {
    const url = (urlToAdd || newImageUrl).trim();
    if (!url) return;
    if (!imagesList.includes(url)) {
      const updated = [...imagesList, url];
      setImagesList(updated);
      if (!formData.image) {
        setFormData(prev => ({ ...prev, image: url }));
      }
    }
    setNewImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
    setImagesList(updated);
    if (updated.length > 0) {
      setFormData(prev => ({ ...prev, image: updated[0] }));
    } else {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const target = imagesList[index];
    const rest = imagesList.filter((_, idx) => idx !== index);
    const updated = [target, ...rest];
    setImagesList(updated);
    setFormData(prev => ({ ...prev, image: target }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        if (dataUrl && !imagesList.includes(dataUrl)) {
          setImagesList(prev => {
            const nextList = [...prev, dataUrl];
            if (prev.length === 0) {
              setFormData(f => ({ ...f, image: dataUrl }));
            }
            return nextList;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr || !formData.name) {
      alert('يرجى كتابة اسم المنتج بالعربية والإنجليزية');
      return;
    }

    const primaryImage = imagesList[0] || formData.image || PRESET_HARDWARE_IMAGES[0].url;
    const extraGallery = imagesList.slice(1);

    const finalProduct: Product = {
      id: formData.id || `prod-${Date.now()}`,
      name: formData.name || '',
      nameAr: formData.nameAr || '',
      category: (formData.category as ProductCategory) || 'gpus',
      brand: formData.brand || 'ASUS',
      priceUSD: Number(formData.priceUSD) || 0,
      priceIQD: Number(formData.priceIQD) || Math.round((Number(formData.priceUSD) || 0) * exchangeRate),
      originalPriceUSD: formData.originalPriceUSD ? Number(formData.originalPriceUSD) : undefined,
      originalPriceIQD: formData.originalPriceIQD ? Number(formData.originalPriceIQD) : undefined,
      image: primaryImage,
      gallery: extraGallery,
      description: formData.description || formData.name || '',
      descriptionAr: formData.descriptionAr || formData.nameAr || '',
      inStock: Boolean(formData.inStock),
      stockCount: Number(formData.stockCount) || 0,
      featured: Boolean(formData.featured),
      isNewArrival: Boolean(formData.isNewArrival),
      isBestSeller: Boolean(formData.isBestSeller),
      rating: Number(formData.rating) || 5.0,
      reviewsCount: Number(formData.reviewsCount) || 1,
      specs: specs,
      gamingScore: Number(formData.gamingScore) || 80,
      warranty: formData.warranty || 'ضمان سنة واحدة استبدال مباشر'
    };

    handleSave(finalProduct);
    onClose();
  };

  const selectedDept = STORE_HARDWARE_DEPARTMENTS.find(d => d.id === formData.category) || STORE_HARDWARE_DEPARTMENTS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-right">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0b0f19]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {activeProduct ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {activeProduct ? 'تعديل بيانات المنتج وتحديث الصور' : 'إضافة منتج وقطع جديدة للكتالوج'}
              </h2>
              <p className="text-xs text-slate-400">
                مكتب القمر للحاسبات | سعر الصرف المعتمد: 1$ = {exchangeRate.toLocaleString()} د.ع
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          
          {/* SECTION 1: CATEGORY SELECTION (Clear and Guaranteed) */}
          <div className="bg-[#0b0f19] border border-blue-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <label className="font-black text-sm text-white flex items-center gap-2">
                  <span className="text-blue-400 font-bold">1. تحديد قسم وتصنيف القطعة (مطلوب)</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 text-[11px] font-bold border border-blue-500/30">
                    القسم الحالي: {selectedDept.nameAr}
                  </span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  اختر القسم بالضغط المباشر على الأيقونة أدناه أو من القائمة المنسدلة:
                </p>
              </div>

              {/* Enhanced Select Dropdown + Inline Add Category */}
              <div className="w-full sm:w-80 flex items-center gap-2">
                <select
                  value={formData.category || 'gpus'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                  className="flex-1 bg-slate-900 border border-blue-500/50 rounded-xl p-2.5 text-slate-100 font-bold text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                >
                  {(categories && categories.length > 0 ? categories.filter(c => c.id !== 'all') : STORE_HARDWARE_DEPARTMENTS).map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon || '📁'} {cat.nameAr} ({cat.name || cat.id})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    const newNameAr = prompt('أدخل اسم القسم الجديد بالعربية:');
                    if (newNameAr && newNameAr.trim()) {
                      const slug = newNameAr.trim().toLowerCase().replace(/[\s_-]+/g, '_');
                      setFormData({ ...formData, category: slug });
                      if (categories && Array.isArray(categories)) {
                        categories.push({
                          id: slug,
                          name: newNameAr.trim(),
                          nameAr: newNameAr.trim(),
                          icon: '📁',
                          badge: 'جديد'
                        });
                      }
                    }
                  }}
                  className="px-2.5 py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                  title="إضافة قسم جديد فوراً"
                >
                  ➕ قسم جديد
                </button>
              </div>
            </div>

            {/* Quick 1-Click Department Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-1 max-h-40 overflow-y-auto no-scrollbar">
              {(categories && categories.length > 0 ? categories.filter(c => c.id !== 'all') : STORE_HARDWARE_DEPARTMENTS).map(dept => {
                const isSelected = formData.category === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: dept.id })}
                    className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{dept.icon || '📁'}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="mt-1">
                      <div className="font-bold text-[11px] truncate">{dept.nameAr}</div>
                      <div className={`text-[9px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>{dept.badge || dept.name || ''}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: PRODUCT NAMES & BRAND */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-300 block">اسم المنتج بالعربية *</label>
              <input 
                type="text"
                required
                value={formData.nameAr || ''}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder="مثال: كرت شاشة ASUS ROG Strix GeForce RTX 4080 Super 16GB"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">الشركة المصنعة (Brand)</label>
              <input 
                type="text"
                value={formData.brand || ''}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="ASUS, MSI, Intel, AMD..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-3">
              <label className="font-bold text-slate-300 block">كود الموديل بالإنجليزية (Model Code) *</label>
              <input 
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. ASUS ROG-STRIX-RTX4080S-O16G-GAMING"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs font-mono"
              />
            </div>
          </div>

          {/* SECTION 3: MULTIPLE IMAGES & GALLERY (Key Requirement) */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <label className="font-black text-sm text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>2. صور المنتج والمعرض التفاعلي ({imagesList.length} صور مضافة)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  يمكنك إضافة أكثر من صورة للمنتج (صورة الغلاف، زوايا متعددة، منافذ التوصيل، والكرتونة) لدعم ميزة الزوم التفاعلي للزبائن.
                </p>
              </div>

              {/* Local File Upload Button */}
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>رفع صور من الجهاز</span>
                </button>
              </div>
            </div>

            {/* Add Image by URL */}
            <div className="flex gap-2">
              <input 
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
                placeholder="ألصق رابط صورة إضافية (https://...) واضغط إضافة"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => handleAddImageUrl()}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold rounded-xl text-xs border border-blue-500/30 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة للمعرض</span>
              </button>
            </div>

            {/* Active Images Gallery Grid */}
            {imagesList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                {imagesList.map((url, idx) => {
                  const isPrimary = idx === 0;
                  return (
                    <div 
                      key={idx}
                      className={`relative group rounded-xl overflow-hidden border bg-slate-950 flex flex-col ${
                        isPrimary ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-slate-800'
                      }`}
                    >
                      <div className="aspect-square relative overflow-hidden bg-slate-900">
                        <img 
                          src={url} 
                          alt={`صورة ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                        {isPrimary && (
                          <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-black shadow-md">
                            ⭐ الغلاف الرئيسي
                          </span>
                        )}
                      </div>

                      {/* Controls Strip */}
                      <div className="p-1.5 bg-slate-900/95 flex items-center justify-between gap-1 border-t border-slate-800 text-[10px]">
                        {!isPrimary ? (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            className="px-2 py-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded text-[10px] transition-colors cursor-pointer flex-1"
                          >
                            تعيين كرئيسية
                          </button>
                        ) : (
                          <span className="text-[10px] text-blue-400 font-bold px-1">الصورة الأولى</span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title="حذف الصورة"
                          className="p-1 rounded text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>لم يتم إضافة صور بعد. اضغط على "رفع صور من الجهاز" أو اختر من الصور الجاهزة أدناه.</p>
              </div>
            )}

            {/* Quick Hardware Sample Images */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-2 font-bold">
                أو أضف صور جاهزة عالية الدقة بنقرة واحدة:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {PRESET_HARDWARE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddImageUrl(img.url)}
                    className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-[10px] whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>➕ {img.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: PRICING & EXCHANGE RATE */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-blue-400 flex items-center gap-1.5 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>3. تسعير المنتج (دولار ودينار عراقي)</span>
              </span>
              
              <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-300">
                <input 
                  type="checkbox"
                  checked={autoCalculateIQD}
                  onChange={(e) => setAutoCalculateIQD(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>حساب الدينار تلقائياً (1$ = {exchangeRate} د.ع)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">السعر بالدولار ($ USD) *</label>
                <input 
                  type="number"
                  min="0"
                  required
                  value={formData.priceUSD || 0}
                  onChange={(e) => handleUSDPriceChange(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-emerald-400 font-mono font-bold text-base focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">السعر بالدينار العراقي (IQD) *</label>
                <input 
                  type="number"
                  min="0"
                  required
                  value={formData.priceIQD || 0}
                  onChange={(e) => setFormData({ ...formData, priceIQD: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-blue-400 font-mono font-bold text-base focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: STOCK, WARRANTY & GAMING SCORE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">الكمية المتوفرة بالمعرض</label>
              <input 
                type="number"
                min="0"
                value={formData.stockCount ?? 5}
                onChange={(e) => {
                  const count = Number(e.target.value);
                  setFormData({ ...formData, stockCount: count, inStock: count > 0 });
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">مؤشر أداء الألعاب (1-100)</label>
              <input 
                type="number"
                min="1"
                max="100"
                value={formData.gamingScore ?? 90}
                onChange={(e) => setFormData({ ...formData, gamingScore: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-blue-400 focus:outline-none focus:border-blue-500 text-xs font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">مدة ونوع الضمان المعتمد</label>
              <input 
                type="text"
                value={formData.warranty || ''}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                placeholder="ضمان سنة واحدة استبدال فوري"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>
          </div>

          {/* SECTION 6: BADGES */}
          <div className="p-4 bg-[#0b0f19] border border-slate-800 rounded-2xl flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input 
                type="checkbox"
                checked={Boolean(formData.inStock)}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="font-bold">متوفر حالياً بالمعرض</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input 
                type="checkbox"
                checked={Boolean(formData.isBestSeller)}
                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
              />
              <span className="font-bold">🔥 الأكثر مبيعاً</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input 
                type="checkbox"
                checked={Boolean(formData.isNewArrival)}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
              />
              <span className="font-bold">✨ واصل حديثاً للفرع</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input 
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className="font-bold">⭐ مميز في واجهة المتجر</span>
            </label>
          </div>

          {/* SECTION 7: TECHNICAL SPECS */}
          <div className="space-y-3">
            <span className="font-bold text-slate-300 block">المواصفات التقنية السريعة (Specs):</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input 
                type="text"
                value={specs.vram || ''}
                onChange={(e) => setSpecs({ ...specs, vram: e.target.value })}
                placeholder="سعة الذاكرة (مثال: 16GB GDDR6X)"
                className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
              />
              <input 
                type="text"
                value={specs.socket || ''}
                onChange={(e) => setSpecs({ ...specs, socket: e.target.value })}
                placeholder="المقبس (Socket: AM5 / LGA1700)"
                className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
              />
              <input 
                type="text"
                value={specs.capacity || ''}
                onChange={(e) => setSpecs({ ...specs, capacity: e.target.value })}
                placeholder="السعة (Capacity: 2TB NVMe)"
                className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
              />
            </div>
          </div>

          {/* SECTION 8: DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 block">وصف ومميزات المنتج</label>
            <textarea 
              rows={3}
              value={formData.descriptionAr || ''}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              placeholder="اكتب نبذة عن قوة القطعة، اختبارات الأداء، ونظام التبريد..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          {/* SUBMIT ACTIONS */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{activeProduct ? 'حفظ وتحديث المنتج' : 'إضافة المنتج فوراً للكتالوج'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
