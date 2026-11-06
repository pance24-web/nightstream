# NightStream — Situs Streaming Video Dewasa

Situs streaming video dewasa modern dengan tampilan dark theme (gaya Netflix / Pornhub).

## Fitur

- **Beranda** dengan Hero section, Trending, Kategori, Baru Dirilis, Rekomendasi
- **Halaman Jelajahi** dengan filter kategori + sorting (populer / terbaru / rating)
- **Halaman Watch** dengan player placeholder + video terkait
- **Daftar Saya** (My List) tersimpan di localStorage
- Pencarian real-time
- Responsive (mobile-friendly)
- Dark theme modern

## Struktur Folder

```
nightstream/
├── index.html
├── css/style.css
├── data/videos.js          ← data dummy video
├── js/
│   ├── app.js
│   └── components.js
├── pages/
│   ├── browse.html
│   ├── watch.html
│   └── mylist.html
└── README.md
```

## Cara Menjalankan

Cukup buka `index.html` di browser, atau gunakan live server:

```bash
# Contoh dengan Python
cd nightstream
python -m http.server 8080
```

Lalu buka http://localhost:8080

Atau aktifkan **GitHub Pages**:
1. Settings → Pages
2. Source: Deploy from branch `main`
3. Folder: `/ (root)`

Nanti situs akan live di: `https://pance24-web.github.io/nightstream/`

## Catatan

- Semua data video adalah **dummy/placeholder**.
- Tidak ada video nyata yang di-host. Player hanya mode preview.
- Thumbnail menggunakan picsum.photos (placeholder image).
- My List disimpan di browser localStorage.
- Hanya untuk keperluan demo / pembelajaran.

## Kustomisasi

Edit `data/videos.js` untuk menambah/mengubah data video.
Edit `css/style.css` untuk mengubah warna/tema (variabel CSS di bagian atas).
