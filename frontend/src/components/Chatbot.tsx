import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I am the Kidrove AI assistant. Ask me anything about the AI & Robotics Summer Workshop!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage];
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: history })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Oops! I had trouble connecting. Feel free to submit the registration form for direct callback!' }
        ]);
      }
    } catch (err) {
      // Client-side fallback if backend is not running
      setTimeout(() => {
        const lowerText = textToSend.toLowerCase();
        let reply = "I am running in static sandbox mode. The workshop starts on 15 July 2026 for ages 8-14, duration is 4 weeks, and fee is ₹2,999. Please submit the form above for full info!";
        
        if (lowerText.includes('price') || lowerText.includes('fee') || lowerText.includes('cost') || lowerText.includes('money')) {
          reply = "The workshop fee is ₹2,999. This covers the entire 4 weeks, certificates, and access to all online coding platforms.";
        } else if (lowerText.includes('age') || lowerText.includes('years') || lowerText.includes('kid') || lowerText.includes('child')) {
          reply = "It's designed for children aged 8 to 14. We start from scratch, so no prior experience is needed.";
        } else if (lowerText.includes('when') || lowerText.includes('date') || lowerText.includes('start')) {
          reply = "The workshop starts on 15 July 2026. Live interactive classes are held twice a week on weekends.";
        } else if (lowerText.includes('online') || lowerText.includes('mode') || lowerText.includes('where')) {
          reply = "The sessions are completely online and conducted live, so children can participate and ask questions in real-time from home.";
        }

        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    handleSend(q);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-100 rounded-3xl w-[350px] sm:w-[380px] h-[500px] shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-purple to-brand-teal p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-none">Kidrove Bot</h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-white/80">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-purple text-white rounded-br-none shadow-md shadow-brand-purple/10'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-purple" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions suggestion */}
            {messages.length === 1 && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickQuestion('What is the fee?')}
                  className="bg-white border border-slate-200 hover:border-brand-purple hover:text-brand-purple text-xs text-slate-600 px-3 py-1.5 rounded-full transition-all"
                >
                  Fee?
                </button>
                <button
                  onClick={() => handleQuickQuestion('Who is this for?')}
                  className="bg-white border border-slate-200 hover:border-brand-purple hover:text-brand-purple text-xs text-slate-600 px-3 py-1.5 rounded-full transition-all"
                >
                  Age Limit?
                </button>
                <button
                  onClick={() => handleQuickQuestion('When does it start?')}
                  className="bg-white border border-slate-200 hover:border-brand-purple hover:text-brand-purple text-xs text-slate-600 px-3 py-1.5 rounded-full transition-all"
                >
                  Start Date?
                </button>
              </div>
            )}

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t border-slate-100 flex gap-2 items-center bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the workshop..."
                className="flex-grow px-4 py-2.5 bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/10 text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-brand-purple hover:bg-brand-purple-dark text-white p-2.5 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-teal rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-slow -z-10" />
        
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
          <div className="bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl whitespace-nowrap relative flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Chat with AI Bot!
            <div className="absolute top-full right-6 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1" />
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-brand-purple to-brand-teal text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center relative hover:scale-110 active:scale-95 w-14 h-14 border border-white/20"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6" />
          )}
          
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
