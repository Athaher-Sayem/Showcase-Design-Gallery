const projects = Array.isArray(window.SHOWCASE_PROJECTS) ? window.SHOWCASE_PROJECTS : [];
const searchField = document.getElementById('search');
const statusField = document.getElementById('status-filter');
const categoryField = document.getElementById('category-filter');
const styleField = document.getElementById('style-filter');
const cards = document.getElementById('cards');

function setText(id, text) { document.getElementById(id).textContent = String(text); }
setText('all-count', projects.length);
setText('catalog-number', String(projects.length).padStart(2, '0'));
setText('heading-count', String(projects.length).padStart(3, '0'));
setText('done-count', projects.filter(item => item.status === 'completed').length);
setText('pending-count', projects.filter(item => item.status !== 'completed').length);

function fillFilter(select, values) {
  for (const value of [...new Set(values.filter(Boolean))].sort()) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}
fillFilter(categoryField, projects.map(item => item.category));
fillFilter(styleField, projects.map(item => item.style));

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
function link(label, url) {
  const anchor = el('a', '', label);
  anchor.href = url;
  if (/^https:\/\//.test(url)) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
  return anchor;
}
function makeCard(item, index) {
  const card = el('article', `card ${item.status === 'completed' ? 'completed' : 'pending'}`);
  const top = el('div', 'card-top');
  top.append(el('span', '', `№ ${String(index + 1).padStart(2, '0')} / ${item.visibility.toUpperCase()}`), el('span', 'state', item.status === 'completed' ? 'ON VIEW' : 'IN PROGRESS'));
  card.append(top);
  const preview = el('div', item.screenshot ? 'preview' : 'preview preview-placeholder');
  if (item.screenshot) {
    const image = el('img');
    image.src = item.screenshot;
    image.alt = `Actual rendered screenshot of ${item.name} showcase`;
    image.loading = 'lazy';
    preview.append(image);
  } else preview.append(el('span', '', item.limitation ? 'EMPTY REPOSITORY / NO BASELINE' : 'VISUAL STUDY PENDING'));
  card.append(preview);
  const body = el('div', 'card-body');
  body.append(el('h3', '', item.name), el('p', '', item.purpose), el('div', 'card-meta', item.style || item.category));
  card.append(body);
  const bottom = el('div', 'card-bottom');
  bottom.append(link('GITHUB ↗', item.url));
  bottom.append(item.showcasePath ? link('OPEN SHOWCASE →', item.showcasePath) : el('span', 'disabled', 'NOT YET AVAILABLE'));
  card.append(bottom);
  return card;
}
function render() {
  const query = searchField.value.trim().toLocaleLowerCase();
  const matching = projects.filter(item => item.name.toLocaleLowerCase().includes(query) && (statusField.value === 'all' || item.status === statusField.value) && (categoryField.value === 'all' || item.category === categoryField.value) && (styleField.value === 'all' || item.style === styleField.value));
  cards.replaceChildren(...matching.map((item, index) => makeCard(item, index)));
  document.getElementById('empty-state').hidden = matching.length > 0;
}
[searchField, statusField, categoryField, styleField].forEach(field => field.addEventListener(field === searchField ? 'input' : 'change', render));
render();
