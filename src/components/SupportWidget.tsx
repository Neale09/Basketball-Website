import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Check } from 'lucide-react';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hey baller! 🏀 Need recommendations on basketball shoes for indoor hardwood or outdoor concrete?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'Best shoes for outdoor courts?',
    'How does Cash on Delivery work?',
    'Shoe sizing: Do they run true to size?'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let botReply = 'Our court specialists are reviewing your request. For immediate assistance, feel free to call our toll-free line +91 9115497521!';
      const lower = userMsg.toLowerCase();

      if (lower.includes('outdoor') || lower.includes('concrete') || lower.includes('cement')) {
        botReply = 'For outdoor rough concrete, we highly recommend the **Skyrush Basketball Shoes** or **StreetGrip** with extra-abrasion XDR rubber compound!';
      } else if (lower.includes('cod') || lower.includes('cash on delivery') || lower.includes('payment')) {
        botReply = 'Cash on Delivery is 100% available nationwide for orders up to ₹15,000 with zero extra convenience charges. Simply enter your delivery PIN code!';
      } else if (lower.includes('size') || lower.includes('fit') || lower.includes('wide')) {
        botReply = 'AEROCOURT basketball shoes fit True-to-Size (TTS). If you wear thick athletic crew socks or ankle braces, we recommend sizing up by half a UK size.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Badge Button matching screenshot */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-white shadow-2xl border-2 border-neutral-900 flex items-center justify-center group hover:scale-105 transition-all cursor-pointer"
          aria-label="Open Court Support"
        >
          {/* Geometric Emblem inside */}
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2L3 9L6 12L12 7.5L18 12L21 9L12 2Z" />
              <path d="M12 22L21 15L18 12L12 16.5L6 12L3 15L12 22Z" />
            </svg>
          </div>

          {/* Online green indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />

          {/* Unread badge 1 (as seen in screenshot) */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            1
          </span>
        </button>
      ) : (
        /* Support Dialog Panel */
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col h-[460px] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-neutral-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-xs">
                  🏀
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-neutral-900" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">Court Support Live</h3>
                <span className="text-[10px] text-neutral-400">Sneaker & Gear Advisory</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-tr-xs'
                      : 'bg-white text-neutral-800 border border-neutral-200 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick prompt suggestions */}
          <div className="p-2 bg-white border-t border-neutral-100 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-semibold rounded-full cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-2.5 bg-white border-t border-neutral-200 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about court shoes, sizing..."
              className="flex-1 text-xs px-3 py-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-neutral-900"
            />
            <button
              type="submit"
              className="p-2 bg-black hover:bg-neutral-800 text-white rounded-lg cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
