DESAINKU - PETA FILE
index.html     isi halaman: teks, judul, kartu layanan, kolom formulir
css/style.css  tampilan; warna utama ada di bagian paling atas (:root)
js/config.js   pengaturan: nama usaha, nomor WhatsApp, email, warna pilihan, anggaran
js/app.js      cara kerja formulir, unggah gambar, kirim pesanan

MAU UBAH APA, BUKA DI MANA
Nama usaha            js/config.js, cari brand
Nomor WA dan email    js/config.js, cari whatsapp dan email (wajib diisi)
Warna situs           css/style.css, cari --green dan --bg
Judul dan teks        index.html, cari teks yang ingin diganti, misalnya "Desain apa pun"
Jenis desain          index.html, cari data-g="type"
Angka statistik       index.html, cari data-to
Pesanan otomatis      js/config.js, isi endpoint

CATATAN
- Pesanan juga tersimpan di browser pengunjung (localStorage), bukan di server Anda.
  Agar pesanan masuk ke Anda, andalkan tombol WhatsApp dan email, atau isi endpoint.
- Tombol WhatsApp dan email tidak bisa melampirkan gambar. Gambar baru ikut terkirim bila endpoint diisi.
- Cara membuka: klik dua kali index.html, atau unggah seluruh folder ke hosting.
