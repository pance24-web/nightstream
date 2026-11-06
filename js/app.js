// ===== MAIN APP LOGIC =====

function initHomePage() {
  initNavbarScroll();
  initSearch();

  const trending = getTrending();
  const heroVideo = trending[0] || VIDEOS[0];
  
  const hero = document.getElementById('hero');
  if (hero) {
    hero.style.backgroundImage = `url('${heroVideo.thumbnail}')`;
  }
  
  document.getElementById('heroTitle').textContent = heroVideo.title;
  document.getElementById('heroDesc').textContent = heroVideo.description;
  document.getElementById('heroDuration').innerHTML = `<i class="fas fa-clock"></i> ${heroVideo.duration}`;
  document.getElementById('heroViews').innerHTML = `<i class="fas fa-eye"></i> ${heroVideo.views}`;
  document.getElementById('heroCategory').innerHTML = `<i class="fas fa-tag"></i> ${heroVideo.category}`;
  
  const playBtn = document.getElementById('heroPlay');
  if (playBtn) {
    playBtn.href = `pages/watch.html?id=${heroVideo.id}`;
  }
  
  const addBtn = document.getElementById('heroAdd');
  if (addBtn) {
    updateAddButton(addBtn, heroVideo.id);
    addBtn.onclick = () => {
      toggleMyList(heroVideo.id);
      updateAddButton(addBtn, heroVideo.id);
    };
  }

  const trendingGrid = document.getElementById('trendingGrid');
  if (trendingGrid) {
    trendingGrid.innerHTML = getTrending().map(createVideoCard).join('');
  }

  const newestGrid = document.getElementById('newestGrid');
  if (newestGrid) {
    newestGrid.innerHTML = getNewest().map(createVideoCard).join('');
  }

  const recommendGrid = document.getElementById('recommendGrid');
  if (recommendGrid) {
    recommendGrid.innerHTML = getRecommended().map(createVideoCard).join('');
  }

  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    categoryGrid.innerHTML = CATEGORIES.filter(c => c.id !== 'all')
      .map(createCategoryCard).join('');
  }
}

function updateAddButton(btn, id) {
  if (isInMyList(id)) {
    btn.innerHTML = '<i class="fas fa-check"></i> Di Daftar Saya';
  } else {
    btn.innerHTML = '<i class="fas fa-plus"></i> Daftar Saya';
  }
}

function initBrowsePage() {
  initNavbarScroll();
  initSearch();

  const params = new URLSearchParams(window.location.search);
  let category = params.get('cat') || 'all';
  let query = params.get('q') || '';
  let sort = params.get('sort') || 'popular';

  const titleEl = document.getElementById('pageTitle');
  if (query) {
    titleEl.textContent = `Hasil pencarian: "${query}"`;
  } else if (category !== 'all') {
    const cat = CATEGORIES.find(c => c.id === category);
    titleEl.textContent = cat ? cat.name : 'Jelajahi';
  } else {
    titleEl.textContent = 'Jelajahi Semua Video';
  }

  const filtersEl = document.getElementById('filters');
  if (filtersEl) {
    filtersEl.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-btn ${cat.id === category && !query ? 'active' : ''}" 
              onclick="filterCategory('${cat.id}')">
        <i class="fas ${cat.icon}"></i> ${cat.name}
      </button>
    `).join('');
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.value = sort;
    sortSelect.onchange = () => {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('sort', sortSelect.value);
      window.location.search = newParams.toString();
    };
  }

  let videos = query ? searchVideos(query) : getVideosByCategory(category);

  if (sort === 'newest') {
    videos = [...videos].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  } else if (sort === 'rating') {
    videos = [...videos].sort((a, b) => b.rating - a.rating);
  } else {
    videos = [...videos].sort((a, b) => {
      const aV = parseFloat(a.views) * (a.views.includes('M') ? 1e6 : 1e3);
      const bV = parseFloat(b.views) * (b.views.includes('M') ? 1e6 : 1e3);
      return bV - aV;
    });
  }

  const grid = document.getElementById('browseGrid');
  const countEl = document.getElementById('resultCount');
  
  if (videos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-search"></i>
        <h3>Tidak ada video ditemukan</h3>
        <p>Coba kata kunci atau kategori lain</p>
      </div>
    `;
    if (countEl) countEl.textContent = '0 video';
  } else {
    grid.innerHTML = videos.map(createVideoCard).join('');
    if (countEl) countEl.textContent = `${videos.length} video`;
  }
}

function filterCategory(cat) {
  const params = new URLSearchParams();
  if (cat !== 'all') params.set('cat', cat);
  window.location.search = params.toString();
}

function initWatchPage() {
  initNavbarScroll();
  initSearch();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const video = getVideoById(id);

  if (!video) {
    document.getElementById('watchContent').innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Video tidak ditemukan</h3>
        <p><a href="../index.html" class="btn btn-primary" style="margin-top:1rem">Kembali ke Beranda</a></p>
      </div>
    `;
    return;
  }

  const player = document.getElementById('playerArea');
  player.innerHTML = `
    <div class="player-placeholder">
      <i class="fas fa-play-circle"></i>
      <p>Preview Mode</p>
      <p style="font-size:0.85rem;max-width:300px;text-align:center">
        Ini adalah demo. Video asli tidak tersedia di versi demo ini.
      </p>
      <button class="btn btn-primary" onclick="showToast('Fitur putar hanya demo', 'fa-info-circle')">
        <i class="fas fa-play"></i> Putar Video
      </button>
    </div>
  `;

  document.getElementById('watchTitle').textContent = video.title;
  document.getElementById('watchViews').textContent = video.views + ' views';
  document.getElementById('watchDuration').textContent = video.duration;
  document.getElementById('watchCategory').textContent = video.category;
  document.getElementById('watchRating').textContent = video.rating + ' ★';
  document.getElementById('watchDesc').textContent = video.description;
  document.getElementById('watchDate').textContent = 'Upload: ' + video.uploadDate;
  document.getElementById('watchTags').innerHTML = video.tags.map(t => 
    `<span class="filter-btn" style="cursor:default;margin:0.2rem">${t}</span>`
  ).join('');

  const addBtn = document.getElementById('watchAddBtn');
  updateAddButton(addBtn, video.id);
  addBtn.onclick = () => {
    toggleMyList(video.id);
    updateAddButton(addBtn, video.id);
  };

  const related = VIDEOS
    .filter(v => v.category === video.category && v.id !== video.id)
    .slice(0, 6);
  
  if (related.length < 4) {
    const others = VIDEOS.filter(v => v.id !== video.id && !related.find(r => r.id === v.id))
      .slice(0, 6 - related.length);
    related.push(...others);
  }

  document.getElementById('relatedList').innerHTML = related.map(createRelatedItem).join('');
}

function initMyListPage() {
  initNavbarScroll();
  initSearch();

  const list = getMyList();
  const grid = document.getElementById('mylistGrid');
  const countEl = document.getElementById('mylistCount');

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-heart-broken"></i>
        <h3>Daftar Saya masih kosong</h3>
        <p>Tambahkan video favorit dengan menekan tombol + Daftar Saya</p>
        <a href="../index.html" class="btn btn-primary" style="margin-top:1.2rem">
          <i class="fas fa-home"></i> Jelajahi Video
        </a>
      </div>
    `;
    if (countEl) countEl.textContent = '0 video';
    return;
  }

  const videos = list.map(id => getVideoById(id)).filter(Boolean);
  grid.innerHTML = videos.map(createVideoCard).join('');
  if (countEl) countEl.textContent = `${videos.length} video`;
}
