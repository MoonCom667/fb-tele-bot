import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Wrench, X, Navigation } from 'lucide-react';
import { StoreInfo } from '../types';

interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
}

export const StoreLocationModal: React.FC<StoreLocationModalProps> = ({
  isOpen,
  onClose,
  storeInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-right space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg shadow-amber-500/20 bg-white shrink-0 p-0.5">
              <img 
                src={storeInfo.logo || "/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg"} 
                alt="كمبيوتر القمر Moon Computer" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>الفرع الرئيسي وورشة التجميع المعتمدة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                مكتب القمر للحاسبات (Moon Computer)
              </h2>
              <p className="text-xs text-slate-400">
                بغداد، شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود 14
              </p>
            </div>
          </div>

          {/* Location Details Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <MapPin className="w-4 h-4" />
                <span>العنوان التفصيلي:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-bold">
                {storeInfo.addressDetails}
              </p>
              <div className="text-[11px] text-amber-300">
                شارع الصناعة • مقابل الجامعة التكنولوجية • مقابل عمود رقم 14
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Clock className="w-4 h-4" />
                <span>أوقات العمل والدوام:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {storeInfo.workingHours}
              </p>
              <div className="text-[11px] text-emerald-400 font-bold">
                ● الفرع وورشة الصيانة مفتوحة لاستقبالكم
              </div>
            </div>

          </div>

          {/* Workshop & Service Features */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300">الخدمات المتوفرة في فرع شارع الصناعة:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>تجميع بي سي احترافي خلال 45 دقيقة</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>فحص حرارة واستقرار وكسر سرعة الرام</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>شحن وتوصيل معتمد لجميع المحافظات</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>استشارات ترقية مجانية مباشرة من الخبراء</span>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${storeInfo.phone}`}
              className="flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال مباشر: {storeInfo.phone}</span>
            </a>

            <a
              href={`https://wa.me/${storeInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>محادثة واتساب سريعة</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
