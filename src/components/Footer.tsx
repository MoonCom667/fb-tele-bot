import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  Truck, 
  X, 
  Send, 
  Instagram, 
  Facebook, 
  Youtube, 
  Lock, 
  RotateCcw,
  Cpu
} from 'lucide-react';
import { StoreInfo, ProductCategory } from '../types';

interface FooterProps {
  storeInfo: StoreInfo;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenBuilder: () => void;
  onOpenLocation: () => void;
  onOpenAIAdvisor: () => void;
  onOpenAdmin?: () => void;
}

type PolicyModalType = 'privacy' | 'shipping' | 'warranty' | 'return' | null;

export const Footer: React.FC<FooterProps> = ({
  storeInfo,
  onSelectCategory,
  onOpenBuilder,
  onOpenLocation,
  onOpenAIAdvisor,
  onOpenAdmin
}) => {
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyModalType>(null);

  return (
    <footer className="bg-[#060911] border-t border-slate-800/80 text-slate-400 text-xs select-none mt-16">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-right">
        
        {/* Brand & Contact */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md shadow-amber-500/20 bg-white shrink-0 p-0.5">
              <img 
                src={storeInfo.logo || "/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg"} 
                alt="كمبيوتر القمر Moon Computer" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-base font-black text-white block">مكتب القمر للحاسبات</span>
              <span className="text-[11px] text-amber-400 font-tech">Moon Computer · بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود 14</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-md">
            المركز التخصصي لتجهيز حواسيب الألعاب والهندسة، كروت الشاشة الحديثة، المعالجات، واللابتوبات الاحترافية بضمان محلي معتمد من قلب شارع الصناعة في بغداد.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <a 
              href={`https://wa.me/${storeInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              title="واتساب المبيعات"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              title="فيسبوك"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="إنستغرام"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              title="تيليجرام"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-sky-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              title="يوتيوب"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-red-400 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-1 text-slate-400 text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>ساعات العمل: 9:30 صباحاً حتى 8:30 مساءً (الجمعة عطلة)</span>
          </div>
        </div>

        {/* Categories Quick Nav */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">أقسام المتجر</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button onClick={() => onSelectCategory('gpus')} className="hover:text-white transition-colors cursor-pointer">
                كروت الشاشة (NVIDIA & AMD)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('cpus')} className="hover:text-white transition-colors cursor-pointer">
                المعالجات (Intel & Ryzen)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('laptops')} className="hover:text-white transition-colors cursor-pointer">
                لابتوبات الألعاب والمونتاج
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('monitors')} className="hover:text-white transition-colors cursor-pointer">
                شاشات الألعاب الاحترافية
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('prebuilt_pcs')} className="hover:text-white transition-colors cursor-pointer">
                التجميعات المكتبية الجاهزة
              </button>
            </li>
          </ul>
        </div>

        {/* Store Services */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">خدمات المتجر</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button onClick={onOpenBuilder} className="hover:text-blue-400 transition-colors cursor-pointer">
                مجمع الحاسوب التفاعلي (PC Builder)
              </button>
            </li>
            <li>
              <button onClick={onOpenAIAdvisor} className="hover:text-blue-400 transition-colors cursor-pointer">
                مستشار التجميع الذكي
              </button>
            </li>
            <li>
              <button onClick={onOpenLocation} className="hover:text-white transition-colors cursor-pointer">
                موقع المعرض في شارع الصناعة
              </button>
            </li>
            {onOpenAdmin && (
              <li>
                <button onClick={onOpenAdmin} className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5 text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>دخول إدارة المتجر (لوحة التحكم)</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">الضمان والسياسات</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button onClick={() => setActivePolicyModal('shipping')} className="hover:text-white transition-colors cursor-pointer">
                سياسة الشحن والتوصيل للمحافظات
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('warranty')} className="hover:text-white transition-colors cursor-pointer">
                شروط الضمان والكفالة المحلية
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('return')} className="hover:text-white transition-colors cursor-pointer">
                سياسة الاستبدال والاسترجاع
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-white transition-colors cursor-pointer">
                سياسة الخصوصية والأمان
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar with Discreet Manager Lock Icon */}
      <div className="border-t border-slate-900 py-4 bg-[#04060c] text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} مكتب القمر للحاسبات (Moon Computer) — العراق، بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود 14. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-3 text-slate-500">
            <span>الدفع عند الاستلام لكافة المحافظات</span>
            <span>·</span>
            <span className="font-tech">{storeInfo.phone}</span>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  title="دخول الإدارة"
                  aria-label="دخول الإدارة"
                  className="p-1 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-right space-y-4 shadow-2xl relative">
            
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {activePolicyModal === 'shipping' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                  <Truck className="w-5 h-5" />
                  <span>سياسة الشحن والتوصيل لكافة المحافظات</span>
                </div>
                <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <p>• داخل بغداد (الكرخ والرصافة): توصيل سريع خلال أقل من 24 ساعة.</p>
                  <p>• كافة المحافظات العراقية: شحن آمن ومغلف للأجهزة الحساسة خلال 24–48 ساعة.</p>
                  <p>• إمكانية معاينة الشحنة قبل الدفع عند الاستلام.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'warranty' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <span>شروط الضمان والكفالة المحلية</span>
                </div>
                <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <p>• جميع القطع المباعة مصحوبة بضمان محلي معتمد مسجل بالرقم التسلسلي (Serial Number).</p>
                  <p>• التجميعات المكتبية تخضع لفحص حراري واختبار ضغط شامل قبل التسليم.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'privacy' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                  <Lock className="w-5 h-5" />
                  <span>سياسة الخصوصية والأمان</span>
                </div>
                <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <p>• تُستخدم بيانات الاسم ورقم الهاتف والعنوان حصرياً لتجهيز وتوصيل طلبات الزبائن.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'return' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                  <RotateCcw className="w-5 h-5" />
                  <span>سياسة الاستبدال والاسترجاع</span>
                </div>
                <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <p>• يتم استبدال أي قطعة يثبت وجود خلل مصنعي فيها خلال 7 أيام من تاريخ الشراء بشرط سلامة العلبة والملحقات.</p>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
};
