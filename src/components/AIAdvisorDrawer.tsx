import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, RefreshCw, RotateCcw } from 'lucide-react';
import { StoreInfo } from '../types';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface AIAdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
}

export const AIAdvisorDrawer: React.FC<AIAdvisorDrawerProps> = ({
  isOpen,
  onClose,
  storeInfo
}) => {
  const initialGreeting = `مرحباً بك في مستشار "مكتب القمر للحاسبات" الذكي! 🌙🎮\nأنا هنا لمساعدتك في اختيار وتجميع أفضل حاسوب، مقارنة كروت الشاشة والمعالجات (Intel vs AMD)، وتقديم نصائح دقيقة لميزانيتك في العراق. كيف يمكنني مساعدتك اليوم؟`;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: initialGreeting,
      time: 'الآن'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'عندي ميزانية مليون ونص دينار عراقي شنو احسن تجميعة ألعاب؟',
    'المزيد عن التجميعة وتطويرها',
    'أيهما أفضل للألعاب: Ryzen 7 7800X3D أم Intel i7-14700K؟',
    'هل كرت RTX 4070 Ti Super يكفي لألعاب 4K؟',
    'ما هي أفضل شاشة قيمنق 240Hz متوفرة عندكم؟'
  ];

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: initialGreeting,
        time: 'الآن'
      }
    ]);
  };

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
    };

    // Keep history of previous turns (excluding greeting if desired, or all)
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-10).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
          history: historyPayload
        })
      });
      const data = await res.json();
      
      const aiReplyText = data.success && data.data?.reply
        ? data.data.reply
        : 'أهلاً بك! يمكنك زيارة فرعنا بشارع الصناعة أو التواصل المباشر مع خبرائنا عبر الهاتف: 07708732185';

      const aiMsg: Message = {
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'عذراً، حدث خطأ مؤقت في الاتصال. يمكنك الاتصال بخبير مكتب القمر مباشرة على 07708732185.',
          time: 'الآن'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render bold asterisks **bold** in message text
  const renderFormattedText = (rawText: string) => {
    return rawText.split('\n').map((line, lineIdx) => {
      // Split by **
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={lineIdx} className={line.trim() === '' ? 'h-2' : ''}>
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="text-amber-400 font-bold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-r border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">مستشار القمر الذكي (AI)</h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded border border-cyan-500/30">
                  خبير الهاردوير
                </span>
              </div>
              <p className="text-[11px] text-slate-400">مكتب القمر للحاسبات - شارع الصناعة</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="بدء محادثة جديدة"
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              title="إغلاق"
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={loading}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border border-slate-700/60 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex gap-3 text-right ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-100 rounded-tr-none' 
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <div className="space-y-1">{renderFormattedText(m.text)}</div>
                <div className="text-[10px] text-slate-500 mt-2 text-left font-tech">{m.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-right">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl text-xs text-cyan-300">
                جاري تحليل طلبك ومطابقة أفضل قطع الهاردوير...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك التقني، ميزانيتك، أو القطع التي تريد مقارنتها..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 text-center text-[10px] text-slate-500">
            للحصول على عروض أسعار وفواتير مخصصة اتصل بالفرع: <span className="font-tech text-amber-400">{storeInfo.phone}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
