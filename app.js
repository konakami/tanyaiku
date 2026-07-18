// app.js
// Entry point wrapper for Hostinger Node.js deployment
// This file forwards the execution to the compiled production server.

try {
  require('./dist/server.cjs');
} catch (error) {
  console.error("Gagal memulai server produksi Tanyaiku.");
  console.error("Pastikan Anda sudah menjalankan perintah build ('npm run build') terlebih dahulu.");
  console.error(error);
  process.exit(1);
}
