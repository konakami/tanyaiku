import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ChatbotConfig, WhatsappConfig, UserProfile, Transaction, BroadcastLog } from './src/types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey && geminiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API client:", error);
  }
} else {
  console.log("Gemini API key is not configured or uses default template value. Fallback mechanism will be used.");
}

// In-memory Database
let userProfile: UserProfile = {
  name: 'Budi Santoso',
  email: 'budi@konakami.id',
  companyName: 'Ayam Geprek Konakami',
  plan: 'Starter',
  planStatus: 'active',
  walletBalance: 150000,
  lowBalanceThreshold: 20000,
  lowBalanceAlertEnabled: true,
  registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
};

let chatbotConfig: ChatbotConfig = {
  id: 'bot-1',
  botName: 'Asisten Tanyaiku',
  systemPrompt: 'Kamu adalah asisten AI Chatbot cerdas untuk kedai Ayam Geprek Konakami. Tugasmu adalah melayani pelanggan dengan ramah dalam bahasa Indonesia, menjawab menu makanan, harga, jam operasional, lokasi, dan cara memesan.',
  welcomeMessage: 'Halo! Selamat datang di Ayam Geprek Konakami. Ada yang bisa kami bantu hari ini?',
  fallbackMessage: 'Maaf, saya belum memahami pertanyaan Anda. Silakan hubungi admin kami melalui nomor WhatsApp 0812-3456-7890.',
  tone: 'friendly',
  status: 'active',
  knowledgeBase: `Daftar Menu & Harga:
- Ayam Geprek Original: Rp 15.000 (pedas level 1-5)
- Ayam Geprek Keju: Rp 18.000
- Es Teh Manis: Rp 5.000
- Es Jeruk: Rp 6.000

Jam Operasional:
- Buka setiap hari pukul 10.00 - 21.00 WIB

Lokasi & Alamat:
- Jl. Jenderal Sudirman No. 45, Palembang (Dekat kantor Konakami Digital Indonesia)

Cara Memesan:
- Kirim pesan ke WhatsApp ini dengan format: Nama - Pesanan - Alamat Pengiriman.
- Pembayaran bisa transfer bank (BCA/Mandiri) atau Cash on Delivery (COD).`
};

let whatsappConfig: WhatsappConfig = {
  channelType: 'waba',
  wabaApiKey: 'waba_live_key_9238423948',
  wabaPhoneNumberId: '10928392839',
  wabaVerified: true,
  wabaFreeQuotaLeft: 42,
  fonnteToken: '',
  fonnteConnected: false,
  fonnteNumber: ''
};

let transactions: Transaction[] = [
  {
    id: 'TX-1001',
    amount: 99000,
    type: 'subscription',
    description: 'Pembayaran Paket Starter (Bulan ke-1)',
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success'
  },
  {
    id: 'TX-1002',
    amount: 250000,
    type: 'topup',
    description: 'Top-up Saldo Wallet via Midtrans (BCA Virtual Account)',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success'
  },
  {
    id: 'TX-1003',
    amount: 1000,
    type: 'broadcast_fee',
    description: 'Biaya kelebihan broadcast WABA (10 pesan melebihi limit)',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success'
  }
];

let broadcastLogs: BroadcastLog[] = [
  {
    id: 'BC-9001',
    message: 'Promo Weekend Spesial! Diskon 10% untuk pemesanan melalui WhatsApp Ayam Geprek Konakami.',
    recipientCount: 50,
    channelUsed: 'waba',
    cost: 0, // covered by free quota
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'sent'
  },
  {
    id: 'BC-9002',
    message: 'Menu baru Ayam Geprek Keju Mozzarella mulai besok! Yuk merapat ke outlet Ayam Geprek Konakami.',
    recipientCount: 100,
    channelUsed: 'fonnte',
    cost: 10000, // Rp 100 per message
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'sent'
  }
];

// --- API Endpoints ---

// Get all system data for user
app.get('/api/data', (req, res) => {
  res.json({
    userProfile,
    chatbotConfig,
    whatsappConfig,
    transactions,
    broadcastLogs,
    isGeminiConnected: !!ai
  });
});

