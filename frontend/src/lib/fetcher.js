export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Request failed");
  }

  return res.json();
}