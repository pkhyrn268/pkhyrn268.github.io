// ============================================================
// Rendering + view-switching logic. Reads data from data.js.
// No build step, no framework — plain DOM APIs.
// ============================================================

const el = (tag, className, html) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

function renderChips(container, items, chipClass) {
  container.innerHTML = '';
  items.forEach(t => container.appendChild(el('span', chipClass, t)));
}

// Renders one image slot: shows the real image if `item.image` is set,
// otherwise a dashed placeholder box captioned with what should go there.
// The caption (`item.note`) is shown under the image either way, when present.
function renderImageSlot(item) {
  const slot = el('div', 'd-diagram-slot');
  if (item.image) {
    const img = el('img', 'd-diagram-img');
    img.src = item.image;
    img.alt = item.note || '';
    slot.appendChild(img);
    if (item.note) slot.appendChild(el('p', 'd-diagram-caption', item.note));
  } else {
    const body = el('div', 'd-diagram-slot-body');
    body.appendChild(el('span', 'd-diagram-slot-icon', '🖼'));
    body.appendChild(el('p', 'd-diagram-slot-text', item.note || ''));
    slot.appendChild(body);
  }
  return slot;
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = '';
  FEATURED_PROJECTS.forEach(p => {
    const card = el('div', 'featured-card');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const top = el('div', 'fc-top');
    top.appendChild(el('span', 'fc-tag mono', `${p.num} · ${p.tag}`));
    top.appendChild(el('span', 'fc-period mono', p.period));
    card.appendChild(top);

    card.appendChild(el('h3', 'fc-name', p.name));
    if (p.statusLabel) card.appendChild(el('span', 'status-badge mono', p.statusLabel));
    card.appendChild(el('p', 'fc-desc', p.desc));

    const chips = el('div', 'chip-row');
    renderChips(chips, p.stack, 'chip');
    card.appendChild(chips);

    card.appendChild(el('span', 'fc-cta mono', 'case study →'));

    const openDetail = () => showDetail(p.id);
    card.addEventListener('click', openDetail);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(); } });

    grid.appendChild(card);
  });
}

function renderOthers() {
  const list = document.getElementById('other-list');
  list.innerHTML = '';
  OTHER_PROJECTS.forEach(o => {
    const row = el(o.url ? 'a' : 'div', 'other-row');
    if (o.url) {
      row.href = o.url;
      row.target = '_blank';
      row.rel = 'noopener';
    }

    const nameDesc = el('span', 'other-name-desc');
    nameDesc.appendChild(el('span', 'other-name', o.name));
    nameDesc.appendChild(el('span', 'other-desc', o.desc));
    row.appendChild(nameDesc);

    row.appendChild(el('span', 'other-meta mono', o.url ? `${o.meta} ↗` : o.meta));
    list.appendChild(row);
  });
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';
  SKILL_GROUPS.forEach(g => {
    const card = el('div', 'skill-card');
    card.appendChild(el('h3', 'skill-title', g.title));
    card.appendChild(el('p', 'skill-sub mono', g.sub));
    const items = el('div', 'skill-items');
    renderChips(items, g.items, 'skill-chip');
    card.appendChild(items);
    grid.appendChild(card);
  });
}

function renderExperience() {
  const list = document.getElementById('experience-list');
  list.innerHTML = '';
  EXPERIENCE.forEach(e => {
    const row = el('div', 'exp-row');
    row.appendChild(el('span', 'exp-period mono', e.period));
    const right = el('span');
    right.appendChild(el('span', 'exp-title', e.title));
    right.appendChild(el('span', 'exp-desc', e.desc));
    row.appendChild(right);
    list.appendChild(row);
  });
}

