const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const AT_TOKEN = "patdv0bmd9rKbOth6.3478a940488ff23f8d7d347f41ac263910c34461e7bd74cda8df9df438262bba";
const BASE_ID = "appwQXPKCWI0oFVNC";
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const headers = {
  Authorization: `Bearer ${AT_TOKEN}`,
  "Content-Type": "application/json",
};
// GET registros de una tabla
app.get("/api/:table", async (req, res) => {
  try {
    const { table } = req.params;
    const params = new URLSearchParams(req.query).toString();
    const url = `${BASE_URL}/${encodeURIComponent(table)}${params ? "?" + params : ""}`;
    const r = await fetch(url, { headers });
    const d = await r.json();
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// POST crear registro
app.post("/api/:table", async (req, res) => {
  try {
    const { table } = req.params;
    const r = await fetch(`${BASE_URL}/${encodeURIComponent(table)}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ fields: req.body }),
    });
    const d = await r.json();
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// PATCH actualizar registro
app.patch("/api/:table/:id", async (req, res) => {
  try {
    const { table, id } = req.params;
    const r = await fetch(`${BASE_URL}/${encodeURIComponent(table)}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ fields: req.body }),
    });
    const d = await r.json();
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.get("/", (_, res) => res.send("AutoPYME Proxy OK"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
