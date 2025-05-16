const API_BASE = process.env.REACT_APP_API_BASE || "";

export const askQuestion = async (question) => {
  console.log(`API_BASE: ${API_BASE}`);
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return res.json();
};
