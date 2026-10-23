const projects = {
  dashboard: ['Described in source as a demo', 'Online University Dashboard', 'The portfolio describes a dashboard for student locations and active sessions, built with HTML, CSS and JavaScript. No linked working implementation is provided by its project card.'],
  library: ['Described in source as a school project', 'Library Management (Terminal)', 'The portfolio describes a Java file-based library system with student and teacher roles, borrowing, renewals and fine checks. Its project card does not link to a working implementation.']
};
const tabs = [...document.querySelectorAll('[data-project]')];
function selectProject(key, focus = false) {
  if (!projects[key]) return;
  const selected = tabs.find(tab => tab.dataset.project === key);
  tabs.forEach(tab => { const on = tab === selected; tab.setAttribute('aria-selected', String(on)); tab.tabIndex = on ? 0 : -1; });
  document.getElementById('work-panel').setAttribute('aria-labelledby', selected.id);
  ['project-type', 'project-name', 'project-description'].forEach((id, index) => document.getElementById(id).textContent = projects[key][index]);
  if (focus) selected.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectProject(tab.dataset.project));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectProject(tabs[next].dataset.project, true);
  });
});
