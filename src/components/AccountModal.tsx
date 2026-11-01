import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Clock, 
  ShieldCheck, 
  X, 
  Save, 
  Check, 
  MessageCircle, 
  Wrench,
  Settings,
  LogOut
} from 'lucide-react';
import { StoreInfo, OrderCustomer, Order, PCBuildParts } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
  userProfile: OrderCustomer;
  onSaveProfile: (profile: OrderCustomer) => void;
  recentOrders?: Order[];
  currentBuild?: PCBuildParts;
  onOpenPCBuilder?: () => void;
  onOpenAdmin?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  storeInfo,
  userProfile,
  onSaveProfile,
  recentOrders = [],
  currentBuild = {},
  onOpenPCBuilder,
  onOpenAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'builds'>('profile');
  const [form, setForm] = useState<OrderCustomer>(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const hasPartsInBuild = Object.keys(currentBuild).length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-center gap-4 text-right">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">
                {form.fullName || 'حساب الزبون'}
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                زبون مكتب القمر
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              إدارة بيانات الشحن، مراجعة الطلبات، والتجميعات المحفوظة
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'profile'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            👤 البيانات الشخصية والعنوان
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>سجل الطلبات والفواتير</span>
            {recentOrders.length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 rounded-full font-black">
                {recentOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('builds')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'builds'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>تجميعة البي سي الحالية</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          
          {/* TAB 1: Profile & Shipping Form */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4 text-right">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علي محمد حسن"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 07708732185"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-tech text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    المحافظة الافتراضية للشحن
                  </label>
                  <select
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {storeInfo.provinces.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    المنطقة / العنوان التفصيلي
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: المنصور، شارع 14 رمضان قرب..."
                    value={form.cityOrArea}
                    onChange={(e) => setForm({ ...form, cityOrArea: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>يتم حفظ هذه البيانات تلقائياً لتسهيل عمليات التجميع والطلب القادمة.</span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                {isSaved ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <Check className="w-4 h-4" />
                    <span>تم حفظ البيانات بنجاح!</span>
                  </span>
                ) : <div />}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4 text-right">
              {recentOrders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Package className="w-12 h-12 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-300">لا توجد طلبات سابقة في هذه الجلسة</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    عند تأكيد أي طلب أو تجميعة، ستظهر الفاتورة وحالة التجهيز هنا تلقائياً.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-xs font-bold text-amber-400 font-tech">
                          #{order.id}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {order.status === 'completed'
                            ? 'تم اكتمال التوصيل'
                            : order.status === 'shipped'
                            ? 'جاري الشحن والتوصيل'
                            : order.status === 'processing'
                            ? 'قيد التجهيز الفني'
                            : order.status === 'cancelled'
                            ? 'ملغي'
                            : 'تم استلام وتأكيد الطلب'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <div>العنوان: {order.customer.province} - {order.customer.cityOrArea}</div>
                        <div className="text-slate-400">المنتجات ({order.items.length} قطع):</div>
                        <ul className="list-disc list-inside text-[11px] text-slate-400 pr-2">
                          {order.items.map((it, idx) => (
                            <li key={idx}>
                              {it.name} (×{it.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">المجموع:</span>
                        <span className="font-bold text-amber-400 font-tech">
                          {order.currency === 'IQD' ? `${order.totalIQD.toLocaleString()} د.ع` : `$${order.totalUSD}`}
                        </span>
                      </div>

                      <div className="pt-1">
                        <a
                          href={order.whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>متابعة الطلب عبر واتساب المبيعات</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved PC Build */}
          {activeTab === 'builds' && (
            <div className="space-y-4 text-right">
              {hasPartsInBuild ? (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                    لديك تجميعة قيد الإنشاء في مجمع البي سي التفاعلي.
                  </div>

                  <div className="space-y-1.5">
                    {Object.entries(currentBuild).map(([slot, part]) => {
                      if (!part) return null;
                      const productPart = part as unknown as { nameAr: string; priceUSD: number };
                      return (
                        <div key={slot} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{productPart.nameAr}</span>
                          <span className="text-amber-400 font-tech font-bold">${productPart.priceUSD}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenPCBuilder) onOpenPCBuilder();
                      onClose();
                    }}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>متابعة تعديل وفحص التوافقية في PC Builder</span>
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-300">لا توجد تجميعة حالية</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    استخدم أداة مجمع البي سي التفاعلي لاختيار المعالج، كرت الشاشة، واللوحة مع فحص التوافقية الفوري.
                  </p>
                  <button
                    onClick={() => {
                      if (onOpenPCBuilder) onOpenPCBuilder();
                      onClose();
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold"
                  >
                    فتح مجمع البي سي
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Manager Login Gateway Footer */}
        {onOpenAdmin && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">خاص بإدارة المتجر والمشرفين:</span>
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 rounded-xl font-bold transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>تسجيل دخول المدير (لوحة التحكم)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
