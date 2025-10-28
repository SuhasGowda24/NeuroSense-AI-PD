export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token"); // stored after login
  const res = await fetch(`http://localhost:5000/api${url}`, {
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
