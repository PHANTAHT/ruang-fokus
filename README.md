# Ruang Fokus

Planner tugas dan timer fokus sederhana, dibuat menggunakan HTML, CSS, dan JavaScript tanpa framework atau proses build.

## Fitur

- Tambah, selesaikan, dan hapus tugas dengan prioritas.
- Filter tugas serta ringkasan progres otomatis.
- Timer fokus 25 menit dan istirahat 5 menit; bisa dijeda dan direset.
- Tugas tersimpan di localStorage pada browser/perangkat yang sama.
- Layout responsif, kontrol keyboard, label aksesibilitas, dan penanganan kegagalan penyimpanan.

## Menjalankan

Buka `dist/index.html` di browser, atau jalankan server statis dari direktori `dist`. Tidak membutuhkan instalasi dependency. Font Google bersifat opsional, dengan fallback font sistem.

## Deploy

### GitHub Pages

Workflow `.github/workflows/pages.yml` memublikasikan `dist` ketika branch `main` menerima push. Di pengaturan repository, pilih **Settings → Pages → Source → GitHub Actions**. Workflow juga bisa dijalankan melalui **Actions → Deploy Ruang Fokus to GitHub Pages → Run workflow**.

### Sites

Folder publik: `dist`. Konfigurasi Sites ada pada `.openai/hosting.json`. Data tugas hanya disimpan di browser, tidak disinkronkan ke server. Timer bergantung pada jam perangkat dan diperbarui saat tab kembali dibuka.
