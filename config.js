/* ===== PENGATURAN UTAMA: ubah isi di file ini ===== */
const CONFIG={
  brand:"DesainKu",          // nama usaha, tampil di menu, footer, dan judul tab
  whatsapp:"",               // WAJIB diisi: nomor tujuan pesanan, format 62812xxxxxxx (tanpa + dan tanpa 0 di depan)
  email:"",                  // WAJIB diisi: email tujuan pesanan
  endpoint:"",               // opsional: alamat Formspree atau Google Apps Script agar pesanan masuk otomatis
  maxFiles:3,                // jumlah maksimal gambar contoh
  maxFileMB:2,               // ukuran maksimal tiap gambar (MB)
  colors:[                   // pilihan warna di formulir: [nama, kode warna]
    ["Hijau","#34d366"],["Biru","#2f6fed"],["Merah","#e5483b"],["Kuning","#f5c431"],
    ["Oranye","#f28a2e"],["Ungu","#8b5cf6"],["Hitam","#1c1c1a"],["Putih","#ffffff"]
  ],
  budgets:[                  // pilihan anggaran di formulir
    "Belum tahu, mau diskusi dulu","Di bawah Rp500 ribu","Rp500 ribu – Rp1 juta","Rp1 juta – Rp3 juta","Di atas Rp3 juta"
  ]
};
