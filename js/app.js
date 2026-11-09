const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const search = document.getElementById('search');

function render(list) {
  if (!list.length) {
    grid.innerHTML = '<div class="empty">Tidak ada video</div>';
    return;
  }
  grid.innerHTML = list.map(v => `
    <div class="card" data-id="${v.id}">
      <div class="thumb">
        <img src="${v.thumb}" alt="" loading="lazy" onerror="this.src='https://via.placeholder.com/320x180/161616/ff2d55?text=Video'">
        <span class="dur">${v.dur}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${v.title}</div>
        <div class="card-meta">${v.views}</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach(c => {
    c.onclick = () => open(+c.dataset.id);
  });
}

function open(id) {
  const v = VIDEOS.find(x => x.id === id);
  if (!v) return;
  document.getElementById('modalTitle').textContent = v.title;
  document.getElementById('modalMeta').textContent = v.views + ' · ' + v.dur + ' · ' + v.cat;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function close() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

search.oninput = () => {
  const q = search.value.trim().toLowerCase();
  const list = q ? VIDEOS.filter(v => v.title.toLowerCase().includes(q)) : VIDEOS;
  render(list);
};

document.getElementById('closeBtn').onclick = close;
modal.onclick = e => { if (e.target === modal) close(); };
document.getElementById('playBtn').onclick = () => alert('Demo only');
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

render(VIDEOS);
