import React, { useState, useEffect } from 'react';
import { Bot, LogOut, LayoutDashboard, Settings, Smartphone, Megaphone, Wallet, RefreshCw, AlertTriangle } from 'lucide-react';
import { UserProfile, ChatbotConfig, WhatsappConfig, Transaction, BroadcastLog } from '../types';
import OverviewTab from './OverviewTab';
import ChatbotTab from './ChatbotTab';
import WhatsappTab from './WhatsappTab';
import BroadcastTab from './BroadcastTab';
import BillingTab from './BillingTab';

interface DashboardProps {
  userProfileData: { name: string; email: string; companyName: string };
  onLogout: () => void;
}

export default function Dashboard({ userProfileData, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // App system data states
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig | null>(null);
  const [whatsappConfig, setWhatsappConfig] = useState<WhatsappConfig | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [broadcastLogs, setBroadcastLogs] = useState<BroadcastLog[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all initial data
  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      setUserProfile(data.userProfile);
      setChatbotConfig(data.chatbotConfig);
      setWhatsappConfig(data.whatsappConfig);
      setTransactions(data.transactions);
      setBroadcastLogs(data.broadcastLogs);
    } catch (error) {
      console.error('Failed to fetch data from API', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    await fetchData(true);
    setIsRefreshing(false);
  };

  // State handlers to save Chatbot Settings
  const handleSaveChatbotConfig = async (updated: Partial<ChatbotConfig>) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/chatbot/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await response.json();
      if (data.success) {
        setChatbotConfig(data.chatbotConfig);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // State handlers to save WhatsApp channel integration
  const handleSaveWhatsappConfig = async (updated: Partial<WhatsappConfig>) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/whatsapp/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await response.json();
      if (data.success) {
        setWhatsappConfig(data.whatsappConfig);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // State handler to send simulated broadcast
  const handleSendBroadcast = async (message: string, recipientCount: number, channel: 'waba' | 'fonnte') => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/broadcast/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, recipientCount, channel })
      });
      const data = await response.json();
      if (data.success) {
        // reload stats and wallet balance
        await fetchData(true);
        return { 
          success: true, 
          warning: data.lowBalanceWarning 
        };
      } else {
        return { 
          success: false, 
          error: data.error 
        };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Koneksi API error.' };
    } finally {
      setIsSaving(false);
    }
  };

  // State handler to perform top-up via Midtrans simulation
  const handleTopupSuccess = async (amount: number, paymentMethod: string) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/midtrans/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod })
      });
      const data = await response.json();
      if (data.success) {
        await fetchData(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // State handler to change/upgrade subscription plan
  const handlePlanUpgrade = async (plan: 'Starter' | 'Pro' | 'Business') => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/subscription/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });
      const data = await response.json();
      if (data.success) {
        await fetchData(true);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Gagal menghubungi server.' };
    } finally {
      setIsSaving(false);
    }
  };

  // State handler to save low balance alert setting
  const handleUpdateAlertSettings = async (threshold: number, enabled: boolean) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lowBalanceThreshold: threshold, lowBalanceAlertEnabled: enabled })
      });
      const data = await response.json();
      if (data.success) {
        await fetchData(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !userProfile || !chatbotConfig || !whatsappConfig) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center space-y-4 flex-col">
        <RefreshCw className="w-8 h-8 animate-spin text-teal-400" />
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Memuat Dashboard Tanyaiku...</p>
      </div>
    );
  }

  const isBalanceLow = userProfile.walletBalance < userProfile.lowBalanceThreshold;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col md:flex-row selection:bg-teal-500 selection:text-slate-950">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 border-r border-slate-900 bg-slate-950 md:sticky md:top-0 md:h-screen flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-tr from-teal-400 to-purple-500 p-2 rounded-xl text-slate-950">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">tanyaiku</span>
                <p className="text-[8px] text-slate-500 tracking-wider font-semibold uppercase -mt-0.5">SaaS Multitenant</p>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'overview', label: 'Ringkasan Portal', icon: LayoutDashboard },
              { id: 'chatbot', label: 'Konfigurasi Bot', icon: Settings },
              { id: 'whatsapp', label: 'Integrasi WhatsApp', icon: Smartphone },
              { id: 'broadcast', label: 'Broadcast Massal', icon: Megaphone },
              { id: 'billing', label: 'Wallet & Billing', icon: Wallet },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User metadata & Logout */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/50">
          <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Penyedia Layanan</p>
              <p className="text-[11px] font-bold text-slate-200 mt-0.5">Konakami Digital</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Koneksi Sistem Aman" />
          </div>

          <div className="flex items-center justify-between">
            <div className="truncate max-w-[130px]">
              <p className="text-xs font-bold text-slate-200 truncate">{userProfileData.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{userProfileData.email}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-rose-400 text-slate-400 transition-all cursor-pointer border border-slate-850"
              title="Logout / Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main portal workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header info */}
        <header className="h-20 border-b border-slate-900 bg-slate-950/50 backdrop-blur sticky top-0 z-20 px-6 sm:px-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tenant Aktif</span>
            <h1 className="text-sm font-bold text-slate-200 mt-0.5 flex items-center gap-2">
              <span>{userProfile.companyName}</span>
              <span className="text-[9px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">
                {userProfile.plan} Plan
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Wallet balance */}
            <div 
              onClick={() => setActiveTab('billing')}
              className={`px-3 py-2 rounded-xl border flex items-center gap-2.5 cursor-pointer hover:bg-slate-900/30 transition-all ${isBalanceLow ? 'border-amber-500/30 text-amber-400 bg-amber-500/5' : 'border-slate-800 text-slate-300'}`}
            >
              <Wallet className="w-4 h-4 shrink-0" />
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Saldo Wallet</span>
                <span className="text-xs font-black block leading-none mt-0.5">
                  Rp {userProfile.walletBalance.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content canvas */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab 
              userProfile={userProfile}
              chatbotConfig={chatbotConfig}
              whatsappConfig={whatsappConfig}
              totalBroadcastSent={broadcastLogs.length}
              totalTransactions={transactions.length}
              onNavigateToTab={setActiveTab}
              onRefreshData={handleRefreshData}
              isRefreshing={isRefreshing}
            />
          )}

          {activeTab === 'chatbot' && (
            <ChatbotTab 
              chatbotConfig={chatbotConfig}
              onSaveConfig={handleSaveChatbotConfig}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'whatsapp' && (
            <WhatsappTab 
              whatsappConfig={whatsappConfig}
              onSaveConfig={handleSaveWhatsappConfig}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'broadcast' && (
            <BroadcastTab 
              userProfile={userProfile}
              whatsappConfig={whatsappConfig}
              broadcastLogs={broadcastLogs}
              onSendBroadcast={handleSendBroadcast}
              isSending={isSaving}
            />
          )}

          {activeTab === 'billing' && (
            <BillingTab 
              userProfile={userProfile}
              transactions={transactions}
              onTopupSuccess={handleTopupSuccess}
              onPlanUpgrade={handlePlanUpgrade}
              onUpdateAlertSettings={handleUpdateAlertSettings}
              isProcessing={isSaving}
            />
          )}
        </main>
      </div>
    </div>
  );
}
