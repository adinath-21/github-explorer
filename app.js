// Hold app state, listen for events, and connect api.js + render.js together.

const form = document.getElementById('search-form');
const input = document.getElementById('username-input');
const status = document.getElementById('status-message');
const results = document.getElementById('results');
const sortSelect = document.getElementById('sort-select');

let currentRepos = []; // state: stored so we can re-sort without re-fetching

async function searchUser(username) {
  username = username.trim();
  if (!username) return;

  results.hidden = true;
  status.textContent = 'Loading...';

  try {
    const profile = await fetchProfile(username);   // from api.js
    const repos = await fetchRepos(username);        // from api.js
    currentRepos = repos;

    renderProfile(profile);                           // from render.js
    renderLanguages(repos);                            // from render.js
    renderRepos(sortRepos(repos, sortSelect.value));    // from render.js

    saveRecentSearch(username);
    status.textContent = '';
    results.hidden = false;
  } catch (err) {
    status.textContent = err.message;
  }
}

// ---- localStorage: remember recent searches ----
function saveRecentSearch(username) {
  let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  recent = [username, ...recent.filter(u => u !== username)].slice(0, 5);
  localStorage.setItem('recentSearches', JSON.stringify(recent));
}

// ---- event listeners ----
form.addEventListener('submit', e => {
  e.preventDefault();
  searchUser(input.value);
});

sortSelect.addEventListener('change', () => {
  renderRepos(sortRepos(currentRepos, sortSelect.value));
});
