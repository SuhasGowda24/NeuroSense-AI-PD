const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
  const baseURL = process.env.REACT_APP_API_URL;

  if (!baseURL) {
    console.error("❌ REACT_APP_API_URL is not defined");
  }

  // If URL starts with /api → attach backend URL
  if (typeof url === "string" && url.startsWith("/api")) {
    const finalURL = `${baseURL}${url}`;
    console.log("🌐 API CALL:", finalURL); // optional debug
    url = finalURL;
  }

  return originalFetch(url, options);
};