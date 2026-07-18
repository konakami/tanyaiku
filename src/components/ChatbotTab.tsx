import React, { useState } from 'react';
import { Save, RefreshCw, Send, Sparkles, Bot, AlertCircle, HelpCircle } from 'lucide-react';
import { ChatbotConfig, ChatMessage } from '../types';

interface ChatbotTabProps {
  chatbotConfig: ChatbotConfig;
  onSaveConfig: (updated: Partial<ChatbotConfig>) => Promise<boolean>;
  isSaving: boolean;
}

export default function ChatbotTab({ chatbotConfig, onSaveConfig, isSaving }: ChatbotTabProps) {
  // Form State
  const [botName, setBotName] = useState(chatbotConfig.botName);
  const [systemPrompt, setSystemPrompt] = useState(chatbotConfig.systemPrompt);
  const [welcomeMessage, setWelcomeMessage] = useState(chatbotConfig.welcomeMessage);
  const [fallbackMessage, setFallbackMessage] = useState(chatbotConfig.fallbackMessage);
  const [tone, setTone] = useState(chatbotConfig.tone);
  const [status, setStatus] = useState(chatbotConfig.status);
  const [knowledgeBase, setKnowledgeBase] = useState(chatbotConfig.knowledgeBase);

  // Chat Simulator State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: chatbotConfig.welcomeMessage || 'Halo! Ada yang bisa kami bantu?',
      createdAt: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatModeInfo, setChatModeInfo] = useState<string>(''); // 'gemini' or 'local_fallback_key_missing' etc.

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSaveConfig({
      botName,
      systemPrompt,
      welcomeMessage,
      fallbackMessage,
      tone,
      status,
      knowledgeBase
    });

    if (success) {
      // Refresh welcome message in simulator
      setMessages([
        {
          id: 'welcome-reset-' + Date.now(),
          sender: 'bot',
          text: welcomeMessage,
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      
      // Artificial delay for realistic chatting experience
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: data.reply || fallbackMessage,
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);

        if (data.source === 'gemini') {
          setChatModeInfo('Koneksi Gemini Aktif (Pintar)');
        } else if (data.source === 'local_fallback_key_missing') {
          setChatModeInfo('Demo Lokal (Kunci API Belum Disetel)');
        } else {
          setChatModeInfo('Demo Lokal Fallback');
        }
      }, 700);

    } catch (err) {
      console.error(err);
      setTimeout(() => {
        const errorMsg: ChatMessage = {
          id: 'error-' + Date.now(),
          sender: 'bot',
          text: fallbackMessage || 'Maaf, terjadi kesalahan koneksi chatbot.',
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMsg]);
        setIsTyping(false);
        setChatModeInfo('Koneksi Error');
      }, 700);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: welcomeMessage,
        createdAt: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Configuration Form Column */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Pengaturan Chatbot Mandiri</h3>
          <p className="text-xs text-slate-400 mt-1">
            Konfigurasikan asisten AI Anda secara instan. Perubahan akan langsung diserap oleh model Gemini secara real-time.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Asisten Bot</label>
              <input 
                type="text" 
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gaya Bicara (Tone)</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
              >
                <option value="friendly">Ramah & Sapaan (Friendly)</option>
                <option value="professional">Formal & Lugas (Professional)</option>
                <option value="casual">Santai & Akrab (Casual)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Chatbot</label>
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${status === 'active' ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-mono font-bold uppercase text-slate-300">
                  {status === 'active' ? 'Aktif (On WhatsApp)' : 'Jeda (Mati)'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pesan Pembuka (Welcome Message)</label>
            <input 
              type="text" 
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pesan Cadangan (Fallback Message)</label>
            <input 
              type="text" 
              value={fallbackMessage}
              onChange={(e) => setFallbackMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Dikirim jika pelanggan bertanya di luar basis pengetahuan bisnis.</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Instruksi Sistem Inti (System Prompt)</label>
            <textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Basis Pengetahuan Bisnis (Knowledge Base)</label>
            <textarea 
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              rows={8}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono leading-relaxed"
              required
              placeholder="Masukkan informasi daftar menu, harga, jam buka, alamat pengiriman, kontak admin dsb..."
            />
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Gemini AI akan merujuk basis pengetahuan di atas untuk menjawab pelanggan Anda.</span>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 disabled:opacity-50 text-slate-950 px-5 py-2.5 rounded-lg font-bold text-xs tracking-wide shadow-lg shadow-teal-500/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Konfigurasi Bot</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Simulator Column */}
      <div className="lg:col-span-5 flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{botName || 'Asisten Bot'}</h4>
                  <p className="text-[9px] text-slate-400">Simulator Obrolan WhatsApp</p>
                </div>
              </div>
              
              <button 
                onClick={handleResetChat}
                className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Reset Obrolan"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {chatModeInfo && (
              <div className="bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-semibold font-mono uppercase tracking-wider">Metode Pemrosesan</span>
                <span className="text-[10px] text-teal-400 font-bold font-mono">{chatModeInfo}</span>
              </div>
            )}
          </div>

          {/* Chat Messages Frame - WhatsApp Look */}
          <div className="flex-1 bg-slate-950 rounded-xl p-4 border border-slate-850 min-h-[350px] max-h-[420px] overflow-y-auto space-y-4 flex flex-col">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-slate-900 border border-slate-800 text-slate-200 self-start rounded-tl-none' 
                    : 'bg-teal-500/15 border border-teal-500/20 text-teal-100 self-end rounded-tr-none'
                }`}
              >
                <p className="font-semibold text-[9px] mb-1 font-mono tracking-wider uppercase opacity-60">
                  {msg.sender === 'bot' ? botName : 'Pelanggan'}
                </p>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-[8px] text-slate-500 block text-right mt-1 font-mono">
                  {new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-slate-900 border border-slate-800 text-slate-400 max-w-[85%] rounded-2xl p-3 text-xs rounded-tl-none self-start flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Input Chat form */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-850 pt-3 mt-4 flex gap-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan apa saja kepada bot Anda..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
              required
              disabled={isTyping || status !== 'active'}
            />
            <button 
              type="submit" 
              disabled={isTyping || !inputMessage.trim() || status !== 'active'}
              className="bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 p-2.5 rounded-lg font-bold transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {status !== 'active' && (
            <div className="mt-2 text-center text-[10px] text-rose-400 flex items-center justify-center gap-1 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Nyalakan status chatbot di atas agar simulator bisa dihubungi.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
