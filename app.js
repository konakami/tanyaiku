// app.js
// Entry point wrapper for Hostinger Node.js deployment
try {
  // Menggunakan path absolute internal agar Hostinger tidak tersesat mencari modul
  require('./dist/server.cjs');
} catch (error) {
  console.error("Gagal memulai server produksi Tanyaiku.");
  console.error(error);
  process.exit(1);
}