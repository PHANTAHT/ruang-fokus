# Ruang Fokus

Aplikasi pencatat tugas dan timer fokus harian menggunakan HTML, CSS, dan JavaScript.

- **Repository:** https://github.com/PHANTAHT/ruang-fokus
- **Demo online:** https://phantaht.github.io/ruang-fokus/

## Kebutuhan dan masalah yang diselesaikan

Pengguna membutuhkan cara sederhana untuk mencatat pekerjaan, menentukan prioritas, melihat progres, dan membagi waktu kerja agar lebih teratur. Tugas yang hanya diingat dapat terlupakan, sementara distraksi membuat pekerjaan sulit diselesaikan.

Ruang Fokus menyediakan daftar tugas dengan prioritas, filter status, ringkasan progres, serta timer fokus 25 menit dan istirahat 5 menit. Aplikasi ditujukan untuk penggunaan pribadi, misalnya mengatur tugas kuliah atau pekerjaan harian, tanpa perlu membuat akun.

## Fitur

- Menambah tugas dengan prioritas Normal, Penting, atau Santai.
- Menandai tugas selesai dan menghapus tugas.
- Memfilter Semua, Aktif, dan Selesai.
- Menampilkan jumlah tugas, tugas selesai, tugas tersisa, dan persentase progres.
- Timer fokus 25 menit dan istirahat 5 menit dengan kontrol mulai, jeda, dan reset.
- Menyimpan tugas otomatis pada browser dan perangkat yang sama.
- Tampilan responsif, label aksesibilitas, dan dukungan navigasi keyboard.

## Cara menjalankan aplikasi

### Mencoba demo

Buka https://phantaht.github.io/ruang-fokus/ pada browser modern. Tidak memerlukan login.

### Menjalankan secara lokal

1. Clone repository:

   ```bash
   git clone https://github.com/PHANTAHT/ruang-fokus.git
   cd ruang-fokus
   ```

2. Buka file `dist/index.html` di browser modern. Tidak membutuhkan instalasi dependency atau proses build.
3. Alternatif: gunakan ekstensi **Live Server** di VS Code untuk membuka `dist/index.html` melalui server lokal.

### Alur penggunaan

1. Tulis tugas, pilih prioritas, lalu klik **Tambah tugas**.
2. Gunakan checkbox untuk menandai tugas selesai; progres diperbarui otomatis.
3. Pilih filter untuk melihat tugas aktif atau selesai.
4. Klik **Mulai fokus**, lalu gunakan **Jeda** atau **Reset** sesuai kebutuhan.
5. Setelah sesi fokus, pilih **Istirahat** untuk menjalankan timer 5 menit.

## Proses penggunaan AI

Proyek ini dikembangkan dengan bantuan **OpenAI Codex** melalui percakapan dan pengoperasian alat pengembangan.

1. **Penentuan kebutuhan:** pengguna meminta proyek sederhana yang berguna dengan HTML, CSS, dan JavaScript, tampilan rapi, serta repository dan deployment. Ide aplikasi tugas dan fokus dipilih oleh AI.
2. **Perancangan:** AI menyusun alur pencatatan tugas, prioritas, progres, dan timer; memilih warna hijau lembut, layout kartu, serta tampilan responsif.
3. **Implementasi:** AI menghasilkan HTML semantik, CSS, JavaScript, penyimpanan lokal, dan workflow GitHub Pages.
4. **Verifikasi:** sintaks JavaScript diperiksa dengan `node --check dist/app.js`. Pemeriksaan pada lingkungan DOM simulasi mencakup tambah tugas, validasi input, penyelesaian, penghapusan, penyimpanan, serta mulai dan reset timer.
5. **Publikasi:** kode di-commit dan dikirim ke GitHub. GitHub Pages diaktifkan dan workflow dijalankan ulang setelah pengaturan Pages tersedia. Status deploy berhasil dan halaman demo diperiksa melalui browser.

Pengguna menentukan tujuan dan menghubungkan akun GitHub. AI membantu memilih implementasi, menulis kode, melakukan pemeriksaan, dan publikasi. Aplikasi yang dihasilkan tidak menggunakan model AI saat dijalankan dan tidak memerlukan API key.

Pemeriksaan DOM simulasi bukan pengujian menyeluruh pada semua browser dan ukuran layar. Dukungan WebMCP opsional diuji pada konteks simulasi, belum diverifikasi pada browser yang mendukung API tersebut.

## Keputusan teknis

| Keputusan | Alasan dan konsekuensi |
| --- | --- |
| HTML, CSS, dan JavaScript tanpa framework | Sesuai kebutuhan proyek sederhana; tidak membutuhkan dependency aplikasi atau build. |
| Hosting statis melalui GitHub Pages | Aplikasi tidak membutuhkan backend; folder `dist` dapat langsung dipublikasikan. |
| `localStorage` untuk tugas | Mempertahankan tugas setelah halaman ditutup tanpa akun atau database. Data tidak tersinkron antarperangkat. |
| Timer berdasarkan `Date.now()` | Menghitung sisa waktu dari waktu target, sehingga tidak hanya bergantung pada jumlah callback interval saat tab berada di latar belakang. |
| `textContent` untuk judul tugas | Menampilkan masukan sebagai teks, sehingga HTML dari pengguna tidak dieksekusi. |
| Validasi input dan data tersimpan | Menolak tugas kosong, membatasi judul hingga 160 karakter, memeriksa prioritas, dan menyaring data tersimpan yang tidak valid. |
| CSS Grid dan media query | Menyesuaikan layout dari dua kolom pada desktop menjadi satu kolom pada layar kecil. |
| Font Google dengan fallback sistem | Memberi tampilan konsisten saat font tersedia; aplikasi tetap dapat digunakan jika font gagal dimuat. |
| WebMCP dengan deteksi dukungan | Menyediakan aksi opsional membaca dan menambah tugas bagi browser yang mendukungnya tanpa menjadi syarat penggunaan aplikasi. |

## Struktur proyek

```text
.github/workflows/pages.yml  # Workflow deploy GitHub Pages
.openai/hosting.json         # Konfigurasi hosting Sites awal
dist/
  index.html                # Struktur halaman
  styles.css                # Tampilan dan layout responsif
  app.js                    # Tugas, penyimpanan, filter, dan timer
README.md                   # Dokumentasi proyek
```

## Deployment

Workflow `.github/workflows/pages.yml` memeriksa sintaks JavaScript, mengunggah folder `dist`, lalu melakukan deployment. Workflow berjalan ketika branch `main` menerima push atau dijalankan manual.

Pengaturan repository: **Settings → Pages → Source → GitHub Actions**.

Demo yang dapat dicoba penilai: **https://phantaht.github.io/ruang-fokus/**

## Batasan

- Data berada pada browser/perangkat yang digunakan; menghapus data browser dapat menghapus daftar tugas.
- Jika penyimpanan browser tidak tersedia, aplikasi memberi pemberitahuan dan tugas hanya tersedia selama halaman terbuka.
- Sesi timer tidak dipertahankan setelah halaman dimuat ulang atau ditutup, dan perubahan jam perangkat dapat memengaruhi hitungan.
- Tidak ada akun, sinkronisasi cloud, atau notifikasi saat browser ditutup.
