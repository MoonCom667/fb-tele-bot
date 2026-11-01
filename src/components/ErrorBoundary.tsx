import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false
  };

  constructor(props: Props) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Al-Qamar Store Error Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetStorage = () => {
    try {
      localStorage.removeItem('alqamar_admin_session');
      localStorage.removeItem('alqamar_admin_products');
      localStorage.removeItem('alqamar_admin_home_sections');
      localStorage.removeItem('alqamar_cart');
      localStorage.removeItem('alqamar_build');
      localStorage.removeItem('alqamar_orders');
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen bg-[#070a0f] text-slate-100 flex items-center justify-center p-4 font-cairo"
          dir="rtl"
        >
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
            
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                مكتب القمر للحاسبات - تعافي المتجر
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                حدث استثناء غير متوقع أثناء تحميل الصفحة. يمكنك إعادة تحميل المتجر أو استعادة الإعدادات الافتراضية بسهولة.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل المتجر</span>
              </button>

              <button
                onClick={this.handleResetStorage}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>إصلاح واستعادة البيانات الافتراضية</span>
              </button>
            </div>

            {/* Error Details Toggle */}
            <div className="pt-4 border-t border-slate-800/80">
              <button
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                className="text-[11px] text-slate-500 hover:text-slate-400 underline transition-colors"
              >
                {this.state.showDetails ? 'إخفاء التفاصيل الفنية' : 'عرض التفاصيل الفنية للخطأ'}
              </button>

              {this.state.showDetails && this.state.error && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-[11px] text-rose-400 max-h-40 overflow-y-auto" dir="ltr">
                  <p className="font-bold">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className="text-[10px] text-slate-500 mt-2 whitespace-pre-wrap">
                      {this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
