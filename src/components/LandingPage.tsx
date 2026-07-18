import React, { useState } from 'react';
import { Bot, MessageSquare, Megaphone, Bell, Check, ArrowRight, Star, Globe, Shield, Smartphone, Zap, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Pro' | 'Business'>('Starter');

  const useCases = [
    {
      title: 'UMKM Kuliner',
      icon: '🍔',
      badge: 'Target Utama',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      features: [
        'Jawab menu & harga otomatis',
        'Terima pesanan via chat',
        'Blast promo harian / mingguan',
        'Ucapan ultah pelanggan setia'
      ]
    },
    {
      title: 'BUMD / Instansi',
      icon: '🏢',
      badge: 'High Value',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      features: [
        'Asisten informasi layanan publik',
        'Routing pengaduan ke departemen',
        'FAQ regulasi dan prosedur',
        'Notifikasi jadwal dan agenda'
      ]
    },
    {
      title: 'Sekolah / Kampus',
      icon: '🎓',
      badge: 'Volume Besar',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      features: [
        'FAQ akademik 24/7',
        'Informasi jadwal & kalender',
        'Panduan administrasi mahasiswa',
        'Bot akreditasi dan borang'
      ]
    },
    {
      title: 'Perusahaan',
      icon: '🤝',
      badge: 'Enterprise',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      features: [
        'Knowledge base internal',
        'HR assistant & onboarding',
        'SOP yang bisa ditanya',
        'Internal FAQ karyawan'
      ]
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Daftar & Pilih Plan',
      desc: 'Daftarkan bisnis Anda di platform Tanyaiku dan pilih paket langganan bulanan sesuai kebutuhan operasional.'
    },
    {
      num: '02',
      title: 'Isi Knowledge Base',
      desc: 'Unggah menu makanan, harga produk, peraturan SOP, atau FAQ bisnis Anda. AI langsung belajar secara cerdas.'
    },
    {
      num: '03',
      title: 'Hubungkan Channel',
      desc: 'Sambungkan chatbot Anda langsung ke WhatsApp (WABA Resmi atau Fonnte), Instagram DM, atau web widget.'
    },
    {
      num: '04',
      title: 'Bot Langsung Hidup',
      desc: 'Asisten AI Anda siap menjawab 24/7, mengirim pesan siaran, dan menjaga pelanggan setia Anda secara otomatis.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-teal-500 selection:text-slate-950">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-center py-2 px-4 text-xs font-medium text-slate-950 flex items-center justify-center gap-2">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">Terbaru</span>
        <span>Kini Tanyaiku terintegrasi resmi dengan WhatsApp Business API & Fonnte Gateway Hemat!</span>
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-teal-400 to-purple-500 p-2.5 rounded-xl text-slate-950 shadow-lg shadow-teal-500/10">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">tanyaiku</span>
              <p className="text-[9px] text-slate-400 tracking-widest uppercase font-semibold">by Konakami Digital Indonesia</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#solusi" className="hover:text-teal-400 transition-colors">Solusi</a>
            <a href="#usecases" className="hover:text-teal-400 transition-colors">Use Cases</a>
            <a href="#cara-kerja" className="hover:text-teal-400 transition-colors">Cara Kerja</a>
            <a href="#harga" className="hover:text-teal-400 transition-colors">Harga Paket</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={onGetStarted}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Masuk
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-teal-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              Coba Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-teal-400 mb-8"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Satu bot. Tiga kemampuan. Semua bisa dikustomisasi.</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]"
            >
              Solusi Chatbot AI Mandiri Untuk{' '}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">Dukungan Pelanggan Bisnis</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Otomatiskan balasan WhatsApp Anda menggunakan kecerdasan Gemini AI. Dilengkapi pilihan WhatsApp Business API Resmi dan Gateway Alternatif Hemat Fonnte dengan sistem Wallet Fleksibel & Integrasi Midtrans.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-8 py-4 rounded-xl font-bold tracking-wide shadow-xl shadow-teal-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-base"
              >
                Mulai Uji Coba Gratis <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="#solusi"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 px-8 py-4 rounded-xl font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 text-base"
              >
                <Play className="w-4 h-4 fill-current text-teal-400" /> Lihat Fitur Utama
              </a>
            </motion.div>
          </div>

          {/* Interactive Hero Asset / UI Preview */}
          <div className="mt-16 border border-slate-800 bg-slate-900/50 rounded-2xl p-4 sm:p-6 shadow-2xl relative max-w-4xl mx-auto">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500 font-mono ml-2">tanyaiku-dashboard-v1.0</span>
              </div>
              <div className="bg-slate-950 border border-slate-800/80 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Gemini-3.5-Flash Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Chatbot Config Mockup */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Pusat Konfigurasi Chatbot</h4>
                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Pilih Model AI</label>
                    <div className="bg-slate-900 px-3 py-2 rounded text-xs border border-slate-800 text-slate-200">
                      Gemini-3.5-Flash (Teks Pintar, Cepat, Hemat)
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Knowledge Base Bisnis Anda (Basis Pengetahuan)</label>
                    <div className="bg-slate-900 p-2.5 rounded text-[11px] font-mono border border-slate-800 text-slate-300 max-h-32 overflow-y-auto">
                      Menu Geprek Spesial Rp 15.000. Lokasi Jl. Sudirman Palembang. Hubungi 0812-3456-7890 untuk order.
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">WhatsApp Channel API</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-900 p-2.5 rounded text-xs border border-teal-500/50 flex items-center justify-between">
                        <span>WhatsApp Business API (Official)</span>
                        <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20 font-bold">Terpilih</span>
                      </div>
                      <div className="flex-1 bg-slate-900/50 p-2.5 rounded text-xs border border-slate-800 flex items-center justify-between opacity-50">
                        <span>Fonnte Gateway (Hemat)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Simulator Preview */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col h-72">
                <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-300">Simulator Bot</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">Real-time</span>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-[11px] mb-2">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 max-w-[85%]">
                    <p className="text-teal-400 font-semibold mb-0.5 text-[9px]">Tanyaiku Bot</p>
                    <p className="text-slate-300">Halo! Selamat datang di Ayam Geprek Konakami. Ada yang bisa saya bantu hari ini?</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-500/20 p-2.5 rounded-lg max-w-[85%] ml-auto text-right">
                    <p className="text-slate-400 font-semibold mb-0.5 text-[9px]">Pelanggan</p>
                    <p className="text-slate-200">Geprek Spesial harganya berapa ya?</p>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 max-w-[85%]">
                    <p className="text-teal-400 font-semibold mb-0.5 text-[9px]">Tanyaiku Bot</p>
                    <p className="text-slate-300">Untuk menu Geprek Spesial harganya hanya Rp 15.000 saja kak! Mau dipesan berapa porsi?</p>
                  </div>
                </div>
                <div className="border-t border-slate-900 pt-2 flex gap-1">
                  <input 
                    type="text" 
                    placeholder="Ketik pertanyaan simulasi..." 
                    disabled 
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-400 placeholder:text-slate-600 focus:outline-none"
                  />
                  <button className="bg-teal-500 text-slate-950 px-2 py-1 rounded text-xs font-bold opacity-60 cursor-not-allowed">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 1 - Solusi Section */}
      <section id="solusi" className="py-24 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Solusi Kami</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Satu bot. Tiga kemampuan. Semua bisa dikustomisasi.</h3>
            <p className="text-slate-400 mt-4">Bukan sekadar chatbot — ini sistem manajemen hubungan pelanggan yang berbicara dan membantu pertumbuhan bisnis Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Jawab Card */}
            <div className="bg-slate-900/40 border border-slate-800 hover:border-teal-500/30 p-8 rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/20">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                <span>JAWAB</span>
                <span className="text-xs bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded font-mono font-bold">Otomatis 24/7</span>
              </h4>
              <p className="text-slate-400 text-sm mb-6">Merespons pesan pelanggan Anda seketika tanpa tertunda, kapan pun pertanyaan diajukan.</p>
              <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Jawab informasi menu, harga, & jam operasional</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Mengecek ketersediaan stok produk bisnis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Menjelaskan lokasi, cara memesan, & cara bayar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>FAQ bisnis kustom tak terbatas</span>
                </li>
              </ul>
            </div>

            {/* Broadcast Card */}
            <div className="bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 p-8 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 transition-all">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/20">
                <Megaphone className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                <span>BROADCAST</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono font-bold">Massal & Efisien</span>
              </h4>
              <p className="text-slate-400 text-sm mb-6">Mengirim pesan siaran promo atau pengumuman massal dalam hitungan detik.</p>
              <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Blast promosi ke ribuan kontak sekaligus</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Segmentasi penerima berdasarkan riwayat beli</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Sistem otomatisasi ucapan ulang tahun</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Pesan seasonal cerdas (Lebaran, Natal, dll)</span>
                </li>
              </ul>
            </div>

            {/* Ingatkan Card */}
            <div className="bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 p-8 rounded-2xl hover:shadow-xl hover:shadow-amber-500/5 transition-all">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/20">
                <Bell className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                <span>INGATKAN</span>
                <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">Re-engage Pelanggan</span>
              </h4>
              <p className="text-slate-400 text-sm mb-6">Mengaktifkan kembali pelanggan lama agar melakukan pembelian ulang.</p>
              <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>"Sudah lama tidak belanja, nih promo spesial untukmu!"</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Reminder order rutin bulanan/mingguan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Notifikasi stok produk favorit kembali tersedia</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Follow-up apresiasi setelah transaksi sukses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2 - Use Cases Section */}
      <section id="usecases" className="py-24 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Satu Platform. Banyak Industri</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Dirancang Untuk Segala Kebutuhan Sektor Bisnis</h3>
            <p className="text-slate-400 mt-4">Tanyaiku beradaptasi secara cerdas berdasarkan basis pengetahuan khusus yang Anda sediakan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {useCases.map((uc, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{uc.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${uc.badgeColor}`}>
                      {uc.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">{uc.title}</h4>
                  <ul className="space-y-3">
                    {uc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-teal-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 3 - Cara Kerja Section */}
      <section id="cara-kerja" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Cara Kerja</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Setup dalam hitungan jam. Hidup selamanya.</h3>
            <p className="text-slate-400 mt-4">Konakami menyediakan infrastruktur yang matang dan stabil. Anda hanya perlu mengisi konten bisnis Anda!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-teal-500/20 -z-10" />
            {steps.map((st, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl text-center relative hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500 to-purple-500 text-slate-950 font-bold font-mono text-base flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/10">
                  {st.num}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Options Section */}
      <section className="py-24 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Opsi WhatsApp API</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Fleksibilitas Integrasi Untuk Segala Ukuran Bisnis</h3>
            <p className="text-slate-400 mt-4">Kami mengerti kebutuhan anggaran bisnis berbeda-beda. Pilih jalur integrasi WhatsApp terbaik Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* WABA Card */}
            <div className="bg-slate-950 border border-teal-500/30 p-8 rounded-2xl relative shadow-xl shadow-teal-500/5">
              <div className="absolute top-4 right-4 bg-teal-500/10 text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded border border-teal-500/20">
                Paling Terpercaya
              </div>
              <h4 className="text-xl font-bold text-white mb-2">WhatsApp Business API (Official)</h4>
              <p className="text-xs text-slate-400 mb-6">Integrasi resmi menggunakan API resmi dari Meta. Kepercayaan pelanggan maksimal.</p>
              
              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Centang hijau resmi bisnis (Verified Badge)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="font-semibold text-teal-300">Dapatkan 50 pesan broadcast gratis per bulan</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Tarif bersaing kompetitif per pesan setelah kuota habis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Bebas risiko pemblokiran nomor oleh Meta</span>
                </li>
              </ul>
              
              <div className="bg-slate-900 p-4 rounded-xl text-center border border-slate-800">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tarif Broadcast WABA</p>
                <p className="text-lg font-bold text-white mt-1">Rp 350 <span className="text-xs font-normal text-slate-400">/ pesan sukses</span></p>
              </div>
            </div>

            {/* Fonnte Card */}
            <div className="bg-slate-950 border border-purple-500/20 p-8 rounded-2xl relative">
              <div className="absolute top-4 right-4 bg-purple-500/10 text-purple-400 text-[10px] font-bold px-2.5 py-1 rounded border border-purple-500/20">
                Sangat Hemat
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Gateway Alternatif (Fonnte)</h4>
              <p className="text-xs text-slate-400 mb-6">Integrasi alternatif yang sangat ramah kantong untuk pelaku usaha mikro & berkembang.</p>
              
              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Menggunakan nomor WhatsApp Anda sendiri</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Sangat murah tanpa minimum pengeluaran</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Dihubungkan menggunakan token perangkat digital</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Biaya flat per pesan tetap sangat terjangkau</span>
                </li>
              </ul>
              
              <div className="bg-slate-900 p-4 rounded-xl text-center border border-slate-800">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tarif Broadcast Fonnte</p>
                <p className="text-lg font-bold text-white mt-1">Rp 100 <span className="text-xs font-normal text-slate-400">/ pesan sukses</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4 - Subscription Packages Section */}
      <section id="harga" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Rencana Harga</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Investasi Berlangganan yang Transparan & Terjangkau</h3>
            <p className="text-slate-400 mt-4">Sistem recurring billing bulanan yang adil untuk pertumbuhan omzet bisnis digital Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className={`bg-slate-900/50 border rounded-2xl p-8 flex flex-col justify-between transition-all ${selectedPlan === 'Starter' ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-800'}`} onClick={() => setSelectedPlan('Starter')}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">Starter</span>
                <div className="mt-6">
                  <span className="text-3xl font-extrabold text-white">Rp 99.000</span>
                  <span className="text-xs text-slate-400"> / bulan</span>
                </div>
                <p className="text-xs text-slate-400 mt-4">Cocok untuk UMKM pemula yang ingin mengotomatiskan WhatsApp Customer Service.</p>
                <div className="border-t border-slate-800 my-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>1 Bot AI dengan Model Gemini</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Integrasi WABA Resmi & Fonnte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Maks. 500 pesan chat bot / bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>50 pesan broadcast gratis (WABA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Sistem Wallet & Topup Midtrans</span>
                  </li>
                </ul>
              </div>
              <button onClick={onGetStarted} className="w-full mt-8 bg-slate-950 hover:bg-slate-850 text-white border border-slate-800 py-3 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer">
                Pilih Starter
              </button>
            </div>

            {/* Pro */}
            <div className={`bg-slate-900/80 border rounded-2xl p-8 flex flex-col justify-between transition-all relative ${selectedPlan === 'Pro' ? 'border-teal-500 ring-2 ring-teal-500/15' : 'border-slate-800'}`} onClick={() => setSelectedPlan('Pro')}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-purple-500 text-slate-950 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-lg">
                Paling Populer
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Pro</span>
                <div className="mt-6">
                  <span className="text-3xl font-extrabold text-white">Rp 499.000</span>
                  <span className="text-xs text-slate-400"> / bulan</span>
                </div>
                <p className="text-xs text-slate-400 mt-4">Pilihan terbaik untuk bisnis berkembang dengan volume pesan harian tinggi.</p>
                <div className="border-t border-slate-800 my-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-white">Smarter Gemini AI Pro Custom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Integrasi WABA Resmi & Fonnte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Maks. 5.000 pesan chat bot / bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>50 pesan broadcast gratis (WABA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Notifikasi Saldo Menipis Otomatis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Laporan Analitis Real-time Dashboard</span>
                  </li>
                </ul>
              </div>
              <button onClick={onGetStarted} className="w-full mt-8 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-teal-500/10 transition-all cursor-pointer">
                Pilih Pro
              </button>
            </div>

            {/* Business */}
            <div className={`bg-slate-900/50 border rounded-2xl p-8 flex flex-col justify-between transition-all ${selectedPlan === 'Business' ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-800'}`} onClick={() => setSelectedPlan('Business')}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">Business</span>
                <div className="mt-6">
                  <span className="text-3xl font-extrabold text-white">Custom / Nego</span>
                </div>
                <p className="text-xs text-slate-400 mt-4">Dukungan infrastruktur skala besar khusus BUMD, Kampus, atau Perusahaan.</p>
                <div className="border-t border-slate-800 my-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Dedicated Bot AI Server Inbound</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Integrasi WhatsApp Multi-Device & CS Panel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="font-semibold text-white">Volume Pesan Tanpa Batas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Dukungan Teknis Prioritas 24/7 (SLA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span>Custom On-Premise / Cloud Deployment</span>
                  </li>
                </ul>
              </div>
              <button onClick={onGetStarted} className="w-full mt-8 bg-slate-950 hover:bg-slate-850 text-white border border-slate-800 py-3 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer">
                Hubungi Konakami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <Bot className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">tanyaiku</span>
              <p className="text-[10px]">© 2026 PT Konakami Digital Indonesia. All rights reserved.</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-slate-400 font-medium">
            <span className="text-[11px]">Syarat & Ketentuan</span>
            <span className="text-[11px]">Kebijakan Privasi</span>
            <span className="text-[11px]">Hubungi CS Konakami</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
