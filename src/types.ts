export interface ChatbotConfig {
  id: string;
  botName: string;
  systemPrompt: string;
  welcomeMessage: string;
  fallbackMessage: string;
  tone: 'professional' | 'friendly' | 'casual';
  status: 'active' | 'inactive';
  knowledgeBase: string; // Plain text or FAQ list
}

export interface WhatsappConfig {
  channelType: 'waba' | 'fonnte';
  wabaApiKey: string;
  wabaPhoneNumberId: string;
  wabaVerified: boolean;
  wabaFreeQuotaLeft: number; // Max 50 per month free
  fonnteToken: string;
  fonnteConnected: boolean;
  fonnteNumber: string;
}

export interface UserProfile {
  name: string;
  email: string;
  companyName: string;
  plan: 'Starter' | 'Pro' | 'Business';
  planStatus: 'active' | 'expired';
  walletBalance: number;
  lowBalanceThreshold: number; // Rp to trigger warning, default 20000
  lowBalanceAlertEnabled: boolean;
  registeredAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'topup' | 'broadcast_fee' | 'subscription';
  description: string;
  createdAt: string;
  status: 'pending' | 'success' | 'failed';
}

export interface BroadcastLog {
  id: string;
  message: string;
  recipientCount: number;
  channelUsed: 'waba' | 'fonnte';
  cost: number;
  createdAt: string;
  status: 'sent' | 'failed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  createdAt: string;
}
