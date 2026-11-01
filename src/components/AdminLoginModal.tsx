import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, X, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      let savedAdminUsername = 'admin';
      let savedAdminPin = '7708';
      try {
        savedAdminUsername = localStorage.getItem('alqamar_admin_username') || 'admin';
        savedAdminPin = localStorage.getItem('alqamar_admin_pin') || '7708';
      } catch {
        // Fallback
      }

      const inputUser = username.trim().toLowerCase();
      const inputPass = password.trim();

      const validUsernames = [savedAdminUsername.toLowerCase(), 'admin', 'manager', 'alqamar'];
      const validPasswords = [savedAdminPin, '7708', 'admin1234'];

      const isUsernameValid = validUsernames.includes(inputUser);
      const isPasswordValid = validPasswords.includes(inputPass);

      if (isUsernameValid && isPasswordValid) {
        setIsLoading(false);
        setUsername('');
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التحقق من البيانات والمحاولة مجدداً.');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl text-right relative">
        
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Icon & Title */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg shadow-amber-500/20 bg-white mb-1 p-0.5">
              <img 
                src="/assets/aistudio/IMG-20260416-WA0018_6ae70193.jpg" 
                alt="Moon Computer" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-black text-white">
              بوابة تسجيل دخول المدير
            </h2>
            <div className="text-xs text-amber-400 font-bold">
              مكتب القمر للحاسبات (Moon Computer)
            </div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              شارع الصناعة، مقابل الجامعة التكنولوجية، مقابل عمود 14
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                <span>اسم مستخدم المدير:</span>
                <User className="w-3.5 h-3.5 text-blue-400" />
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  placeholder="اسم المستخدم (Username)"
                  autoFocus
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-tech text-right"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                <span>كلمة المرور:</span>
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              </label>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-tech text-center tracking-widest"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>جاري التحقق من الصلاحية...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>دخول لوحة التحكم</span>
                </>
              )}
            </button>

            {/* Helper Note for the Manager */}
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-center space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">بيانات الدخول الافتراضية للمدير:</span>
              <div className="text-xs text-blue-400 font-tech font-bold flex items-center justify-center gap-3">
                <span>اسم المستخدم: <strong className="text-white">admin</strong></span>
                <span>·</span>
                <span>كلمة المرور: <strong className="text-white">7708</strong></span>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
