// Labels transcribed from the public profile README; not an assessment of proficiency.
const sets = {
  languages: { caption: "Listed in the profile's programming-language section", values: ['C', 'C++', 'Java', 'MySQL'] },
  learning: { caption: 'Marked “Currently Learning” in the profile README (snapshot, not a current status claim)', values: ['HTML5', 'CSS3', 'JavaScript', 'React'] },
  tools: { caption: "Listed under the README's tools section", values: ['Git', 'VS Code'] }
};
const list = document.getElementById('skill-list');
function selectSet(key) {
  const set = sets[key]; if (!set) return;
  document.getElementById('skill-caption').textContent = set.caption;
  list.replaceChildren(...set.values.map(value => {
    const item = document.createElement('span'); item.textContent = value; return item;
  }));
  document.querySelectorAll('[data-set]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.set === key)));
}
document.querySelectorAll('[data-set]').forEach(button => button.addEventListener('click', () => selectSet(button.dataset.set)));
selectSet('languages');
