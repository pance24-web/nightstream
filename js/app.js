const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const searchInput = document.getElementById('search');
const tabs = document.querySelectorAll('.tab');

let currentCat = 'all';
let currentQuery = '';

function render(list) {
  if (!list.length) {
    grid.innerHTML = `<div class="empty"><i class="fas fa-video-slash"></i>Tidak ada video</div>`;
    return;
  }
  grid.innerHTML = list.map(v => `
    <div class="card" data-id="${v.id}">
      <div class="thumb">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/480x270/161616/ff2d55?text=Video'" />
        <span class="dur">${v.dur}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${v.title}</div>
        <div class="card-meta">${v.views} · ${v.cat}</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.onclick = () => openModal(+card.dataset.id);
  });
}

function filter() {
  let list = VIDEOS;
  if (currentCat !== 'all') list = list.filter(v => v.cat === currentCat);
  if (currentQuery) {
    const q = currentQuery.toLowerCase();
    list = list.filter(v => v.title.toLowerCase().includes(q) || v.cat.includes(q));
  }
  render(list);
}

function openModal(id) {
  const v = VIDEOS.find(x => x.id === id);
  if (!v) return;
  document.getElementById('modalTitle').textContent = v.title;
  document.getElementById('modalViews').innerHTML = `<i class="fas fa-eye"></i> ${v.views}`;
  document.getElementById('modalDur').innerHTML = `<i class="fas fa-clock"></i> ${v.dur}`;
  document.getElementById('modalCat').innerHTML = `<i class="fas fa-tag"></i> ${v.cat}`;
  document.getElementById('modalDesc').textContent = v.desc;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

tabs.forEach(t => {
  t.onclick = () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    currentCat = t.dataset.cat;
    filter();
  };
});

searchInput.oninput = () => {
  currentQuery = searchInput.value.trim();
  filter();
};

document.getElementById('closeBtn').onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };
document.getElementById('playBtn').onclick = () => alert('Demo only — no real video.');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

filter();
