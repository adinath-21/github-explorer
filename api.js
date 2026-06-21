// Talk to GitHub API only. No DOM code here

async function fetchProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (res.status === 404) throw new Error('User not found.');
  if (res.status === 403) throw new Error('Rate limit reached (60/hour). Try again later.');
  if (!res.ok) throw new Error('Something went wrong.');
  return res.json();
}

async function fetchRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  return res.json();
}
