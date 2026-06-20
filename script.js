// ===== GitHub Developer Explorer =====
// Stage 4: fetch repositories, render list, add sorting

const form = document.getElementById('search-form');
const input = document.getElementById('username-input');
const status = document.getElementById('status-message');
const results = document.getElementById('results');
const repoList = document.getElementById('repo-list');
const sortSelect = document.getElementById('sort-select');

let currentRepos = []; // stored so we can re-sort without re-fetching

async function searchUser(username) {
  username = username.trim();
  if (!username) return;

  results.hidden = true;
  status.textContent = 'Loading...';

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    if (profileRes.status === 404) throw new Error('User not found.');
    if (profileRes.status === 403) throw new Error('Rate limit reached (60/hour). Try again later.');
    if (!profileRes.ok) throw new Error('Something went wrong.');
    const profile = await profileRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposRes.json();

    currentRepos = repos;
    renderProfile(profile);
    renderRepos(sortRepos(repos, sortSelect.value));

    status.textContent = '';
    results.hidden = false;
  } catch (err) {
    status.textContent = err.message;
  }
}

function renderProfile(profile) {
  document.getElementById('profile-avatar').src = profile.avatar_url;
  document.getElementById('profile-name').textContent = profile.name || profile.login;
  document.getElementById('profile-login').textContent = '@' + profile.login;
  document.getElementById('profile-login').href = profile.html_url;
  document.getElementById('profile-bio').textContent = profile.bio || '';
  document.getElementById('stat-repos').textContent = profile.public_repos;
  document.getElementById('stat-followers').textContent = profile.followers;
}

function sortRepos(repos, sortBy) {
  const sorted = [...repos];
  if (sortBy === 'stars') sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  else if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  else sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  return sorted;
}

function renderRepos(repos) {
  repoList.innerHTML = repos.map(repo => `
    <li class="repo-item">
      <div>
        <h4 class="repo-item__name"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
        <p class="repo-item__desc">${repo.description || 'No description.'}</p>
        <span class="repo-item__lang">${repo.language || ''}</span>
      </div>
      <span>★ ${repo.stargazers_count}</span>
    </li>
  `).join('');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  searchUser(input.value);
});

sortSelect.addEventListener('change', () => {
  renderRepos(sortRepos(currentRepos, sortSelect.value));
});
