const API = import.meta.env.VITE_API_URL;

export async function getFeaturedLessons() {
  const res = await fetch(`${API}/home/featured`);
  return await res.json();
}

export async function getMostSavedLessons() {
  const res = await fetch(`${API}/home/most-saved`);
  return await res.json();
}

export async function getTopContributors() {
  const res = await fetch(`${API}/home/top-contributors`);
  return await res.json();
}
