// Excerpts and summaries from ARCHITECTURE.md. Not a live system status view.
const layers = {
  clients: { index: '01', title: 'Clients at the edge', body: 'The document proposes browser and mobile clients as starting points for requests entering the system.', tags: 'WEB / MOBILE' },
  edge: { index: '02', title: 'An entry point with boundaries', body: 'Its diagram places CDN, load balancing, WAF, API gateway, authentication and rate limiting ahead of application services.', tags: 'CDN / WAF / GATEWAY' },
  services: { index: '03', title: 'Six proposed domains', body: 'The reference divides responsibilities across user, product, order, payment, inventory and notification services.', tags: 'USERS / PRODUCTS / ORDERS / MORE' },
  data: { index: '04', title: 'State in multiple forms', body: 'PostgreSQL, Redis, search, queues and object storage play different roles in the proposed architecture.', tags: 'SQL / CACHE / SEARCH / QUEUE' }
};
document.querySelectorAll('[data-layer]').forEach(button => button.addEventListener('click', () => {
  const item = layers[button.dataset.layer];
  if (!item) return;
  document.getElementById('layer-index').textContent = item.index;
  document.getElementById('layer-title').textContent = item.title;
  document.getElementById('layer-body').textContent = item.body;
  document.getElementById('layer-tags').textContent = item.tags;
  document.querySelectorAll('[data-layer]').forEach(node => node.setAttribute('aria-pressed', String(node === button)));
}));
