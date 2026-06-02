const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant" // remplace par le nom réel
});

db.connect((err) => {
  if (err) {
    console.error("Erreur MySQL :", err);
    return;
  }

  console.log("MySQL connecté");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/api/commandes", (req, res) => {
  db.query(
    "SELECT * FROM commandes ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.post("/api/commandes", (req, res) => {
  const {
    numero_table,
    articles,
    total,
    statut
  } = req.body;

  const sql = `
    INSERT INTO commandes
    (numero_table, articles, total, statut)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      numero_table,
      JSON.stringify(articles),
      total,
      statut
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        id: result.insertId
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT}`);
});
