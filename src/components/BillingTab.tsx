import React, { useState } from 'react';
import { Wallet, CreditCard, Bell, Sparkles, RefreshCw, PlusCircle, CheckCircle, ArrowRight, TrendingUp, History } from 'lucide-react';
import { UserProfile, Transaction } from '../types';

interface BillingTabProps {
  userProfile: UserProfile;
  transactions: Transaction[];
  onTopupSuccess: (amount: number, paymentMethod: string) => Promise<boolean>;
  onPlanUpgrade: (plan: 'Starter' | 'Pro' | 'Business') => Promise<{ success: boolean; error?: string }>;
  onUpdateAlertSettings: (threshold: number, enabled: boolean) => Promise<boolean>;
  isProcessing: boolean;
}

export default function BillingTab({
  userProfile,
  transactions,
  onTopupSuccess,
  onPlanUpgrade,
  onUpdateAlertSettings,
  isProcessing
}: BillingTabProps) {
  // Alert settings local state
  const [threshold, setThreshold] = useState(userProfile.lowBalanceThreshold);
  const [alertEnabled, setAlertEnabled] = useState(userProfile.lowBalanceAlertEnabled);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Top-up form state
  const [topupAmount, setTopupAmount] = useState<number>(100000);
  const [paymentMethod, setPaymentMethod] = useState<string>('BCA Virtual Account');

  // Midtrans Snap Simulator State
  const [showMidtransPopup, setShowMidtransPopup] = useState(false);
  const [midtransStep, setMidtransStep] = useState<'loading' | 'instructions' | 'success'>('instructions');
  const [vaCode, setVaCode] = useState('');

  // Plan Selection State
  const [tempPlan, setTempPlan] = useState<'Starter' | 'Pro' | 'Business'>(userProfile.plan);
  const [planMessage, setPlanMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveAlertSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    await onUpdateAlertSettings(threshold, alertEnabled);
    setIsSavingSettings(false);
    alert('Pengaturan notifikasi saldo berhasil disimpan!');
  };

  const triggerMidtransSimulator = () => {
    // Generate a random virtual account payment code
    const randomCode = '88201' + Math.floor(1000000000 + Math.random() * 9000000000);
    setVaCode(randomCode);
    setMidtransStep('loading');
    setShowMidtransPopup(true);

    // Simulate loading for 1 second
    setTimeout(() => {
      setMidtransStep('instructions');
    }, 1000);
  };

  const handleSimulatePaymentSuccess = async () => {
    setMidtransStep('loading');
    const success = await onTopupSuccess(topupAmount, paymentMethod);
    if (success) {
      setMidtransStep('success');
    } else {
      setShowMidtransPopup(false);
      alert('Simulasi topup gagal.');
    }
  };

  const handlePlanUpgradeSubmit = async (plan: 'Starter' | 'Pro' | 'Business') => {
    setPlanMessage(null);
    const res = await onPlanUpgrade(plan);
    if (res.success) {
      setPlanMessage({ type: 'success', text: `Paket berhasil diperbarui ke ${plan}!` });
    } else {
      setPlanMessage({ type: 'error', text: res.error || 'Gagal merubah paket.' });
    }
  };

  // Expenditures statistics mock visual calculations
  const totalTopup = transactions
    .filter(t => t.type === 'topup' && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type !== 'topup' && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 relative">
      {/* Midtrans Popup Simulator Overlay */}
      {showMidtransPopup && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Header Midtrans Look */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight">midtrans</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold font-mono">Sandbox Simulator</span>
              </div>
              <button 
                onClick={() => setShowMidtransPopup(false)}
                className="text-white/80 hover:text-white font-bold text-xs"
              >
                Tutup
              </button>
            </div>

            {midtransStep === 'loading' ? (
              <div className="p-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-teal-600 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">Menghubungkan dengan Server Midtrans...</p>
              </div>
            ) : midtransStep === 'instructions' ? (
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metode Pembayaran</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-0.5">{paymentMethod}</h4>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Tagihan Top-up</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">
                    Rp {topupAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nomor Virtual Account / Bayar</span>
                  <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between font-mono text-xs font-bold text-slate-800 border border-slate-200">
                    <span>{vaCode}</span>
                    <span className="text-[9px] bg-slate-200 px-2 py-0.5 rounded cursor-pointer select-none">Copy</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Lakukan transfer dari Mobile Banking Anda ke Virtual Account di atas untuk menyelesaikan top-up.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-3">
                  <button 
                    onClick={() => setShowMidtransPopup(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleSimulatePaymentSuccess}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-lg shadow-teal-500/10"
                  >
                    Simulasikan Sukses Bayar
                  </button>
                </div>
              </div>
            ) : (
              // Success step
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Pembayaran Berhasil!</h3>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Midtrans mendeteksi pembayaran sukses untuk tagihan senilai <strong>Rp {topupAmount.toLocaleString('id-ID')}</strong>. Saldo wallet Tanyaiku Anda telah ditambahkan secara instan.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setShowMidtransPopup(false)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Tutup Simulator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Wallet Balance & Topup Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Midtrans Wallet & Saldo Top-up</h3>
            <p className="text-xs text-slate-400 mt-1">
              Top-up saldo wallet secara fleksibel untuk menjaga agar chatbot WhatsApp tetap melayani dan broadcast massal terkirim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Balance display */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Sisa Saldo Saat Ini</span>
                <span className="text-2xl font-black text-emerald-400 mt-1.5 block">
                  Rp {userProfile.walletBalance.toLocaleString('id-ID')}
                </span>
                <span className="text-[9px] text-slate-500 mt-2 block">
                  Batas alert: Rp {userProfile.lowBalanceThreshold.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            {/* Quick stats totals */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Akumulasi Transaksi</span>
                <div className="space-y-1 mt-2">
                  <p className="text-xs text-slate-400 flex justify-between gap-4">
                    <span>Total Top-up:</span>
                    <strong className="text-slate-200">Rp {totalTopup.toLocaleString('id-ID')}</strong>
                  </p>
                  <p className="text-xs text-slate-400 flex justify-between gap-4">
                    <span>Biaya Operasional:</span>
                    <strong className="text-slate-200">Rp {totalExpense.toLocaleString('id-ID')}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Top Up via Midtrans */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Pilih Jumlah & Bayar</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTopupAmount(amount)}
                  className={`py-2 px-3 text-xs rounded-lg font-bold border transition-all cursor-pointer text-center ${topupAmount === amount ? 'bg-teal-500/10 border-teal-500 text-teal-400' : 'bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Rp {amount.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilih Metode Pembayaran</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all"
                >
                  <option value="BCA Virtual Account">BCA Virtual Account (VA)</option>
                  <option value="Mandiri Virtual Account">Mandiri Virtual Account (VA)</option>
                  <option value="GoPay">GoPay (E-Wallet Instant)</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="Credit Card">Kartu Kredit / Debit Online</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={triggerMidtransSimulator}
                  className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 py-2.5 rounded-lg font-bold text-xs tracking-wide shadow-lg shadow-teal-500/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Bayar via Midtrans</span>
                </button>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <form onSubmit={handleSaveAlertSettings} className="border-t border-slate-800/80 pt-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-purple-400" />
              <span>Notifikasi Saldo Menipis</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Batasan Aman Saldo Minim</label>
                <input 
                  type="number" 
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  placeholder="Contoh: 20000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Notifikasi Otomatis</label>
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setAlertEnabled(!alertEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${alertEnabled ? 'bg-teal-500' : 'bg-slate-850'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${alertEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {alertEnabled ? 'Notifikasi Aktif' : 'Notifikasi Mati'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button 
                type="submit"
                disabled={isSavingSettings}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                Simpan Setelan Notifikasi
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Plans Management & Reports Visual */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          {/* Subscription Package upgrading card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400">Atur Paket Langganan</h3>
            <p className="text-xs text-slate-400 mt-1">
              Beralih ke paket langganan bulanan yang lebih memadai untuk kelancaran integrasi bisnis Anda.
            </p>

            {planMessage && (
              <div className={`p-3 rounded-lg text-xs border text-center ${planMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                {planMessage.text}
              </div>
            )}

            <div className="space-y-2.5">
              {[
                { name: 'Starter', price: 'Rp 99.000 / bln', desc: 'Sempurna untuk UMKM lokal pemula.' },
                { name: 'Pro', price: 'Rp 499.000 / bln', desc: 'Volume chat tinggi, analitis lengkap.' },
                { name: 'Business', price: 'Custom SLA', desc: 'Dedicated server khusus korporasi / kampus.' }
              ].map((p) => (
                <div 
                  key={p.name}
                  onClick={() => setTempPlan(p.name as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${tempPlan === p.name ? 'bg-slate-950 border-purple-500' : 'bg-slate-950/40 border-slate-850 hover:border-slate-800'}`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{p.name} ({p.price})</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                  </div>
                  {userProfile.plan === p.name ? (
                    <span className="text-[9px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">Aktif</span>
                  ) : tempPlan === p.name ? (
                    <button 
                      onClick={() => handlePlanUpgradeSubmit(p.name as any)}
                      className="text-[9px] bg-purple-500 text-slate-950 px-2 py-1 rounded font-bold hover:bg-purple-400 transition-colors"
                    >
                      Beralih
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* SVG usage report widget */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-4">
                <TrendingUp className="w-4.5 h-4.5" />
                <span>Rasio Alokasi Biaya</span>
              </h3>

              <div className="space-y-4">
                {/* Visual SVG doughnut chart simulated bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Langganan SaaS Bulanan</span>
                    <span className="font-bold">Rp {totalExpense > 0 ? (transactions.filter(t => t.type === 'subscription').reduce((sum, t) => sum + t.amount, 0)).toLocaleString('id-ID') : 'Rp 99.000'}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                    <div className="h-full bg-purple-500" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Kampanye Broadcast Massal</span>
                    <span className="font-bold">Rp {totalExpense > 0 ? (transactions.filter(t => t.type === 'broadcast_fee').reduce((sum, t) => sum + t.amount, 0)).toLocaleString('id-ID') : 'Rp 10.000'}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                    <div className="h-full bg-teal-400" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 border border-slate-850 rounded-xl mt-6">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Catatan Operasional</span>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Biaya operasional chatbot dipotong otomatis dari saldo wallet Anda. Laporan real-time di atas membantu Anda mengestimasi margin bisnis secara presisi.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Transactions History Full Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
          <History className="w-4.5 h-4.5 text-teal-400" />
          <span>Riwayat Transaksi Billing</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">ID Transaksi</th>
                <th className="py-3 px-2">Tanggal</th>
                <th className="py-3 px-2">Keterangan</th>
                <th className="py-3 px-2">Tipe</th>
                <th className="py-3 px-2 text-right">Jumlah</th>
                <th className="py-3 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/20">
                  <td className="py-3 px-2 font-mono text-teal-400 font-bold">{tx.id}</td>
                  <td className="py-3 px-2 text-slate-400">
                    {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-2 text-slate-200 font-medium">{tx.description}</td>
                  <td className="py-3 px-2">
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      tx.type === 'topup' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : tx.type === 'subscription'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-3 px-2 text-right font-bold ${tx.type === 'topup' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {tx.type === 'topup' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-0.5 rounded border border-emerald-500/20">
                      Sukses
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