function showDetail(id) {
  const p = FEATURED_PROJECTS.find(x => x.id === id);
  if (!p) return;

  document.getElementById('d-num').textContent = `${p.num} / case study`;
  document.getElementById('d-name').textContent = p.name;
  const statusBadge = document.getElementById('d-status-badge');
  statusBadge.hidden = !p.statusLabel;
  if (p.statusLabel) statusBadge.textContent = p.statusLabel;
  document.getElementById('d-oneliner').textContent = p.oneLiner;
  document.getElementById('d-period').textContent = p.period;
  document.getElementById('d-role').textContent = p.role;
  const repoLink = document.getElementById('d-repo');
  repoLink.textContent = `${p.repo} ↗`;
  repoLink.href = p.url;
  document.getElementById('d-problem').textContent = p.problem;

  // 설계 의도 (optional — only shown when a project defines it)
  const designIntentWrap = document.getElementById('d-design-intent-wrap');
  designIntentWrap.hidden = !p.designIntent;
  if (p.designIntent) document.getElementById('d-design-intent').textContent = p.designIntent;

  // 구성도 (optional — image supplied by the project author; falls back to a placeholder slot)
  const architectureWrap = document.getElementById('d-architecture-wrap');
  architectureWrap.hidden = !(p.architectureImage || p.architectureImageNote);
  const archImg = document.getElementById('d-architecture-img');
  const archPlaceholder = document.getElementById('d-architecture-placeholder');
  const archRealCaption = document.getElementById('d-architecture-real-caption');
  if (p.architectureImage) {
    archImg.src = p.architectureImage;
    archImg.alt = p.name + ' 아키텍처 다이어그램';
    archImg.hidden = false;
    archPlaceholder.hidden = true;
    archRealCaption.hidden = !p.architectureImageNote;
    if (p.architectureImageNote) archRealCaption.textContent = p.architectureImageNote;
  } else if (p.architectureImageNote) {
    archImg.hidden = true;
    archRealCaption.hidden = true;
    archPlaceholder.hidden = false;
    document.getElementById('d-architecture-caption').textContent = p.architectureImageNote;
  }

  // 결과 자료 갤러리 (optional — performance tables/graphs/screenshots referenced from the source report)
  const resultImagesWrap = document.getElementById('d-result-images-wrap');
  resultImagesWrap.hidden = !(p.resultImages && p.resultImages.length);
  if (p.resultImages) {
    const gallery = document.getElementById('d-result-images');
    gallery.innerHTML = '';
    p.resultImages.forEach(item => gallery.appendChild(renderImageSlot(item)));
  }

  // 주요 기능 (optional)
  const featuresWrap = document.getElementById('d-features-wrap');
  featuresWrap.hidden = !(p.features && p.features.length);
  if (p.features) {
    const features = document.getElementById('d-features');
    features.innerHTML = '';
    p.features.forEach(f => {
      const row = el('div', 'd-list-item');
      row.appendChild(el('span', 'bullet mono', '▸'));
      row.appendChild(el('span', 'text', f));
      features.appendChild(row);
    });
  }

  const bullets = document.getElementById('d-bullets');
  bullets.innerHTML = '';
  p.bullets.forEach(b => {
    const row = el('div', 'd-list-item');
    row.appendChild(el('span', 'bullet mono', '−'));
    row.appendChild(el('span', 'text', b));
    bullets.appendChild(row);
  });

  // 트러블슈팅 (optional — list of { problem, solution })
  const troubleshootingWrap = document.getElementById('d-troubleshooting-wrap');
  troubleshootingWrap.hidden = !(p.troubleshooting && p.troubleshooting.length);
  if (p.troubleshooting) {
    const trouble = document.getElementById('d-troubleshooting');
    trouble.innerHTML = '';
    p.troubleshooting.forEach(t => {
      const item = el('div', 'd-trouble-item');
      item.appendChild(el('div', 'problem', `<span class="mono">!</span> ${t.problem}`));
      item.appendChild(el('span', 'solution', t.solution));
      trouble.appendChild(item);
    });
  }

  const results = document.getElementById('d-results');
  results.innerHTML = '';
  p.results.forEach(r => {
    const row = el('div', 'd-result-item');
    row.appendChild(el('span', 'check mono', '✓'));
    row.appendChild(el('span', 'text', r));
    results.appendChild(row);
  });

  const stack = document.getElementById('d-stack');
  renderChips(stack, p.stack, 'chip');

  // 본인이 작업한 코드가 main이 아닌 특정 브랜치/경로에 있는 경우를 위한 보조 링크 (optional)
  const codeLinks = document.getElementById('d-code-links');
  codeLinks.innerHTML = '';
  if (p.codeLinks) {
    p.codeLinks.forEach(c => {
      const a = el('a', 'btn btn-outline mono', `${c.label} ↗`);
      a.href = c.url;
      a.target = '_blank';
      a.rel = 'noopener';
      codeLinks.appendChild(a);
    });
  }

  document.getElementById('d-github').href = p.url;

  document.getElementById('list-view').hidden = true;
  document.getElementById('detail-view').hidden = false;
  window.scrollTo({ top: 0 });
}

function showList() {
  document.getElementById('detail-view').hidden = true;
  document.getElementById('list-view').hidden = false;
}

// Wire up all "go home" triggers (nav links, back button, "목록으로" button)
document.querySelectorAll('[data-gohome]').forEach(node => {
  node.addEventListener('click', (e) => {
    // Let real anchor jumps (#projects etc.) work, but always reset to list view first
    showList();
  });
});

renderFeatured();
renderOthers();
renderSkills();
renderExperience();