// Update profile settings
app.post('/api/profile', (req, res) => {
  const { name, email, companyName, lowBalanceThreshold, lowBalanceAlertEnabled } = req.body;
  if (name !== undefined) userProfile.name = name;
  if (email !== undefined) userProfile.email = email;
  if (companyName !== undefined) userProfile.companyName = companyName;
  if (lowBalanceThreshold !== undefined) userProfile.lowBalanceThreshold = Number(lowBalanceThreshold);
  if (lowBalanceAlertEnabled !== undefined) userProfile.lowBalanceAlertEnabled = !!lowBalanceAlertEnabled;
  
  res.json({ success: true, userProfile });
});

// Update Chatbot Settings
app.post('/api/chatbot/config', (req, res) => {
  const { botName, systemPrompt, welcomeMessage, fallbackMessage, tone, status, knowledgeBase } = req.body;
  if (botName !== undefined) chatbotConfig.botName = botName;
  if (systemPrompt !== undefined) chatbotConfig.systemPrompt = systemPrompt;
  if (welcomeMessage !== undefined) chatbotConfig.welcomeMessage = welcomeMessage;
  if (fallbackMessage !== undefined) chatbotConfig.fallbackMessage = fallbackMessage;
  if (tone !== undefined) chatbotConfig.tone = tone;
  if (status !== undefined) chatbotConfig.status = status;
  if (knowledgeBase !== undefined) chatbotConfig.knowledgeBase = knowledgeBase;
  
  res.json({ success: true, chatbotConfig });
});

// Update WhatsApp / Channel Settings
app.post('/api/whatsapp/config', (req, res) => {
  const { channelType, wabaApiKey, wabaPhoneNumberId, wabaVerified, fonnteToken, fonnteConnected, fonnteNumber } = req.body;
  if (channelType !== undefined) whatsappConfig.channelType = channelType;
  if (wabaApiKey !== undefined) whatsappConfig.wabaApiKey = wabaApiKey;
  if (wabaPhoneNumberId !== undefined) whatsappConfig.wabaPhoneNumberId = wabaPhoneNumberId;
  if (wabaVerified !== undefined) whatsappConfig.wabaVerified = !!wabaVerified;
  if (fonnteToken !== undefined) whatsappConfig.fonnteToken = fonnteToken;
  if (fonnteConnected !== undefined) whatsappConfig.fonnteConnected = !!fonnteConnected;
  if (fonnteNumber !== undefined) whatsappConfig.fonnteNumber = fonnteNumber;
  
  res.json({ success: true, whatsappConfig });
});

// Midtrans simulated Topup payment
app.post('/api/midtrans/topup', (req, res) => {
  const { amount, paymentMethod } = req.body;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Jumlah topup tidak valid' });
  }

  const topupAmount = Number(amount);
  const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
  
  const newTx: Transaction = {
    id: txId,
    amount: topupAmount,
    type: 'topup',
    description: `Top-up Saldo Wallet via Midtrans (${paymentMethod || 'Mandiri Virtual Account'})`,
    createdAt: new Date().toISOString(),
    status: 'success'
  };

  userProfile.walletBalance += topupAmount;
  transactions.unshift(newTx);

  res.json({
    success: true,
    transaction: newTx,
    newBalance: userProfile.walletBalance
  });
});

// Upgrade / Change Subscription Plan
app.post('/api/subscription/change', (req, res) => {
  const { plan } = req.body;
  if (!['Starter', 'Pro', 'Business'].includes(plan)) {
    return res.status(400).json({ error: 'Paket tidak valid' });
  }

  let price = 0;
  if (plan === 'Starter') price = 99000;
  else if (plan === 'Pro') price = 499000;
  else if (plan === 'Business') price = 0; // Custom negotiation, starts with free simulation

  if (price > 0 && userProfile.walletBalance < price) {
    return res.status(400).json({ 
      error: `Saldo tidak mencukupi untuk beralih ke paket ${plan}. Dibutuhkan Rp ${price.toLocaleString('id-ID')}, saldo saat ini Rp ${userProfile.walletBalance.toLocaleString('id-ID')}.` 
    });
  }

  if (price > 0) {
    userProfile.walletBalance -= price;
    const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    const newTx: Transaction = {
      id: txId,
      amount: price,
      type: 'subscription',
      description: `Upgrade Paket ke ${plan} (Langganan Bulanan)`,
      createdAt: new Date().toISOString(),
      status: 'success'
    };
    transactions.unshift(newTx);
  }

  userProfile.plan = plan as 'Starter' | 'Pro' | 'Business';
  userProfile.planStatus = 'active';

  res.json({
    success: true,
    userProfile,
    newBalance: userProfile.walletBalance
  });
});

