/* ===== PENGATURAN UTAMA: ubah isi di file ini ===== */
const CONFIG={
  brand:"UmiDesign",          // nama usaha, tampil di menu, footer, dan judul tab
  whatsapp:"6285717787544",  // WAJIB diisi: nomor tujuan pesanan, format 62812xxxxxxx (tanpa + dan tanpa 0 di depan)
  
  email:"abduljalilmaularosyid@gmail.com", // WAJIB diisi: email tujuan pesanan 
  endpoint:"https://formspree.io/f/myeeqeyq",               // opsional: alamat Formspree atau Google Apps Script agar pesanan masuk otomatis
  maxFiles:3,                // jumlah maksimal gambar contoh
  maxFileMB:2,               // ukuran maksimal tiap gambar (MB)
  colors:[                   // pilihan warna di formulir: [nama, kode warna]
    ["Hijau","#34d366"],["Biru","#2f6fed"],["Merah","#e5483b"],["Kuning","#f5c431"],
    ["Oranye","#f28a2e"],["Ungu","#8b5cf6"],["Hitam","#1c1c1a"],["Putih","#ffffff"]
  ],
  budgets:[                  // pilihan anggaran di formulir
    "Belum tahu, mau diskusi dulu","Di bawah Rp30 ribu","Rp50 ribu – Rp100 ribu","Rp100 ribu – Rp300 ribu","Di atas Rp300 ribu"
  ]
};
