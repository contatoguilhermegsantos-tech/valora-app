export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { tickers, range = "1mo", interval = "1d", fundamental = "false" } = req.query;
  if (!tickers) return res.status(400).json({ error: "tickers obrigatório" });

  try {
    const params = new URLSearchParams({
      token: "bpJcy33PZ5aPFqGbxoP9dF",
      range,
      interval,
      fundamental,
    });
    const url = `https://brapi.dev/api/quote/${tickers}?${params}`;
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).json({ error: `Brapi ${r.status}` });
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
