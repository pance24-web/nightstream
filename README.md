# NightVid

Situs streaming sederhana (static).

## Struktur
- `index.html` — halaman utama
- `css/style.css` — style
- `js/app.js` — logic grid + modal player
- `data/videos.js` — daftar video (hanya yang punya `embed`)

## Tambah video
Edit `data/videos.js`:

```js
{
  id: 3,
  title: "Judul",
  cat: "test",
  dur: "10:00",
  views: "1K",
  thumb: "https://link-thumbnail.jpg",
  embed: "https://host.com/e/xxxxx"
}
```

Live: https://pance24-web.github.io/nightstream/
