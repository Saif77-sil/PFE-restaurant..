const db = require('../config/db');

exports.createCommande = (req, res) => {

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
      statut || 'en_attente'
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: 'Commande ajoutée',
        id: result.insertId
      });

    }
  );

};
