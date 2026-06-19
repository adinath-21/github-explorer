// ===== GitHub Developer Explorer =====
// Stage 3: fetch + render the user's profile

const form = document.getElementById('search-form');
const input = document.getElementById('username-input');
const status = document.getElementById('status-message');
const results = document.getElementById('results');

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

    renderProfile(profile);

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

form.addEventListener('submit', e => {
  e.preventDefault();
  searchUser(input.value);
});
