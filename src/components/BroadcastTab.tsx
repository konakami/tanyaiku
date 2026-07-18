import React, { useState, useEffect } from 'react';
import { Megaphone, MessageSquare, AlertTriangle, Play, HelpCircle, ArrowRight, History, Send, RefreshCw } from 'lucide-react';
import { BroadcastLog, UserProfile, WhatsappConfig } from '../types';

interface BroadcastTabProps {
  userProfile: UserProfile;
  whatsappConfig: WhatsappConfig;
  broadcastLogs: BroadcastLog[];
  onSendBroadcast: (message: string, recipientCount: number, channel: 'waba' | 'fonnte') => Promise<{ success: boolean; error?: string; warning?: string }>;
  isSending: boolean;
}

export default function BroadcastTab({
  userProfile,
  whatsappConfig,
  broadcastLogs,
  onSendBroadcast,
  isSending
}: BroadcastTabProps) {
  const [message, setMessage] = useState('');
  const [recipientCount, setRecipientCount] = useState(100);
  const [channel, setChannel] = useState<'waba' | 'fonnte'>(whatsappConfig.channelType || 'waba');
  const [costEstimate, setCostEstimate] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);

  // Re-calculate cost estimate
  useEffect(() => {
    let cost = 0;
    if (channel === 'waba') {
      const freeQuota = whatsappConfig.wabaFreeQuotaLeft;
      if (recipientCount <= freeQuota) {
        cost = 0;
      } else {
        cost = (recipientCount - freeQuota) * 350;
      }
    } else {
      cost = recipientCount * 100;
    }
    setCostEstimate(cost);
  }, [channel, recipientCount, whatsappConfig.wabaFreeQuotaLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusMessage({ type: 'error', text: 'Pesan siaran tidak boleh kosong.' });
      return;
    }

    setStatusMessage(null);
    const res = await onSendBroadcast(message, recipientCount, channel);
    
    if (res.success) {
      setMessage('');
      if (res.warning) {
        setStatusMessage({ type: 'warning', text: `Siaran Berhasil Dikirim! ${res.warning}` });
      } else {
        setStatusMessage({ type: 'success', text: `Siaran Berhasil dikirim ke ${recipientCount} penerima!` });
      }
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Terjadi kesalahan saat mengirim siaran.' });
    }
  };

  const getChannelLabel = (type: 'waba' | 'fonnte') => {
    return type === 'waba' ? 'WhatsApp Business API (Official)' : 'Fonnte Gateway Alternatif';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Broadcast Composer Form Column */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Buat Kampanye Broadcast Massal</h3>
          <p className="text-xs text-slate-400 mt-1">
            Kirimkan pesan promosi, kupon diskon, atau pengumuman penting langsung ke WhatsApp pelanggan.
          </p>
        </div>

        {statusMessage && (
          <div className={`p-4 rounded-xl border text-xs text-center ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : statusMessage.type === 'warning'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {statusMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 mx-auto mb-1" />}
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Channel Choice */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilih WhatsApp Channel</label>
              <select 
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
              >
                <option value="waba">WABA Resmi (Rp 350 / msg)</option>
                <option value="fonnte">Fonnte Gateway (Rp 100 / msg)</option>
              </select>
            </div>

            {/* Recipient Segment */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Segmentasi Pelanggan</label>
              <select 
                onChange={(e) => setRecipientCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
              >
                <option value="50">Uji Coba Kecil (50 Penerima)</option>
                <option value="100">Pelanggan Aktif Saja (100 Penerima)</option>
                <option value="250">Semua Pelanggan Terdaftar (250 Penerima)</option>
                <option value="500">Skala Besar Kampanye (500 Penerima)</option>
              </select>
            </div>
          </div>

          {/* Broadcast Message Composer */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Konten Pesan Siaran</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Contoh: Nikmati promo spesial akhir pekan, diskon geprek keju s/d 20%! Gunakan kode promo GEPREKKONAKAMI..."
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all leading-relaxed"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Pastikan pesan singkat, menarik, dan ramah sesuai regulasi anti-spam Meta.</span>
          </div>

          {/* Cost Estimates card */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimasi Biaya Kampanye</span>
              <span className="text-xl font-black text-white block mt-0.5">
                Rp {costEstimate.toLocaleString('id-ID')}
              </span>
              <span className="text-[9px] text-slate-500 block">
                {channel === 'waba' 
                  ? `Menggunakan sisa kuota gratis WABA (${whatsappConfig.wabaFreeQuotaLeft} pesan)` 
                  : `Fonnte Gateway Flat Rp 100 x ${recipientCount} pesan`}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Saldo Wallet Anda</span>
              <span className={`text-sm font-black block mt-0.5 ${userProfile.walletBalance < costEstimate ? 'text-rose-400' : 'text-emerald-400'}`}>
                Rp {userProfile.walletBalance.toLocaleString('id-ID')}
              </span>
              {userProfile.walletBalance < costEstimate && (
                <span className="text-[9px] text-rose-400 block font-semibold">Saldo Tidak Cukup</span>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSending || userProfile.walletBalance < costEstimate}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 disabled:opacity-40 text-slate-950 px-6 py-3 rounded-lg font-bold text-xs tracking-wide shadow-lg shadow-teal-500/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sedang Memproses Siaran...</span>
                </>
              ) : (
                <>
                  <Megaphone className="w-4 h-4" />
                  <span>Kirim Broadcast Massal Sekarang</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Broadcast History Column */}
      <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
          <History className="w-4.5 h-4.5 text-teal-400" />
          <span>Riwayat Pengiriman Siaran</span>
        </h3>

        <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-1">
          {broadcastLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Belum ada riwayat broadcast dikirim.
            </div>
          ) : (
            broadcastLogs.map((log) => (
              <div key={log.id} className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded font-mono font-bold">
                    {log.id}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {new Date(log.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-2">
                  "{log.message}"
                </p>

                <div className="border-t border-slate-900 pt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Channel: <strong className="text-slate-200">{log.channelUsed.toUpperCase()}</strong></span>
                  <span>Penerima: <strong className="text-slate-200">{log.recipientCount}</strong></span>
                  <span>Biaya: <strong className="text-slate-200">Rp {log.cost.toLocaleString('id-ID')}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
