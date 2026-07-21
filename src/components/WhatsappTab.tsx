import React, { useState } from 'react';
import { Shield, Sparkles, MessageSquare, Save, RefreshCw, Smartphone, Key, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { WhatsappConfig } from '../types';

interface WhatsappTabProps {
  whatsappConfig: WhatsappConfig;
  onSaveConfig: (updated: Partial<WhatsappConfig>) => Promise<boolean>;
  isSaving: boolean;
}

export default function WhatsappTab({ whatsappConfig, onSaveConfig, isSaving }: WhatsappTabProps) {
  const [channelType, setChannelType] = useState(whatsappConfig.channelType);
  const [wabaApiKey, setWabaApiKey] = useState(whatsappConfig.wabaApiKey);
  const [wabaPhoneNumberId, setWabaPhoneNumberId] = useState(whatsappConfig.wabaPhoneNumberId);
  const [wabaVerified, setWabaVerified] = useState(whatsappConfig.wabaVerified);
  const [fonnteToken, setFonnteToken] = useState(whatsappConfig.fonnteToken);
  const [fonnteConnected, setFonnteConnected] = useState(whatsappConfig.fonnteConnected);
  const [fonnteNumber, setFonnteNumber] = useState(whatsappConfig.fonnteNumber);
  const [copied, setCopied] = useState(false);

  const handleCopyWebhook = () => {
    const webhookUrl = `${window.location.origin}/api/webhook/fonnte`;
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveConfig({
      channelType,
      wabaApiKey,
      wabaPhoneNumberId,
      wabaVerified,
      fonnteToken,
      fonnteConnected,
      fonnteNumber
    });
  };

  return (
    <div className="space-y-6">
      {/* Platform Comparison Intro Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Pilih Metode WhatsApp Integration Anda</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Tanyaiku mendukung dua jenis integrasi WhatsApp sesuai kebutuhan anggaran operasional bisnis Anda di Indonesia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div 
            onClick={() => setChannelType('waba')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${channelType === 'waba' ? 'bg-slate-950 border-teal-500 shadow-lg shadow-teal-500/5' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Shield className="w-4 h-4" />
              </span>
              <h4 className="text-xs font-bold text-white">Metode Resmi: WhatsApp Business API (WABA)</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Direkomendasikan untuk brand resmi & korporasi. Aman dari blokir, bisa centang hijau (verified), gratis 50 broadcast pertama/bulan, selebihnya per-pesan sangat murah.
            </p>
          </div>

          <div 
            onClick={() => setChannelType('fonnte')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${channelType === 'fonnte' ? 'bg-slate-950 border-purple-500 shadow-lg shadow-purple-500/5' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Smartphone className="w-4 h-4" />
              </span>
              <h4 className="text-xs font-bold text-white">Metode Hemat: Fonnte Gateway Alternatif</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cocok untuk UMKM, toko kuliner mandiri, & startup lokal. Menggunakan nomor HP pribadi Anda sendiri dengan device token, hemat tanpa deposit minimal.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Settings */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
            Konfigurasi {channelType === 'waba' ? 'WhatsApp Business API' : 'Fonnte Gateway'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {channelType === 'waba' ? (
              // WABA Forms
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">WABA Meta Access Token</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      value={wabaApiKey}
                      onChange={(e) => setWabaApiKey(e.target.value)}
                      placeholder="EAAW..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">WhatsApp Phone Number ID</label>
                    <input 
                      type="text" 
                      value={wabaPhoneNumberId}
                      onChange={(e) => setWabaPhoneNumberId(e.target.value)}
                      placeholder="10928392839"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Centang Hijau Resmi (Verified)</label>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setWabaVerified(!wabaVerified)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${wabaVerified ? 'bg-teal-500' : 'bg-slate-800'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${wabaVerified ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {wabaVerified ? 'Verified Badge Aktif' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Kuota Gratis Bulanan</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Setiap bulan Anda mendapat <strong>50 pesan broadcast gratis</strong>. Anda memiliki sisa <strong className="text-teal-400">{whatsappConfig.wabaFreeQuotaLeft} pesan gratis</strong> untuk bulan berjalan ini.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Fonnte Forms
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fonnte Device Token</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={fonnteToken}
                      onChange={(e) => setFonnteToken(e.target.value)}
                      placeholder="Masukkan Token dari Web Fonnte"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor WhatsApp Terdaftar</label>
                    <input 
                      type="text" 
                      value={fonnteNumber}
                      onChange={(e) => setFonnteNumber(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Koneksi Perangkat</label>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setFonnteConnected(!fonnteConnected)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${fonnteConnected ? 'bg-purple-500' : 'bg-slate-800'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${fonnteConnected ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {fonnteConnected ? 'Terhubung (Online)' : 'Terputus (Offline)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Webhook Configuration Guide */}
                <div className="bg-slate-950 border border-purple-950/40 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>URL Webhook Tanyaiku untuk Fonnte</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyWebhook}
                      className="text-[10px] bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-teal-400" />
                          <span className="text-teal-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin URL</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Salin URL webhook di bawah ini dan tempelkan ke menu <strong>Webhook</strong> di dashboard Fonnte Anda agar AI Tanyaiku otomatis menjawab chat WhatsApp yang masuk secara instan:
                  </p>
                  <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-[11px] font-mono text-slate-300 select-all overflow-x-auto whitespace-nowrap">
                    {window.location.origin}/api/webhook/fonnte
                  </div>
                </div>

                {/* Guardrail Safety Warnings & Best Practices */}
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Guardrail Keamanan & Anti-Ban</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Penggunaan gateway WhatsApp non-resmi (WABA unofficial) memiliki risiko nomor Anda diblokir oleh pihak WhatsApp/Meta jika terindikasi spamming. <strong>Tanyaiku mendesak Anda mematuhi guardrail berikut:</strong>
                  </p>
                  <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>
                      <strong>Jangan Kirim Broadcast Massal ke Nomor Baru:</strong> Kirim broadcast promosi hanya ke pelanggan setia yang sudah menyimpan nomor WhatsApp Anda di kontak mereka.
                    </li>
                    <li>
                      <strong>Format Pesan Harus Dinamis:</strong> Hindari mengirim pesan broadcast identik ke ratusan nomor sekaligus. Manfaatkan personalisasi nama atau detail pesanan unik.
                    </li>
                    <li>
                      <strong>Fitur Jeda Pengetikan Aktif:</strong> Sistem Tanyaiku otomatis menyisipkan jeda acak <strong>1.5 hingga 3 detik</strong> sebelum membalas pesan, agar pola chat Anda terlihat alami menyerupai ketikan manusia asli.
                    </li>
                    <li>
                      <strong>Pancing Interaksi Alami:</strong> Mintalah pelanggan untuk membalas chat Anda terlebih dahulu agar terhindar dari deteksi spam otomatis Meta.
                    </li>
                  </ul>
                </div>
              </div>
            )}

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
                    <span>Simpan Pengaturan Channel</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Education Information column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Skema Biaya Operasional</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850">
              <h4 className="font-bold text-slate-200">1. Skema Resmi WhatsApp Business API</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Anda mendapatkan <strong>50 pesan broadcast gratis per bulan</strong>. Bila sisa kuota gratis Anda habis, pesan broadcast berikutnya akan memotong saldo wallet Tanyaiku Anda sebesar <strong>Rp 350 per pesan sukses</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850">
              <h4 className="font-bold text-slate-200">2. Skema Gateway Alternatif Fonnte</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Tidak ada kuota broadcast gratis. Setiap pengiriman pesan siaran promosi masal akan secara flat memotong saldo wallet Tanyaiku Anda sebesar <strong>Rp 100 per pesan sukses</strong>. Sangat hemat untuk pengusaha lokal.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-lg flex gap-2 text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-[10px] leading-normal">
                Sistem wallet kami didukung sepenuhnya oleh payment gateway <strong>Midtrans</strong>. Layanan asisten bot WhatsApp akan terjeda jika saldo wallet Anda kosong (Rp 0). Pastikan menyalakan fitur notifikasi saldo menipis di tab Wallet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
