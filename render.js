// Take data and put it on screen.

function renderProfile(profile) {
  document.getElementById('profile-avatar').src = profile.avatar_url;
  document.getElementById('profile-name').textContent = profile.name || profile.login;
  document.getElementById('profile-login').textContent = '@' + profile.login;
  document.getElementById('profile-login').href = profile.html_url;
  document.getElementById('profile-bio').textContent = profile.bio || '';
  document.getElementById('stat-repos').textContent = profile.public_repos;
  document.getElementById('stat-followers').textContent = profile.followers;
}

function renderLanguages(repos) {
  const languageBar = document.getElementById('language-bar');
  const reposWithLanguage = repos.filter(repo => repo.language);
  const counts = reposWithLanguage.reduce((acc, repo) => {
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});
  const total = reposWithLanguage.length;
  languageBar.innerHTML = '';
  if (total === 0) return;

  const sortedLanguages = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  sortedLanguages.forEach(([language, count]) => {
    const segment = document.createElement('div');
    segment.className = 'language-bar__segment';
    segment.style.width = (count / total * 100) + '%';
    segment.title = `${language} (${count})`;
    languageBar.appendChild(segment);
  });
}

function sortRepos(repos, sortBy) {
  const sorted = [...repos];
  if (sortBy === 'stars') sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  else if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  else sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  return sorted;
}

function renderRepos(repos) {
  const repoList = document.getElementById('repo-list');
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
