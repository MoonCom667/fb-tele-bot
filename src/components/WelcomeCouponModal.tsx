import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Gift, 
  Tag, 
  X, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Percent,
  Flame,
  Bot
} from 'lucide-react';

interface WelcomeCouponModalProps {
  currency: 'IQD' | 'USD';
  isOpen?: boolean;
  onClose?: () => void;
}

export const WelcomeCouponModal: React.FC<WelcomeCouponModalProps> = ({
  currency,
  isOpen: externalIsOpen,
  onClose: externalOnClose
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto show popup on first visit after 2.5 seconds
  useEffect(() => {
    if (externalIsOpen !== undefined) return;

    try {
      const hasSeen = localStorage.getItem('alqamar_welcome_coupon_seen');
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setInternalIsOpen(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, [externalIsOpen]);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    try {
      localStorage.setItem('alqamar_welcome_coupon_seen', 'true');
    } catch {
      // Ignore storage restrictions
    }
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setIsSubscribed(true);
    localStorage.setItem('alqamar_newsletter_subscribed', 'true');
    localStorage.setItem('alqamar_welcome_coupon_seen', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME_QAMAR');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300 select-none">
      
      {/* Outer Modal Container */}
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl relative overflow-hidden my-auto">
        
        {/* Glow & Sparkle Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-black">
            <Gift className="w-4 h-4 animate-bounce" />
            <span>هدية الترحيب للعملاء الجدد بمكتب القمر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            احصل على خصم <span className="text-amber-400">{currency === 'IQD' ? '25,000 د.ع' : '$20'}</span> عند أول طلب!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            اشترك في النشرة البريدية اليومية لمكتب القمر ليصلك جديد كروت الشاشة، عروض التجميعات، وأكواد التخفيض الحصرية قبل الجميع.
          </p>
        </div>

        {/* Coupon Code Reveal Card */}
        <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 text-center space-y-3 relative z-10 shadow-inner">
          <span className="text-[11px] font-bold text-slate-400 block">كود التخفيض الترحيبي الخاص بك:</span>
          
          <div className="flex items-center justify-center gap-3">
            <span className="font-tech text-xl sm:text-2xl font-black text-amber-400 tracking-wider bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/40">
              WELCOME_QAMAR
            </span>

            <button
              onClick={handleCopyCode}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
                copiedCode 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-500 block font-bold">
            صالح للاستخدام عند الشراء بقيمة 200,000 د.ع أو أكثر
          </span>
        </div>

        {/* Subscription Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="space-y-3 relative z-10 text-xs">
            <label className="block text-slate-300 font-bold">
              أدخل بريدك الإلكتروني أو رقم الواتساب لتفعيل الكود واستلام التنبيهات:
            </label>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  required
                  placeholder="مثال: name@gmail.com أو 0770XXXXXXX" 
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-3 pr-9 text-white focus:outline-none text-xs transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3" />
              </div>

              <button
                type="submit"
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-amber-500/20"
              >
                <span>تفعيل</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>خصوصيتك بأمان معنا • بدون إزعاج</span>
              </span>
              <span>تطبيق الخصم فورياً بالسلة</span>
            </div>
          </form>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-2 relative z-10">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-white">تم الاشتراك وتفعيل الخصم بنجاح!</h4>
            <p className="text-xs text-slate-300">
              تم إضافة الخصم إلى حسابك. يمكنك استخدام الكود <span className="font-tech text-amber-400 font-bold">WELCOME_QAMAR</span> أثناء إتمام الشراء.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 text-center border-t border-slate-800 relative z-10">
          <button
            onClick={handleClose}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-bold"
          >
            تخطي ومتابعة التسوق بالسعر العادي
          </button>
        </div>

      </div>

    </div>
  );
};
