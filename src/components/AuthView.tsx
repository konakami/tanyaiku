import React, { useState } from 'react';
import { Bot, Mail, Lock, User, Building, ArrowRight, ArrowLeft } from 'lucide-react';

interface AuthViewProps {
  onBackToLanding: () => void;
  onLoginSuccess: (userData: { name: string; email: string; companyName: string }) => void;
}

export default function AuthView({ onBackToLanding, onLoginSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Akhmad Khudri');
  const [email, setEmail] = useState('khudri@binadarma.ac.id');
  const [companyName, setCompanyName] = useState('PT Konakami Digital Indonesia');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !companyName))) {
      setError('Mohon lengkapi semua baris input.');
      return;
    }
    setError('');
    onLoginSuccess({
      name: isLogin ? 'Akhmad Khudri' : name,
      email: email,
      companyName: isLogin ? 'PT Konakami Digital Indonesia' : companyName
    });
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Akhmad Khudri',
      email: 'khudri@binadarma.ac.id',
      companyName: 'PT Konakami Digital Indonesia'
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center relative px-4 py-12 selection:bg-teal-500 selection:text-slate-950">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Kembali ke Landing Page
        </button>

        {/* Brand logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="bg-gradient-to-tr from-teal-400 to-purple-500 p-2 rounded-xl text-slate-950">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">tanyaiku</span>
            <p className="text-[8px] text-slate-500 tracking-wider font-semibold uppercase -mt-0.5">Konakami SaaS Platform</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {isLogin ? 'Masuk ke Akun SaaS Anda' : 'Buat Akun Bisnis Baru'}
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            {isLogin ? 'Gunakan data uji coba demo atau buat akun baru secara instan' : 'Daftarkan tenant Anda dan mulai atur chatbot AI secara mandiri'}
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap Pemilik</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Akhmad Khudri"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Bisnis / Instansi / UMKM</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Contoh: Bakso Granat Palembang"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Email Bisnis</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: budi@konakami.id"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-teal-500/10 active:scale-95 transition-all mt-6 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLogin ? 'Masuk ke Platform' : 'Daftar & Buat Chatbot'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {isLogin && (
          <div className="mt-4">
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Atau Cepat</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>
            
            <button 
              onClick={handleDemoLogin}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-teal-500/30 hover:border-teal-400 text-teal-400 py-3 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Demo Instan: Masuk Sebagai Budi Santoso
            </button>
          </div>
        )}

        <div className="text-center mt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer underline decoration-teal-400/30 hover:decoration-teal-400 transition-all"
          >
            {isLogin ? 'Belum punya akun? Daftar gratis di sini' : 'Sudah punya akun? Masuk ke sini'}
          </button>
        </div>
      </div>
    </div>
  );
}
