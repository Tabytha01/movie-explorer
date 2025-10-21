const BASE_URL = 'https://api.tvmaze.com';

export const fetchAllShows = async () => {
  const res = await fetch(`${BASE_URL}/shows`);
  if (!res.ok) throw new Error(`Failed to fetch shows: ${res.status}`);
  const data = await res.json();
  // Return as-is; components expect show objects
  return data;
};

export const searchShows = async (query) => {
  const q = String(query || '').trim();
  if (!q) return await fetchAllShows();
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Failed to search shows: ${res.status}`);
  const data = await res.json();
  // TVMaze search returns { score, show }; map to show objects
  return data.map(item => item.show);
};

export const fetchShowById = async (id) => {
  const res = await fetch(`${BASE_URL}/shows/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch show ${id}: ${res.status}`);
  return await res.json();
};