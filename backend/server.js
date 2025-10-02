const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Fake "DB"
let items = ["Elemento 1", "Elemento 2", "Elemento 3"];

// Login endpoint (fake)
app.post("/api/login", (req, res) => {
  const { user, pass } = req.body || {};
  if (user === "admin" && pass === "1234") {
    return res.json({ success: true, message: "Login correcto", token: "fake-jwt-token" });
  }
  return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
});

// CRUD
app.get("/api/data", (req, res) => {
  res.json(items);
});

app.post("/api/data", (req, res) => {
  const { item } = req.body;
  if (!item) return res.status(400).json({ success: false, message: "Falta el campo 'item'" });
  items.push(item);
  res.json(items);
});

app.put("/api/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const { item } = req.body;
  if (!Number.isFinite(id) || !items[id]) return res.status(400).json({ success: false, message: "id inválido" });
  items[id] = item;
  res.json(items);
});

app.delete("/api/data/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id) || !items[id]) return res.status(400).json({ success: false, message: "id inválido" });
  items.splice(id, 1);
  res.json(items);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend en http://localhost:${PORT}`));
