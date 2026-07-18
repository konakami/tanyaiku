# Tanyaiku - AI Chatbot & WhatsApp Integration SaaS Platform
> Salah satu produk unggulan dari **PT Konakami Digital Indonesia** yang menawarkan solusi otomatisasi dukungan pelanggan (customer support) pintar, mandiri, dan hemat biaya untuk bisnis di Indonesia.

[![Live App](https://img.shields.io/badge/Live-tanyaiku.com-teal?style=for-the-badge)](https://tanyaiku.com)
[![Developer](https://img.shields.io/badge/Developer-Konakami_Digital_Indonesia-purple?style=for-the-badge)](https://konakami.id)
[![Stack](https://img.shields.io/badge/Tech_Stack-React_+_Express_+_Gemini_AI-blue?style=for-the-badge)](#teknologi)

---

## 🌟 Fitur Unggulan

Tanyaiku dirancang sebagai platform **SaaS Multi-Tenant** di mana pemilik bisnis (tenant) dapat mendaftar, masuk, dan mengelola konfigurasi chatbot mereka secara mandiri tanpa coding.

### 🤖 1. Otomatisasi Cerdas dengan Gemini AI
* Menggunakan model **Gemini 3.5 Flash** yang sangat cerdas, cepat, namun efisien secara biaya.
* Tenant dapat mengatur **Basis Pengetahuan (Knowledge Base)** secara mandiri (mengunggah daftar menu, harga, jam operasional, lokasi outlet, dsb).
* Sistem penyesuaian gaya bicara (**Tone of Voice**) bot: *Friendly* (Ramah), *Professional* (Formal), atau *Casual* (Santai).

### 💬 2. Integrasi Dual Jalur WhatsApp API
Tanyaiku memahami kebutuhan anggaran bisnis Anda yang berbeda-beda. Kami menyediakan 2 opsi integrasi:
1. **WhatsApp Business API Resmi (WABA)**:
   * Menggunakan API resmi Meta dengan kredibilitas tinggi.
   * Mendukung lencana centang hijau (*Verified Badge*).
   * **Gratis 50 pesan broadcast pertama** setiap bulannya.
2. **Gateway Alternatif (Fonnte)**:
   * Menggunakan nomor WhatsApp pribadi Anda sendiri dengan device token.
   * Sangat hemat biaya dan tanpa minimum kontrak deposit.

### 💳 3. Wallet Fleksibel & Integrasi Midtrans
* Penggunaan broadcast massal ditarik secara otomatis dari **Sistem Wallet Tenant**.
* Integrasi simulasi payment gateway **Midtrans** untuk mempermudah top-up saldo via Virtual Account (BCA, Mandiri), GoPay, ShopeePay, atau Kartu Kredit.
* **Notifikasi Saldo Menipis Otomatis**: Layanan akan memberikan peringatan real-time jika saldo wallet Anda berada di bawah batas aman agar bot tidak terhenti.

### 📊 4. Laporan Operasional Real-time
* Dashboard interaktif untuk memantau pengeluaran operasional.
* Analisis rasio alokasi biaya antara biaya langganan bulanan (*subscription*) dan biaya broadcast promosi.

---

## 🛠️ Arsitektur & Teknologi

Aplikasi ini dibangun menggunakan arsitektur **Full-Stack (Vite + Express)** dengan teknologi modern:

* **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, dan Motion (animasi interaktif).
* **Backend**: Express.js server-side API untuk menjaga keamanan API Key rahasia agar tidak terekspos ke browser pelanggan.
* **AI Engine**: `@google/genai` SDK dengan sistem fallback cerdas jika API Key sedang dikonfigurasi.
* **Build System**: `esbuild` bundling otomatis untuk performa cold start optimal pada production environment.

---

## 🚀 Memulai Pengembangan Lokal

### 1. Prasyarat
Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstall pada sistem Anda.

### 2. Duplikasi Berkas Lingkungan (Environment Variables)
Buat file `.env` di root direktori dengan menyalin `.env.example`:
```env
GEMINI_API_KEY="KUNCI_API_GEMINI_ANDA"
APP_URL="http://localhost:3000"
```

### 3. Instalasi Dependensi & Menjalankan Server
Jalankan perintah berikut di terminal Anda:

```bash
# Menginstal dependensi
npm install

# Menjalankan server development (Port 3000)
npm run dev
```

### 4. Membangun Proyek untuk Produksi
```bash
# Melakukan build frontend & backend server
npm run build

# Menjalankan build produksi
npm start
```

---

## 🏢 Tentang Kami
**PT Konakami Digital Indonesia** adalah perusahaan inovasi teknologi digital yang berkomitmen menghadirkan solusi teknologi mutakhir yang inklusif untuk mendorong pertumbuhan bisnis dan transformasi digital instansi serta UMKM di seluruh wilayah Indonesia.

* **Kontak Dukungan**: info@tanyaiku.com
* **Alamat Kantor**: Palembang, Sumatera Selatan, Indonesia
