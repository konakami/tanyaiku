import React from 'react';
import { Wallet, Bot, MessageSquare, Megaphone, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { UserProfile, ChatbotConfig, WhatsappConfig } from '../types';

interface OverviewTabProps {
  userProfile: UserProfile;
  chatbotConfig: ChatbotConfig;
  whatsappConfig: WhatsappConfig;
  totalBroadcastSent: number;
  totalTransactions: number;
  onNavigateToTab: (tab: string) => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
}

export default function OverviewTab({
  userProfile,
  chatbotConfig,
  whatsappConfig,
  totalBroadcastSent,
  totalTransactions,
  onNavigateToTab,
  onRefreshData,
  isRefreshing
}: OverviewTabProps) {
  
  const isBalanceLow = userProfile.walletBalance < userProfile.lowBalanceThreshold;

  return (
    <div className="space-y-6">
      {/* Top Welcome Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div>
          <h2 className="text-xl font-extrabold text-white">Selamat Datang Kembali, {userProfile.name}!</h2>
          <p className="text-xs text-slate-400 mt-1">
            Mengatur asisten chatbot AI untuk <span className="text-teal-400 font-bold">{userProfile.companyName}</span> secara mandiri.
          </p>
        </div>
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <button 
            onClick={onRefreshData}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-white transition-all text-slate-400 cursor-pointer flex items-center justify-center gap-1.5 text-xs"
            disabled={isRefreshing}
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-teal-400' : ''}`} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={() => onNavigateToTab('chatbot')}
            className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-teal-500/10 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            Atur Chatbot <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Warning low balance banner */}
      {isBalanceLow && userProfile.lowBalanceAlertEnabled && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-amber-400 animate-pulse">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">⚠️ Peringatan: Saldo Wallet Sangat Minim!</h4>
            <p className="text-xs text-amber-300/90 mt-0.5">
              Saldo saat ini hanya tinggal <strong>Rp {userProfile.walletBalance.toLocaleString('id-ID')}</strong> (di bawah batas peringatan Rp {userProfile.lowBalanceThreshold.toLocaleString('id-ID')}). Silakan lakukan top-up saldo wallet Anda segera via Midtrans agar chatbot & layanan broadcast massal Anda tetap berfungsi tanpa terganggu.
            </p>
            <button 
              onClick={() => onNavigateToTab('billing')}
              className="mt-2 text-[11px] font-bold text-teal-400 hover:text-teal-300 underline cursor-pointer"
            >
              Lakukan Top-up Saldo Sekarang &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Wallet Balance Card */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl flex items-center justify-between relative group hover:border-teal-500/30 transition-all">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Saldo Wallet</span>
            <span className={`text-2xl font-black mt-1 block ${isBalanceLow ? 'text-amber-400' : 'text-emerald-400'}`}>
              Rp {userProfile.walletBalance.toLocaleString('id-ID')}
            </span>
            <button 
              onClick={() => onNavigateToTab('billing')}
              className="text-[10px] text-teal-400 hover:text-teal-300 font-bold mt-2 inline-flex items-center gap-1 cursor-pointer"
            >
              Top-up via Midtrans &rarr;
            </button>
          </div>
          <div className={`p-3.5 rounded-xl shrink-0 ${isBalanceLow ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Subscription Plan Card */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl flex items-center justify-between relative group hover:border-purple-500/30 transition-all">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Paket SaaS Anda</span>
            <span className="text-2xl font-black text-purple-400 mt-1 block">
              {userProfile.plan}
            </span>
            <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-mono font-bold mt-2 inline-block uppercase">
              {userProfile.planStatus}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        {/* Chatbot Status Card */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl flex items-center justify-between relative group hover:border-teal-500/30 transition-all">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status Chatbot AI</span>
            <span className="text-2xl font-black text-teal-400 mt-1 block truncate">
              {chatbotConfig.botName}
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2.5 h-2.5 rounded-full ${chatbotConfig.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase">
                {chatbotConfig.status === 'active' ? 'Aktif Melayani' : 'Mati / Jeda'}
              </span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
        </div>

        {/* Channels Integration Card */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl flex items-center justify-between relative group hover:border-amber-500/30 transition-all">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Integrasi WhatsApp</span>
            <span className="text-xl font-extrabold text-white mt-1.5 block">
              {whatsappConfig.channelType === 'waba' ? 'Official WABA' : 'Gateway Fonnte'}
            </span>
            <span className="text-[10px] text-slate-400 mt-2 block">
              {whatsappConfig.channelType === 'waba' 
                ? `Limit WABA: ${whatsappConfig.wabaFreeQuotaLeft} free msg` 
                : `Status: ${whatsappConfig.fonnteConnected ? 'Terhubung' : 'Terputus'}`}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Tutorial / Platform details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Panduan Konfigurasi Mandiri</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/60 flex gap-3">
              <span className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">1</span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Perbarui Basis Pengetahuan</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Isi menu, harga, lokasi, dan FAQ spesifik bisnis Anda di tab <strong className="text-teal-400">Konfigurasi Bot</strong>.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/60 flex gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">2</span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Pilih Jalur WhatsApp</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Inginkan legalitas resmi Meta? Gunakan <strong className="text-teal-400">WABA</strong>. Anggaran sangat minim? Gunakan <strong className="text-teal-400">Fonnte</strong>.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/60 flex gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">3</span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Lakukan Uji Simulasi</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Uji respons asisten chatbot Anda langsung di widget simulator interaktif sebelum online penuh.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/60 flex gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm shrink-0">4</span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Luncurkan Kampanye Broadcast</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Kirim pesan promo massal ke database pelanggan. Saldo akan terpotong secara otomatis dari wallet.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Butuh bantuan integrasi custom BUMD atau kampus? Tim teknis kami di <span className="text-white font-semibold">Konakami Digital Indonesia</span> siap membantu.
            </div>
            <button className="text-xs bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 px-4 py-2 rounded-lg cursor-not-allowed shrink-0">
              Hubungi Sales & Support
            </button>
          </div>
        </div>

        {/* Right Column: Quick platform billing and usage stats */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4">Ringkasan Penggunaan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400">Campaign Broadcast</span>
                <span className="text-xs font-bold text-slate-100">{totalBroadcastSent} Kiriman</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400">Jumlah Transaksi Billing</span>
                <span className="text-xs font-bold text-slate-100">{totalTransactions} Catatan</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400">Status Gateway Fonnte</span>
                <span className={`text-xs font-bold ${whatsappConfig.fonnteConnected ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {whatsappConfig.fonnteConnected ? 'Terhubung' : 'Belum Setup'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs text-slate-400">Centang Hijau Resmi (WABA)</span>
                <span className={`text-xs font-bold ${whatsappConfig.wabaVerified ? 'text-teal-400' : 'text-slate-500'}`}>
                  {whatsappConfig.wabaVerified ? 'Terverifikasi' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 border border-slate-800/60 rounded-xl mt-6 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Biaya Operasional Hari Ini</span>
            <span className="text-lg font-black text-white mt-1 block">Rp 0</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Dihitung real-time dari sisa wallet & bonus kuota</span>
          </div>
        </div>
      </div>
    </div>
  );
}
