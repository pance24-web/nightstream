// ===== COMPONENTS =====

function createVideoCard(video) {
  return `
    <div class="video-card" onclick="goToWatch(${video.id})">
      <div class="video-thumb">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" 
             onerror="this.src='https://via.placeholder.com/640x360/1a1a1a/e50914?text=No+Image'" />
        <span class="video-duration">${video.duration}</span>
        ${video.quality === '4K' ? '<span class="video-quality">4K</span>' : ''}
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="video-meta">
          <span class="views"><i class="fas fa-eye"></i> ${video.views}</span>
          <span>${video.category}</span>
        </div>
      </div>
    </div>
  `;
}

function createCategoryCard(cat) {
  const count = cat.id === 'all' ? VIDEOS.length : VIDEOS.filter(v => v.category === cat.id).length;
  const seed = cat.id.charCodeAt(0) * 10;
  return `
    <div class="category-card" onclick="goToBrowse('${cat.id}')">
      <img src="https://picsum.photos/seed/cat${seed}/400/400" alt="${cat.name}"
           onerror="this.src='https://via.placeholder.com/400x400/1a1a1a/e50914?text=${cat.name}'" />
      <div class="category-name">${cat.name} (${count})</div>
    </div>
  `;
}

function createRelatedItem(video) {
  return `
    <div class="related-item" onclick="goToWatch(${video.id})">
      <div class="related-thumb">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/280x158/1a1a1a/e50914?text=Video'" />
        <span class="video-duration" style="font-size:0.65rem;bottom:4px;right:4px;">${video.duration}</span>
      </div>
      <div class="related-info">
        <h4>${video.title}</h4>
        <span>${video.views} views • ${video.category}</span>
      </div>
    </div>
  `;
}

function showToast(message, icon = 'fa-check') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function goToWatch(id) {
  const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  window.location.href = `${base}watch.html?id=${id}`;
}

function goToBrowse(cat = 'all') {
  const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  window.location.href = `${base}browse.html?cat=${cat}`;
}

function getMyList() {
  try {
    return JSON.parse(localStorage.getItem('nightstream_mylist') || '[]');
  } catch {
    return [];
  }
}

function saveMyList(list) {
  localStorage.setItem('nightstream_mylist', JSON.stringify(list));
}

function isInMyList(id) {
  return getMyList().includes(parseInt(id));
}

function toggleMyList(id) {
  id = parseInt(id);
  let list = getMyList();
  if (list.includes(id)) {
    list = list.filter(i => i !== id);
    saveMyList(list);
    showToast('Dihapus dari Daftar Saya', 'fa-trash');
    return false;
  } else {
    list.push(id);
    saveMyList(list);
    showToast('Ditambahkan ke Daftar Saya', 'fa-plus');
    return true;
  }
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  let timeout;
  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const q = e.target.value.trim();
      if (q.length >= 2) {
        const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = `${base}browse.html?q=${encodeURIComponent(q)}`;
      }
    }, 600);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) {
        const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = `${base}browse.html?q=${encodeURIComponent(q)}`;
      }
    }
  });
}
