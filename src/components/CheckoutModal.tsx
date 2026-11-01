import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2, MessageCircle, Truck, MapPin, X, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';
import { CartItem, Order, OrderCustomer, StoreInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'IQD' | 'USD';
  storeInfo: StoreInfo;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  storeInfo,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: '',
    phoneNumber: '',
    province: 'بغداد - الكرخ',
    cityOrArea: '',
    notes: '',
    paymentMethod: 'cash_on_delivery'
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const totalIQD = items.reduce((sum, item) => sum + item.product.priceIQD * item.quantity, 0);

  const formattedTotal = currency === 'IQD'
    ? `${totalIQD.toLocaleString()} د.ع`
    : `$${totalUSD.toLocaleString()}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.cityOrArea) {
      alert('يرجى ملء جميع الحقول المطلوبة (الاسم، رقم الهاتف، والمنطقة).');
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map(it => ({
        productId: it.product.id,
        name: it.product.nameAr,
        priceUSD: it.product.priceUSD,
        priceIQD: it.product.priceIQD,
        quantity: it.quantity
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: orderItems,
          currency
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setCompletedOrder(data.data);
        onOrderSuccess(data.data);
      }
    } catch (err) {
      console.error('Failed to submit order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-tech">
                رقم الطلب: #{completedOrder.id}
              </span>
              <h3 className="text-2xl font-black text-white pt-2">تم تسجيل طلبك بنجاح!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                شكراً لثقتكم بمكتب القمر للحاسبات. تم تجهيز الطلب وإرسال الفاتورة لقسم المبيعات والتجميع.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>اسم المستلم:</span>
                <span className="text-white font-bold">{completedOrder.customer.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>العنوان:</span>
                <span className="text-white">{completedOrder.customer.province} - {completedOrder.customer.cityOrArea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>المجموع الكلي:</span>
                <span className="text-amber-400 font-bold font-tech text-sm">
                  {currency === 'IQD' ? `${completedOrder.totalIQD.toLocaleString()} د.ع` : `$${completedOrder.totalUSD}`}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="space-y-2 pt-2 max-w-md mx-auto">
              <a
                href={completedOrder.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>إرسال وتأكيد الطلب عبر واتساب المبيعات</span>
              </a>

              <a
                href={`tel:${storeInfo.phone}`}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>الاتصال بفرع شارع الصناعة ({storeInfo.phone})</span>
              </a>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 text-right space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Truck className="w-4 h-4" />
                <span>إتمام الطلب والتوصيل لجميع محافظات العراق</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">معلومات الزبون والشحن</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الاسم الكامل للزبون *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="مثال: أحمد علي جاسم"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الهاتف (آسيا / زين / كورك) *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="مثال: 0770xxxxxxx أو 0780xxxxxxx"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-tech text-left"
                  />
                </div>
              </div>

              {/* Province & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    المحافظة *
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {storeInfo.provinces.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    المنطقة / أقرب نقطة دالة *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="مثال: المنصور، شارع 14 رمضان قرب مطعم..."
                    value={formData.cityOrArea}
                    onChange={(e) => setFormData({ ...formData, cityOrArea: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  طريقة الدفع والتسليم
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'cash_on_delivery' 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                      className="hidden" 
                    />
                    <span className="font-bold text-xs">💵 الدفع عند الاستلام</span>
                    <span className="text-[10px] text-slate-500 mt-1">تسليم آمن وفحص</span>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'zain_cash' 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={formData.paymentMethod === 'zain_cash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'zain_cash' })}
                      className="hidden" 
                    />
                    <span className="font-bold text-xs">📱 زين كاش (Zain Cash)</span>
                    <span className="text-[10px] text-slate-500 mt-1">تحويل إلكتروني فوري</span>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'store_pickup' 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={formData.paymentMethod === 'store_pickup'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'store_pickup' })}
                      className="hidden" 
                    />
                    <span className="font-bold text-xs">🏢 استلام من شارع الصناعة</span>
                    <span className="text-[10px] text-slate-500 mt-1">فرع مكتب القمر</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ملاحظات إضافية بخصوص التجميع أو التوصيل (اختياري)
                </label>
                <textarea 
                  rows={2}
                  placeholder="مثال: يرجى تثبيت نظام ويندوز 11 مع أحدث التعريفات وتفعيل بروفايل XMP/EXPO للرامات..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Price & Submit Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">الإجمالي النهائي:</div>
                  <div className="text-xl font-black text-amber-400 font-tech">{formattedTotal}</div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  {loading ? 'جاري تسجيل الطلب...' : 'تأكيد وإرسال الطلب'}
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