// Chatbot testing endpoint using Gemini
app.post('/api/gemini/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
  }

  // Build the system instructions for Gemini
  const toneInstruction = chatbotConfig.tone === 'friendly' 
    ? 'Gunakan bahasa Indonesia yang ramah, sopan, bersahabat, menggunakan sapaan hangat.' 
    : chatbotConfig.tone === 'casual'
    ? 'Gunakan bahasa Indonesia santai, akrab, menggunakan istilah kekinian tapi tetap sopan.'
    : 'Gunakan bahasa Indonesia formal, profesional, lugas, dan efisien.';

  const fullSystemInstruction = `${chatbotConfig.systemPrompt}
  
[KNOWLEDGE BASE / BASIS PENGETAHUAN ANDA]:
${chatbotConfig.knowledgeBase}

[PETUNJUK GAYA BICARA]:
- Tone: ${chatbotConfig.tone} (${toneInstruction})
- Jika pengguna bertanya di luar informasi yang Anda ketahui atau di luar basis pengetahuan, jawab secara halus atau gunakan pesan fallback berikut: "${chatbotConfig.fallbackMessage}".
- Jadilah asisten chatbot yang membantu dan efisien untuk bisnis pelanggan.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7
        }
      });

      const replyText = response.text || chatbotConfig.fallbackMessage;
      return res.json({
        reply: replyText,
        source: 'gemini'
      });
    } catch (error: any) {
      console.error("Gemini API execution failed:", error);
      // Fallback to local regex/rule matcher if Gemini has a runtime error
      const replyText = fallbackLocalMatch(message, chatbotConfig);
      return res.json({
        reply: replyText,
        source: 'local_fallback_error',
        errorDetails: error?.message || 'Unknown error'
      });
    }
  } else {
    // If Gemini client is not initialized, mock using local smart keyword-based matching
    const replyText = fallbackLocalMatch(message, chatbotConfig);
    return res.json({
      reply: replyText,
      source: 'local_fallback_key_missing'
    });
  }
});

// Webhook endpoint untuk menerima pesan WhatsApp dari Fonnte Gateway
app.post('/api/webhook/fonnte', async (req, res) => {
  // Fonnte mengirimkan data payload via POST parameters (bisa JSON atau urlencoded)
  const { sender, message, device, name } = req.body;

  console.log(`[Fonnte Webhook] Menerima chat dari ${sender} (${name || 'Tanpa Nama'}, Device: ${device || 'N/A'}): "${message}"`);

  if (!message || !sender) {
    return res.status(200).json({ status: 'ignored', reason: 'Pesan atau pengirim kosong' });
  }

  // Cek apakah asisten chatbot aktif dan terhubung
  if (chatbotConfig.status !== 'active') {
    console.log('[Fonnte Webhook] Chatbot sedang non-aktif. Mengabaikan pesan.');
    return res.status(200).json({ status: 'ignored', reason: 'Chatbot non-aktif' });
  }

  // Pastikan channel Fonnte aktif dan memiliki token
  if (whatsappConfig.channelType !== 'fonnte' || !whatsappConfig.fonnteToken) {
    console.log('[Fonnte Webhook] Integrasi Fonnte tidak aktif atau token Fonnte kosong.');
    return res.status(200).json({ status: 'ignored', reason: 'Fonnte tidak terkonfigurasi' });
  }

  // Cegah looping balasan jika pengirim adalah nomor perangkat itu sendiri (self-loop)
  const cleanSender = sender.replace(/[^0-9]/g, '');
  const cleanDevice = device ? device.replace(/[^0-9]/g, '') : '';
  if (cleanSender === cleanDevice) {
    console.log('[Fonnte Webhook] Pengirim sama dengan nomor perangkat Fonnte. Mengabaikan pesan untuk mencegah looping otomatis.');
    return res.status(200).json({ status: 'ignored', reason: 'Mencegah looping balasan otomatis' });
  }

  // Buat instruksi sistem dan hasilkan balasan
  const toneInstruction = chatbotConfig.tone === 'friendly' 
    ? 'Gunakan bahasa Indonesia yang ramah, sopan, bersahabat, menggunakan sapaan hangat.' 
    : chatbotConfig.tone === 'casual'
    ? 'Gunakan bahasa Indonesia santai, akrab, menggunakan istilah kekinian tapi tetap sopan.'
    : 'Gunakan bahasa Indonesia formal, profesional, lugas, dan efisien.';

  const fullSystemInstruction = `${chatbotConfig.systemPrompt}
  
