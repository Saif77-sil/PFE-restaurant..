const express = require('express');

const router = express.Router();

const {
  createCommande
} = require('../controllers/commandeController');

router.post('/', createCommande);

module.exports = router;