[KNOWLEDGE BASE / BASIS PENGETAHUAN ANDA]:
${chatbotConfig.knowledgeBase}

[PETUNJUK GAYA BICARA]:
- Tone: ${chatbotConfig.tone} (${toneInstruction})
- Jika pengguna bertanya di luar informasi yang Anda ketahui atau di luar basis pengetahuan, jawab secara halus atau gunakan pesan fallback berikut: "${chatbotConfig.fallbackMessage}".
- Jadilah asisten chatbot yang membantu dan efisien untuk bisnis pelanggan.`;

  let replyText = '';
  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7
        }
      });
      replyText = response.text || chatbotConfig.fallbackMessage;
    } else {
      replyText = fallbackLocalMatch(message, chatbotConfig);
    }
  } catch (error) {
    console.error('[Fonnte Webhook] Error saat generate balasan dengan Gemini:', error);
    replyText = fallbackLocalMatch(message, chatbotConfig);
  }

  // Kirim balasan kembali ke pengirim lewat Fonnte Send API
  try {
    const fonnteApiUrl = 'https://api.fonnte.com/send';
    
    const params = new URLSearchParams();
    params.append('target', sender);
    params.append('message', replyText);

    // Guardrail: Tambahkan jeda waktu acak 1.5 - 3 detik agar terlihat seperti manusia mengetik (mencegah banned)
    const delayMs = Math.floor(Math.random() * 1500) + 1500;
    
    setTimeout(async () => {
      try {
        const response = await fetch(fonnteApiUrl, {
          method: 'POST',
          headers: {
            'Authorization': whatsappConfig.fonnteToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });
        
        const result = await response.json();
        console.log(`[Fonnte Webhook] Berhasil membalas pesan ke ${sender}. Response Fonnte:`, result);
      } catch (sendErr) {
        console.error('[Fonnte Webhook] Gagal mengirim balasan via Fonnte:', sendErr);
      }
    }, delayMs);

    return res.status(200).json({ status: 'processing', reply: replyText });
  } catch (err) {
    console.error('[Fonnte Webhook] Gagal memicu pengiriman balasan:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Send simulated Broadcast
app.post('/api/broadcast/send', (req, res) => {
  const { message, recipientCount, channel } = req.body;
  const count = Number(recipientCount);

  if (!message) {
    return res.status(400).json({ error: 'Isi pesan broadcast tidak boleh kosong' });
  }
  if (!count || isNaN(count) || count <= 0) {
    return res.status(400).json({ error: 'Jumlah penerima tidak valid' });
  }
  if (!['waba', 'fonnte'].includes(channel)) {
    return res.status(400).json({ error: 'Metode channel broadcast tidak valid' });
  }

  let calculatedCost = 0;
  
  if (channel === 'waba') {
    // Official Business API: 50 messages per month are free. Excess is Rp 350 per message.
    const freeQuota = whatsappConfig.wabaFreeQuotaLeft;
    if (count <= freeQuota) {
      whatsappConfig.wabaFreeQuotaLeft -= count;
      calculatedCost = 0;
    } else {
      const chargeableCount = count - freeQuota;
      whatsappConfig.wabaFreeQuotaLeft = 0;
      calculatedCost = chargeableCount * 350; // Rp 350 per excess message
    }
  } else {
    // Alternative gateway Fonnte: Costs Rp 100 per message
    calculatedCost = count * 100; // Rp 100 per message
  }

  // Check if wallet balance can cover the cost
  if (calculatedCost > userProfile.walletBalance) {
    return res.status(400).json({
      error: `Saldo tidak mencukupi untuk broadcast ke ${count} penerima melalui ${channel === 'waba' ? 'WABA Resmi' : 'Fonnte Gateway'}. Diperlukan Rp ${calculatedCost.toLocaleString('id-ID')}, saldo saat ini Rp ${userProfile.walletBalance.toLocaleString('id-ID')}.`
    });
  }

  // Deduct from wallet
  if (calculatedCost > 0) {
    userProfile.walletBalance -= calculatedCost;
    
    // Add transaction log
    const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    const newTx: Transaction = {
      id: txId,
      amount: calculatedCost,
      type: 'broadcast_fee',
      description: `Biaya Broadcast ${count} pesan melalui ${channel === 'waba' ? 'WhatsApp Business API' : 'Fonnte Gateway'}`,
      createdAt: new Date().toISOString(),
      status: 'success'
    };
    transactions.unshift(newTx);
  }

  // Add Broadcast Log
  const bcId = 'BC-' + Math.floor(1000 + Math.random() * 9000);
  const newLog: BroadcastLog = {
    id: bcId,
    message,
    recipientCount: count,
    channelUsed: channel,
    cost: calculatedCost,
    createdAt: new Date().toISOString(),
    status: 'sent'
  };
  broadcastLogs.unshift(newLog);

  // Return success info, including trigger alert if balance goes below threshold
  const isBalanceLow = userProfile.lowBalanceAlertEnabled && (userProfile.walletBalance < userProfile.lowBalanceThreshold);

  res.json({
    success: true,
    broadcastLog: newLog,
    newBalance: userProfile.walletBalance,
    isBalanceLow,
    lowBalanceWarning: isBalanceLow ? `Peringatan! Saldo wallet Anda tinggal Rp ${userProfile.walletBalance.toLocaleString('id-ID')}, di bawah batas aman Rp ${userProfile.lowBalanceThreshold.toLocaleString('id-ID')}. Mohon segera topup agar layanan tetap aktif.` : null
  });
});


// Helper for local keyword-based chatbot response
function fallbackLocalMatch(msg: string, config: ChatbotConfig): string {
  const m = msg.toLowerCase();
  
  if (m.includes('halo') || m.includes('hi') || m.includes('siang') || m.includes('pagi') || m.includes('sore') || m.includes('malam') || m.includes('permisi')) {
    return config.welcomeMessage;
  }
  
  if (m.includes('menu') || m.includes('daftar') || m.includes('makan') || m.includes('minum') || m.includes('harga') || m.includes('geprek')) {
    if (config.knowledgeBase.includes('Menu') || config.knowledgeBase.includes('Ayam')) {
      const idx = config.knowledgeBase.indexOf('Menu');
      const start = idx !== -1 ? idx : 0;
      return "Berikut adalah daftar menu dan harga kami:\n\n" + config.knowledgeBase.substring(start, start + 350) + "...";
    }
    return "Kami menyajikan Ayam Geprek Original dengan tingkat pedas level 1-5 seharga Rp 15.000, serta Es Teh Manis dingin Rp 5.000!";
  }

  if (m.includes('jam') || m.includes('buka') || m.includes('tutup') || m.includes('operasional')) {
    if (config.knowledgeBase.includes('Jam') || config.knowledgeBase.includes('Operasional')) {
      return "Outlet kami buka setiap hari mulai pukul 10.00 hingga 21.00 WIB!";
    }
  }

  if (m.includes('lokasi') || m.includes('alamat') || m.includes('dimana') || m.includes('kantor') || m.includes('tempat')) {
    return "Kami berlokasi di Jl. Jenderal Sudirman No. 45, Palembang (dekat dengan kantor pusat Konakami Digital Indonesia). Silakan berkunjung!";
  }

  if (m.includes('cara') || m.includes('pesan') || m.includes('order') || m.includes('beli')) {
    return "Cara memesan sangat mudah! Cukup kirimkan pesan dengan format: Nama - Pesanan - Alamat Pengiriman ke nomor WhatsApp ini.";
  }

  return config.fallbackMessage;
}


// Vite development setup / Static files production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.PORT) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();
